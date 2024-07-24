import { Injectable } from '@angular/core';

//* Interfaces, types, enums & constants
export interface IBoardItem {
  id: number;
  state: PlayerType | null;
}

export type PlayerType = 'X' | 'O';
type BoardModeType = 'row' | 'col';
const BOARD_SIZE = 9;
//----- * -----/

@Injectable({
  providedIn: 'root'
})
export class GameService {

  board: IBoardItem[] = [];
  activePlayer: PlayerType = 'X';
  isGameRunning: boolean = false;
  winner: PlayerType | null = null;

  private _turnCount: number = 0;
  private _isGameOver: boolean = false;

  constructor() {
    this.newGame();
   }

  private _createBoard(): IBoardItem[] {
    let board: IBoardItem[] = [];
    for( let i = 0; i < BOARD_SIZE; i++ ){
      board.push( { id: i, state: null } )
    };
    return board;
  }

  private _updateBoard(squareClicked: IBoardItem) {
    this.board[ squareClicked.id ].state = this.activePlayer
    if (this.isWinner) {
       this.winner = this.activePlayer;
       this.isGameRunning = false;
       this._isGameOver = true;
    }
  }

  private _checkRowsAndCols(board: IBoardItem[], mode: BoardModeType): boolean {
    for (let i = 0; i < 3; i++) { 
      const index = mode === 'row' ? i * 3 : i;
      if (
        board[index].state &&
        board[index].state === board[index + (mode === 'row' ? 1 : 3)].state &&
        board[index].state === board[index + (mode === 'row' ? 2 : 6)].state 
        ) {
          return true;
        }
    }
    return false;
  }

  private _checkDiagonals(): boolean {
    const board = this.board;
    return (
      (board[0].state !== null &&
       board[0].state === board[4].state &&
       board[0].state === board[8].state) ||
      (board[2].state !== null &&
      board[2].state === board[4].state &&
      board[2].state === board[6].state)
      );
    }

  newGame(): void {
    this.activePlayer = 'X';
    this._turnCount = 0;
    this.isGameRunning = true;
    this._isGameOver =  false;
    this.winner = null;
    this.board = this._createBoard();
  }

  changePlayerTurn(squareClicked: IBoardItem): void {
  if (!this.board[squareClicked.id].state && !this._isGameOver) {
    this._updateBoard(squareClicked);
    if (!this._isGameOver) {
      this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
      this._turnCount++;
  }
  }
  }

  get gameOver(): boolean {
    return this._isGameOver;
  }

  get isWinner(): boolean {
    return (
    this._checkRowsAndCols(this.board, 'row') ||
    this._checkRowsAndCols(this.board, 'col') ||
    this._checkDiagonals()
    );
  }
}