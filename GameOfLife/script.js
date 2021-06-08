"use strict"


class Node{
    
    /* Args:
       row:    Number
       column: Number
       lab:    Board */
    constructor(row, column, hood){
        
        this.row       = row;
        this.column    = column;
        this.hood      = hood;
        this.sign      = ".";
        this.prevState = "."; 
    }

    /* Makes the node come to life, if it's lucky */
    generateLife(){
        const rand = Math.random();
        if(rand <= 0.3) {
            this.sign = "O";
            this.prevState = "O";
        }
    }

    /* Uses its neighbouring Nodes to evolve its state to either dead or alive */
    evolve(){
        let aliveNeighbours = 0;
        
        /* Would prefer in one if-check, but we got strict evaluation in JS */
        if(this.row !== 0){
            
            //Top left
            if(this.column !== 0){
                if(this.hood.board[this.row-1][this.column-1].prevState.localeCompare("O")) aliveNeighbours++;
            }
            
            //Top middle
            if(this.hood.board[this.row-1][this.column].prevState.localeCompare("O")) aliveNeighbours++;

            //Top Right
            if(this.column !== this.hood.columns-1){
                if(this.hood.board[this.row-1][this.column+1].prevState.localeCompare("O")) aliveNeighbours++;
            }
        }

        //Middle left
        if(this.column !== 0){
            if(this.hood.board[this.row][this.column-1].prevState.localeCompare("O")) aliveNeighbours++;
        }

        //Skipping middle middle, as we are middle middle.

        
        if(this.column !== this.hood.columns-1){
            if(this.hood.board[this.row][this.column+1].prevState.localeCompare("O")) aliveNeighbours++;
        }

        if(this.row !== this.hood.rows-1){
            //Bottom left
            if(this.column !== 0){
                if(this.hood.board[this.row+1][this.column-1].prevState.localeCompare("O")) aliveNeighbours++;
            }

            //Bottom middle
            if(this.hood.board[this.row+1][this.column].prevState.localeCompare("O")) aliveNeighbours++;

            //Bottom right
            if(this.column !== this.hood.columns-1){
                if(this.hood.board[this.row+1][this.column+1].prevState.localeCompare("O")) aliveNeighbours++;
            }
        }

        /* Update old state: */
        this.prevState = this.prevState;
        
        if(this.sign === "O"){
            if(aliveNeighbours === 2 || aliveNeighbours === 3) return;
            this.sign = ".";
            return;
        }

        if(aliveNeighbours === 3) this.sign = "O";
        return;

    }
}


class Board{

    /* Args:
       rows:    Number
       columns: Number */
    constructor(rows, columns){
        this.rows    = rows;
        this.columns = columns;
        this.board   = null;
        this.createBoard();

        this.play();
    }

    /* Creates a game board based on the constructor arguments */
    createBoard(){
        this.board = new Array(this.rows);

        /* Create new rows for the column */
        for(let row = 0; row < this.rows; row++){
            this.board[row] = new Array(this.columns);

            /* Create new nodes */
            for(let column = 0; column < this.columns; column++){
                const node = new Node(row, column, this);
                node.generateLife();
                this.board[row][column] = node;
            }
        }
    }

    /* Prints the board. */
    printBoard(){
        let str = "";

        if(this.board === null){
            console.log("The game board has not been initialized.");
            return;
        }

        console.log("'printBoard' called. Printing game board\n\n");
        for(let row = 0; row < this.rows; row++){
            for(let column = 0; column < this.columns; column++){
                str += this.board[row][column].sign + " "
            }
            str += "\n";
        }
        
        console.log(str);
    }

    /* Updates the board by looping once over the board. */
    updateBoard(){
        for(let row = 0; row < this.rows; row++){
            for(let column = 0; column < this.columns; column++){
                this.board[row][column].evolve();
            }
        }
    }

    play(){
        while(true){
            this.printBoard();
            let answer = prompt("Do you want to evolve? [Y]. 'q' to quit");
            if(answer.toLowerCase() === "q") break;
            this.updateBoard();
        }
        console.log("Thank you for playing!");
    }

}


function main(){
    const foo = new Board(20, 20);
}



main();


