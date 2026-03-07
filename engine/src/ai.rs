use crate::board::{Board, Cell};
use crate::eval::evaluate;

#[derive(Clone, Copy, Debug)]
pub enum Difficulty {
    Easy,
    Medium,
    Hard,
}

impl Difficulty {
    pub fn depth(self) -> usize {
        match self {
            Difficulty::Easy => 1,
            Difficulty::Medium => 2,
            Difficulty::Hard => 4,
        }
    }

    pub fn candidate_radius(self) -> usize {
        match self {
            Difficulty::Easy => 1,
            Difficulty::Medium => 2,
            Difficulty::Hard => 2,
        }
    }

    /// Noise amplitude added to move scores — higher means more mistakes.
    pub fn noise_amplitude(self) -> i32 {
        match self {
            Difficulty::Easy => 5000,
            Difficulty::Medium => 800,
            Difficulty::Hard => 0,
        }
    }
}

/// Generate a random noise value in [-amplitude, +amplitude].
fn random_noise(amplitude: i32) -> i32 {
    if amplitude == 0 {
        return 0;
    }
    #[cfg(target_arch = "wasm32")]
    {
        ((js_sys::Math::random() * 2.0 - 1.0) * amplitude as f64) as i32
    }
    #[cfg(not(target_arch = "wasm32"))]
    {
        use std::sync::atomic::{AtomicUsize, Ordering};
        static COUNTER: AtomicUsize = AtomicUsize::new(0);
        let c = COUNTER.fetch_add(1, Ordering::Relaxed);
        let hash = c.wrapping_mul(2654435761) ^ c.wrapping_mul(2246822519).rotate_right(16);
        ((hash % (2 * amplitude as usize + 1)) as i32) - amplitude
    }
}

pub fn best_move(board: &Board, player: Cell, difficulty: Difficulty) -> (usize, usize) {
    // First move: always center
    if board.move_count() == 0 {
        return (7, 7);
    }

    let depth = difficulty.depth();
    let candidates = board.get_candidates(difficulty.candidate_radius());
    let noise_amp = difficulty.noise_amplitude();

    let mut best_score = i32::MIN;
    let mut best = candidates[0];

    for &(x, y) in &candidates {
        let mut b = board.clone();
        b.place(x, y, player).unwrap();

        // Immediate win check (always take the win)
        if b.check_winner_at(x, y) == Some(player) {
            return (x, y);
        }

        let mut score = minimax(&mut b, depth - 1, i32::MIN, i32::MAX, false, player, (x, y));
        score += random_noise(noise_amp);
        if score > best_score {
            best_score = score;
            best = (x, y);
        }
    }

    best
}

fn minimax(
    board: &mut Board,
    depth: usize,
    mut alpha: i32,
    mut beta: i32,
    is_maximizing: bool,
    ai_player: Cell,
    last_move: (usize, usize),
) -> i32 {
    // Use incremental winner check on the last placed move
    if board.check_winner_at(last_move.0, last_move.1).is_some() || depth == 0 || board.is_full() {
        return evaluate(board, ai_player);
    }

    let mut candidates = board.get_candidates(2);

    // Move ordering: sort candidates by quick heuristic evaluation (descending)
    // so alpha-beta prunes more aggressively
    let current_player = if is_maximizing { ai_player } else { ai_player.opponent() };
    candidates.sort_by_cached_key(|&(x, y)| {
        std::cmp::Reverse(quick_score(board, x, y, current_player))
    });

    if is_maximizing {
        let mut max_score = i32::MIN;
        for &(x, y) in &candidates {
            board.place(x, y, ai_player).unwrap();
            let score = minimax(board, depth - 1, alpha, beta, false, ai_player, (x, y));
            board.undo(x, y);
            max_score = max_score.max(score);
            alpha = alpha.max(score);
            if beta <= alpha {
                break;
            }
        }
        max_score
    } else {
        let opponent = ai_player.opponent();
        let mut min_score = i32::MAX;
        for &(x, y) in &candidates {
            board.place(x, y, opponent).unwrap();
            let score = minimax(board, depth - 1, alpha, beta, true, ai_player, (x, y));
            board.undo(x, y);
            min_score = min_score.min(score);
            beta = beta.min(score);
            if beta <= alpha {
                break;
            }
        }
        min_score
    }
}

/// Quick heuristic for move ordering — scores a candidate move by how many
/// friendly/enemy stones surround it. Cheap O(1) per candidate.
fn quick_score(board: &Board, x: usize, y: usize, player: Cell) -> i32 {
    let mut score = 0i32;
    let directions: [(i32, i32); 8] = [
        (1, 0), (-1, 0), (0, 1), (0, -1),
        (1, 1), (-1, -1), (1, -1), (-1, 1),
    ];
    let opponent = player.opponent();
    for &(dx, dy) in &directions {
        for dist in 1..=2i32 {
            let nx = x as i32 + dx * dist;
            let ny = y as i32 + dy * dist;
            if nx < 0 || nx >= 15 || ny < 0 || ny >= 15 {
                break;
            }
            let cell = board.get(nx as usize, ny as usize);
            if cell == player {
                score += 3 - dist; // closer = better
            } else if cell == opponent {
                score += 2 - dist; // blocking is also valuable
            }
        }
    }
    // Center preference
    score += (7 - (x as i32 - 7).abs() + 7 - (y as i32 - 7).abs()) / 2;
    score
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::board::{Board, Cell};

    #[test]
    fn test_ai_returns_valid_move() {
        let mut board = Board::new();
        board.place(7, 7, Cell::Black).unwrap();
        let (x, y) = best_move(&board, Cell::White, Difficulty::Easy);
        assert!(x < 15 && y < 15);
        assert_eq!(board.get(x, y), Cell::Empty);
    }

    #[test]
    fn test_ai_takes_winning_move() {
        let mut board = Board::new();
        // White has 4 in a row, needs to complete
        board.place(0, 0, Cell::White).unwrap();
        board.place(1, 0, Cell::White).unwrap();
        board.place(2, 0, Cell::White).unwrap();
        board.place(3, 0, Cell::White).unwrap();
        // Black stones elsewhere
        board.place(7, 7, Cell::Black).unwrap();
        board.place(8, 7, Cell::Black).unwrap();

        let (x, y) = best_move(&board, Cell::White, Difficulty::Medium);
        assert_eq!((x, y), (4, 0), "AI should complete the five");
    }

    #[test]
    fn test_ai_blocks_opponent_four() {
        let mut board = Board::new();
        // Black has half-four along the board edge (only one open end at (4,0))
        board.place(0, 0, Cell::Black).unwrap();
        board.place(1, 0, Cell::Black).unwrap();
        board.place(2, 0, Cell::Black).unwrap();
        board.place(3, 0, Cell::Black).unwrap();

        let (x, y) = best_move(&board, Cell::White, Difficulty::Medium);
        assert_eq!(
            (x, y),
            (4, 0),
            "AI should block at (4,0), got ({x},{y})"
        );
    }

    #[test]
    fn test_first_move_center() {
        let board = Board::new();
        let (x, y) = best_move(&board, Cell::Black, Difficulty::Easy);
        assert_eq!((x, y), (7, 7), "First move should be center");
    }
}
