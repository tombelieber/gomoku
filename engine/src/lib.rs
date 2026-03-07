pub mod ai;
pub mod board;
pub mod eval;

use ai::Difficulty;
use board::{Board, Cell, SIZE};
use serde::Serialize;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Game {
    board: Board,
    current_player: Cell,
    winner: Option<Cell>,
    move_history: Vec<(usize, usize)>,
}

#[derive(Serialize)]
pub struct MoveResult {
    pub x: usize,
    pub y: usize,
    pub winner: Option<String>,
}

#[wasm_bindgen]
impl Game {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            board: Board::new(),
            current_player: Cell::Black,
            winner: None,
            move_history: Vec::new(),
        }
    }

    pub fn play_move(&mut self, x: usize, y: usize) -> bool {
        if self.winner.is_some() {
            return false;
        }
        if self.board.place(x, y, self.current_player).is_err() {
            return false;
        }
        self.move_history.push((x, y));
        if self.board.check_winner().is_some() {
            self.winner = Some(self.current_player);
        }
        self.current_player = self.current_player.opponent();
        true
    }

    /// difficulty: 0=easy, 1=medium, 2=hard
    pub fn ai_move(&mut self, difficulty: u8) -> JsValue {
        if self.winner.is_some() {
            return JsValue::NULL;
        }
        let diff = match difficulty {
            0 => Difficulty::Easy,
            2 => Difficulty::Hard,
            _ => Difficulty::Medium,
        };
        let (x, y) = ai::best_move(&self.board, self.current_player, diff);
        self.board.place(x, y, self.current_player).unwrap();
        self.move_history.push((x, y));

        let winner = self.board.check_winner().map(|c| match c {
            Cell::Black => "black".to_string(),
            Cell::White => "white".to_string(),
            Cell::Empty => unreachable!(),
        });
        if winner.is_some() {
            self.winner = self.board.check_winner();
        }

        self.current_player = self.current_player.opponent();
        let result = MoveResult { x, y, winner };
        serde_wasm_bindgen::to_value(&result).unwrap()
    }

    pub fn get_board(&self) -> JsValue {
        let cells: Vec<Vec<u8>> = (0..SIZE)
            .map(|y| {
                (0..SIZE)
                    .map(|x| match self.board.get(x, y) {
                        Cell::Empty => 0,
                        Cell::Black => 1,
                        Cell::White => 2,
                    })
                    .collect()
            })
            .collect();
        serde_wasm_bindgen::to_value(&cells).unwrap()
    }

    pub fn get_winner(&self) -> JsValue {
        match self.winner {
            Some(Cell::Black) => JsValue::from_str("black"),
            Some(Cell::White) => JsValue::from_str("white"),
            _ => JsValue::NULL,
        }
    }

    pub fn is_draw(&self) -> bool {
        self.winner.is_none() && self.board.is_full()
    }

    pub fn undo(&mut self) -> bool {
        if let Some((x, y)) = self.move_history.pop() {
            self.board.undo(x, y);
            self.winner = None;
            self.current_player = self.current_player.opponent();
            true
        } else {
            false
        }
    }

    pub fn reset(&mut self) {
        self.board = Board::new();
        self.current_player = Cell::Black;
        self.winner = None;
        self.move_history.clear();
    }

    pub fn current_player(&self) -> String {
        match self.current_player {
            Cell::Black => "black".to_string(),
            Cell::White => "white".to_string(),
            Cell::Empty => "none".to_string(),
        }
    }

    pub fn move_count(&self) -> usize {
        self.move_history.len()
    }
}

pub fn ping() -> String {
    "gomoku-engine ready".to_string()
}
