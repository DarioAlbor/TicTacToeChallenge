import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService, IBoardItem } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div id="statusArea" class="status">Next player: <span>{{ gameService.activePlayer }}</span></div>
    <div id="winnerArea" class="winner">Winner: <span>{{ gameService.winner || 'None' }}</span></div>
    <button (click)="resetGame()">Reset</button>
    <section>
      <div class="row" *ngFor="let row of [0, 1, 2]">
        <button
          *ngFor="let col of [0, 1, 2]" 
          class="square" 
          [ngClass]="getSquareClass(row, col)"
          (click)="makeMove(row * 3 + col)"
          style="width:40px; height:40px;">
          {{ getSquareState(row, col) }}
        </button>
      </div>
    </section>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public gameService: GameService) {}

  resetGame() {
    this.gameService.newGame();
  }

  makeMove(index: number) {
    const square: IBoardItem = {
      id: index,
      state: this.gameService.activePlayer
    };
    this.gameService.changePlayerTurn(square);
  }

  getSquareClass(row: number, col: number): any {
    const state = this.gameService.board[row * 3 + col]?.state;
    return {
      'player-x': state === 'X',
      'player-o': state === 'O'
    };
  }

  getSquareState(row: number, col: number): string {
    return this.gameService.board[row * 3 + col]?.state || '';
  }
}