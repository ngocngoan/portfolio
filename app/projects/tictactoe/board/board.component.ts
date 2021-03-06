import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { TicTacToeService, Player, TileType } from './../tictactoe.service';

@Component({
    moduleId: module.id,
    selector: 'my-board',
    templateUrl: 'board.component.html',
    styles: [require('./../../../../scss/projects/tictactoe/tictactoe-board.scss').toString()],
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class BoardComponent implements OnInit, OnDestroy {
    private tileSetCount: number = 0;
    private currentPlayer: Player = this.userOne;
    private userOne: Player;
    private userTwo: Player;
    private tileBoard: any[] = [
        [TileType.null, TileType.null, TileType.null],
        [TileType.null, TileType.null, TileType.null],
        [TileType.null, TileType.null, TileType.null]
    ];
    constructor(private ticTacToeService: TicTacToeService, private router: Router) {
        this.userOne = this.ticTacToeService.getUserOne();
        this.userTwo = this.ticTacToeService.getUserTwo();
    }

    ngOnInit() {
        this.setPlayer();
        this.ticTacToeService.resetWinner();
    }

    ngOnDestroy() { this.resetTileBoard(); }

    setPlayer() {
        if (this.currentPlayer === this.userOne) { this.currentPlayer = this.userTwo;
        } else if (this.currentPlayer === this.userTwo) { this.currentPlayer = this.userOne;
        } else { this.currentPlayer = this.userOne; }
    }

    setTile(xaxis: number, yaxis: number) {
        if (this.tileBoard[yaxis][xaxis] !== TileType.null) { return; }
        if (xaxis === 0) {
            if (yaxis === 0) { this.tileBoard[0][0] = this.currentPlayer.tileType; }
            if (yaxis === 1) { this.tileBoard[1][0] = this.currentPlayer.tileType; }
            if (yaxis === 2) { this.tileBoard[2][0] = this.currentPlayer.tileType; }
        } else if (xaxis === 1) {
            if (yaxis === 0) { this.tileBoard[0][1] = this.currentPlayer.tileType; }
            if (yaxis === 1) { this.tileBoard[1][1] = this.currentPlayer.tileType; }
            if (yaxis === 2) { this.tileBoard[2][1] = this.currentPlayer.tileType; }
        } else if (xaxis === 2) {
            if (yaxis === 0) { this.tileBoard[0][2] = this.currentPlayer.tileType; }
            if (yaxis === 1) { this.tileBoard[1][2] = this.currentPlayer.tileType; }
            if (yaxis === 2) { this.tileBoard[2][2] = this.currentPlayer.tileType; }
        }
        this.tileSetCount++;
        if (this.checkForWinner(xaxis, yaxis)) {
            this.currentPlayer.score++;
            this.ticTacToeService.setWinner(this.currentPlayer);
            this.router.navigate(['/tictactoe', '/end']);
        }
        if (this.tileSetCount === 9) { this.router.navigate(['/tictactoe', '/end']); }
        this.setPlayer();
    }

    resetTileBoard() {
        this.tileSetCount = 0;
        for (let i = 0; i < this.tileBoard.length; i++) {
            for (let j = 0; j < this.tileBoard[i].length; j++) {
                this.tileBoard[i][j] = TileType.null;
            }
        }
    }

    checkForWinner(x: number, y: number): boolean {
        if (this.checkHorizontalWin(y)) { return true; }
        if (this.checkVerticalWin(x)) { return true; }
        if (this.checkDiagonalWin()) { return true; }
        return false;
    }

    checkHorizontalWin(y: number): boolean {
        let count: number = 0;
        for (let x = 0; x < this.tileBoard.length; x++) {
            if (this.tileBoard[y][x] === this.currentPlayer.tileType) { count++; }
            if (count === 3) { return true; }
        }
    }

    checkVerticalWin(x: number): boolean {
        let count: number = 0;
        for (let y = 0; y < this.tileBoard.length; y++) {
            if (this.tileBoard[y][x] === this.currentPlayer.tileType) { count++; }
            if (count === 3) { return true; }
        }
    }

    checkDiagonalWin(): boolean {
        let tb = this.tileBoard;
        if (tb[0][0] === tb[1][1] && tb[1][1] === tb[2][2] && tb[1][1] !== TileType.null) { return true; }
        if (tb[0][2] === tb[1][1] && tb[1][1] === tb[2][0] && tb[1][1] !== TileType.null) { return true; }
    }

}
