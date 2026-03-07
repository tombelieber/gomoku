use gomoku_engine::Game;

#[test]
fn test_game_flow() {
    let mut game = Game::new();
    let result = game.play_move(7, 7);
    assert!(result);
    assert_eq!(game.current_player(), "white");
    assert_eq!(game.move_count(), 1);
}

#[test]
fn test_undo() {
    let mut game = Game::new();
    game.play_move(7, 7);
    assert!(game.undo());
    assert_eq!(game.move_count(), 0);
    assert_eq!(game.current_player(), "black");
}

#[test]
fn test_reset() {
    let mut game = Game::new();
    game.play_move(7, 7);
    game.reset();
    assert_eq!(game.move_count(), 0);
    assert_eq!(game.current_player(), "black");
}
