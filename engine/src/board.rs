pub const SIZE: usize = 15;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Empty,
    Black,
    White,
}

impl Cell {
    pub fn opponent(self) -> Self {
        match self {
            Cell::Black => Cell::White,
            Cell::White => Cell::Black,
            Cell::Empty => Cell::Empty,
        }
    }
}

#[derive(Clone, Debug)]
pub struct Board {
    cells: [[Cell; SIZE]; SIZE],
    move_count: usize,
}

impl Board {
    pub fn new() -> Self {
        Self {
            cells: [[Cell::Empty; SIZE]; SIZE],
            move_count: 0,
        }
    }

    pub fn get(&self, x: usize, y: usize) -> Cell {
        self.cells[y][x]
    }

    pub fn place(&mut self, x: usize, y: usize, stone: Cell) -> Result<(), &'static str> {
        if x >= SIZE || y >= SIZE {
            return Err("out of bounds");
        }
        if self.cells[y][x] != Cell::Empty {
            return Err("cell occupied");
        }
        self.cells[y][x] = stone;
        self.move_count += 1;
        Ok(())
    }

    pub fn undo(&mut self, x: usize, y: usize) {
        self.cells[y][x] = Cell::Empty;
        self.move_count -= 1;
    }

    pub fn is_full(&self) -> bool {
        self.move_count >= SIZE * SIZE
    }

    pub fn move_count(&self) -> usize {
        self.move_count
    }

    pub fn check_winner(&self) -> Option<Cell> {
        let directions = [(1, 0), (0, 1), (1, 1), (1, -1i32)];
        for y in 0..SIZE {
            for x in 0..SIZE {
                let cell = self.cells[y][x];
                if cell == Cell::Empty {
                    continue;
                }
                for &(dx, dy) in &directions {
                    if self.count_direction(x, y, dx, dy, cell) >= 5 {
                        return Some(cell);
                    }
                }
            }
        }
        None
    }

    fn count_direction(&self, x: usize, y: usize, dx: i32, dy: i32, stone: Cell) -> usize {
        let mut count = 0;
        for i in 0..5 {
            let nx = x as i32 + dx * i;
            let ny = y as i32 + dy * i;
            if nx < 0 || nx >= SIZE as i32 || ny < 0 || ny >= SIZE as i32 {
                return count;
            }
            if self.cells[ny as usize][nx as usize] != stone {
                return count;
            }
            count += 1;
        }
        count
    }

    /// Get cells near existing stones (for AI move candidate generation)
    pub fn get_candidates(&self, radius: usize) -> Vec<(usize, usize)> {
        let mut seen = [[false; SIZE]; SIZE];
        let mut candidates = Vec::new();

        for y in 0..SIZE {
            for x in 0..SIZE {
                if self.cells[y][x] == Cell::Empty {
                    continue;
                }
                let y_min = y.saturating_sub(radius);
                let y_max = (y + radius + 1).min(SIZE);
                let x_min = x.saturating_sub(radius);
                let x_max = (x + radius + 1).min(SIZE);
                for ny in y_min..y_max {
                    for nx in x_min..x_max {
                        if self.cells[ny][nx] == Cell::Empty && !seen[ny][nx] {
                            seen[ny][nx] = true;
                            candidates.push((nx, ny));
                        }
                    }
                }
            }
        }

        if candidates.is_empty() {
            candidates.push((SIZE / 2, SIZE / 2));
        }
        candidates
    }

    pub fn cells(&self) -> &[[Cell; SIZE]; SIZE] {
        &self.cells
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_board_is_empty() {
        let board = Board::new();
        for y in 0..SIZE {
            for x in 0..SIZE {
                assert_eq!(board.get(x, y), Cell::Empty);
            }
        }
    }

    #[test]
    fn test_place_stone() {
        let mut board = Board::new();
        assert!(board.place(7, 7, Cell::Black).is_ok());
        assert_eq!(board.get(7, 7), Cell::Black);
    }

    #[test]
    fn test_place_on_occupied() {
        let mut board = Board::new();
        board.place(7, 7, Cell::Black).unwrap();
        assert!(board.place(7, 7, Cell::White).is_err());
    }

    #[test]
    fn test_place_out_of_bounds() {
        let mut board = Board::new();
        assert!(board.place(15, 0, Cell::Black).is_err());
    }

    #[test]
    fn test_win_horizontal() {
        let mut board = Board::new();
        for x in 0..5 {
            board.place(x, 0, Cell::Black).unwrap();
        }
        assert_eq!(board.check_winner(), Some(Cell::Black));
    }

    #[test]
    fn test_win_vertical() {
        let mut board = Board::new();
        for y in 0..5 {
            board.place(0, y, Cell::Black).unwrap();
        }
        assert_eq!(board.check_winner(), Some(Cell::Black));
    }

    #[test]
    fn test_win_diagonal() {
        let mut board = Board::new();
        for i in 0..5 {
            board.place(i, i, Cell::Black).unwrap();
        }
        assert_eq!(board.check_winner(), Some(Cell::Black));
    }

    #[test]
    fn test_win_anti_diagonal() {
        let mut board = Board::new();
        for i in 0..5 {
            board.place(14 - i, i, Cell::Black).unwrap();
        }
        assert_eq!(board.check_winner(), Some(Cell::Black));
    }

    #[test]
    fn test_no_winner_four_in_a_row() {
        let mut board = Board::new();
        for x in 0..4 {
            board.place(x, 0, Cell::Black).unwrap();
        }
        assert_eq!(board.check_winner(), None);
    }

    #[test]
    fn test_is_full() {
        let board = Board::new();
        assert!(!board.is_full());
    }
}
