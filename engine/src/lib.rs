use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn ping() -> String {
    "gomoku-engine ready".to_string()
}
