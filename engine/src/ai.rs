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
            Difficulty::Easy => 2,
            Difficulty::Medium => 4,
            Difficulty::Hard => 6,
        }
    }
}

pub fn best_move(board: &Board, player: Cell, difficulty: Difficulty) -> (usize, usize) {
    // First move: always center
    if board.move_count() == 0 {
        return (7, 7);
    }

    let depth = difficulty.depth();
    let candidates = board.get_candidates(2);

    let mut best_score = i32::MIN;
    let mut best = candidates[0];

    for &(x, y) in &candidates {
        let mut b = board.clone();
        b.place(x, y, player).unwrap();

        // Immediate win check
        if b.check_winner() == Some(player) {
            return (x, y);
        }

        let score = minimax(&mut b, depth - 1, i32::MIN, i32::MAX, false, player);
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
) -> i32 {
    if depth == 0 || board.check_winner().is_some() || board.is_full() {
        return evaluate(board, ai_player);
    }

    let candidates = board.get_candidates(2);

    if is_maximizing {
        let mut max_score = i32::MIN;
        for &(x, y) in &candidates {
            board.place(x, y, ai_player).unwrap();
            let score = minimax(board, depth - 1, alpha, beta, false, ai_player);
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
            let score = minimax(board, depth - 1, alpha, beta, true, ai_player);
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
        // Black has open four
        board.place(1, 0, Cell::Black).unwrap();
        board.place(2, 0, Cell::Black).unwrap();
        board.place(3, 0, Cell::Black).unwrap();
        board.place(4, 0, Cell::Black).unwrap();

        let (x, y) = best_move(&board, Cell::White, Difficulty::Medium);
        assert!(
            (x == 0 && y == 0) || (x == 5 && y == 0),
            "AI should block at (0,0) or (5,0), got ({x},{y})"
        );
    }

    #[test]
    fn test_first_move_center() {
        let board = Board::new();
        let (x, y) = best_move(&board, Cell::Black, Difficulty::Easy);
        assert_eq!((x, y), (7, 7), "First move should be center");
    }
}
