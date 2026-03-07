use crate::board::{Board, Cell, SIZE};

/// Pattern scores for consecutive stones in a line
const SCORE_FIVE: i32 = 1_000_000;
const SCORE_OPEN_FOUR: i32 = 50_000;
const SCORE_HALF_FOUR: i32 = 5_000;
const SCORE_OPEN_THREE: i32 = 5_000;
const SCORE_HALF_THREE: i32 = 500;
const SCORE_OPEN_TWO: i32 = 200;
const SCORE_HALF_TWO: i32 = 50;

fn pattern_score(count: usize, open_ends: usize) -> i32 {
    match (count, open_ends) {
        (5.., _) => SCORE_FIVE,
        (4, 2) => SCORE_OPEN_FOUR,
        (4, 1) => SCORE_HALF_FOUR,
        (3, 2) => SCORE_OPEN_THREE,
        (3, 1) => SCORE_HALF_THREE,
        (2, 2) => SCORE_OPEN_TWO,
        (2, 1) => SCORE_HALF_TWO,
        _ => 0,
    }
}

pub fn evaluate(board: &Board, player: Cell) -> i32 {
    let opponent = player.opponent();
    let mut score = 0i32;

    let directions: [(i32, i32); 4] = [(1, 0), (0, 1), (1, 1), (1, -1)];

    for y in 0..SIZE {
        for x in 0..SIZE {
            let cell = board.get(x, y);
            if cell == Cell::Empty {
                continue;
            }

            for &(dx, dy) in &directions {
                let px = x as i32 - dx;
                let py = y as i32 - dy;
                if px >= 0 && px < SIZE as i32 && py >= 0 && py < SIZE as i32 {
                    if board.get(px as usize, py as usize) == cell {
                        continue;
                    }
                }

                let (count, open_ends) = count_line(board, x, y, dx, dy, cell);
                let ps = pattern_score(count, open_ends);

                if cell == player {
                    score += ps;
                } else if cell == opponent {
                    score -= ps;
                }
            }

            if cell == player {
                let center_dist = ((x as i32 - 7).abs() + (y as i32 - 7).abs()) as i32;
                score += (14 - center_dist).max(0);
            } else if cell == opponent {
                let center_dist = ((x as i32 - 7).abs() + (y as i32 - 7).abs()) as i32;
                score -= (14 - center_dist).max(0);
            }
        }
    }

    score
}

fn count_line(board: &Board, x: usize, y: usize, dx: i32, dy: i32, stone: Cell) -> (usize, usize) {
    let mut count = 0;
    let mut nx = x as i32;
    let mut ny = y as i32;

    while nx >= 0 && nx < SIZE as i32 && ny >= 0 && ny < SIZE as i32 {
        if board.get(nx as usize, ny as usize) != stone {
            break;
        }
        count += 1;
        nx += dx;
        ny += dy;
    }

    let mut open_ends = 0;

    if nx >= 0 && nx < SIZE as i32 && ny >= 0 && ny < SIZE as i32 {
        if board.get(nx as usize, ny as usize) == Cell::Empty {
            open_ends += 1;
        }
    }

    let bx = x as i32 - dx;
    let by = y as i32 - dy;
    if bx >= 0 && bx < SIZE as i32 && by >= 0 && by < SIZE as i32 {
        if board.get(bx as usize, by as usize) == Cell::Empty {
            open_ends += 1;
        }
    }

    (count, open_ends)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::board::{Board, Cell};

    #[test]
    fn test_empty_board_score_zero() {
        let board = Board::new();
        assert_eq!(evaluate(&board, Cell::Black), 0);
    }

    #[test]
    fn test_center_bonus() {
        let mut board = Board::new();
        board.place(7, 7, Cell::Black).unwrap();
        let score = evaluate(&board, Cell::Black);
        assert!(score > 0);
    }

    #[test]
    fn test_three_in_row_scores_higher_than_two() {
        let mut board2 = Board::new();
        board2.place(7, 7, Cell::Black).unwrap();
        board2.place(8, 7, Cell::Black).unwrap();

        let mut board3 = Board::new();
        board3.place(7, 7, Cell::Black).unwrap();
        board3.place(8, 7, Cell::Black).unwrap();
        board3.place(9, 7, Cell::Black).unwrap();

        let score2 = evaluate(&board2, Cell::Black);
        let score3 = evaluate(&board3, Cell::Black);
        assert!(score3 > score2, "three({score3}) should beat two({score2})");
    }

    #[test]
    fn test_opponent_stones_negative() {
        let mut board = Board::new();
        board.place(7, 7, Cell::White).unwrap();
        board.place(8, 7, Cell::White).unwrap();
        board.place(9, 7, Cell::White).unwrap();
        let score = evaluate(&board, Cell::Black);
        assert!(score < 0);
    }
}
