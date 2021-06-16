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
        this.sign      = '.';
    }

    /* Makes the node come to life, if it's lucky */
    generateLife(){
        if(Math.random() <= 0.3) {
            this.sign = 'O';
        }
    }
    
    /* Uses its neighbouring Nodes to evolve its state to either dead or alive */
    evolve(){
        let aliveNeighbours = 0;
        
        /* Would prefer in one if-check, but we got strict evaluation in JS */
        if(this.row !== 0){
            
            //Top left
            if(this.column !== 0){
                if(this.hood.board[this.row-1][this.column-1].sign === 'O') aliveNeighbours++;
            }
            
            //Top middle
            if(this.hood.board[this.row-1][this.column].sign === 'O') aliveNeighbours++;

            //Top Right
            if(this.column !== this.hood.columns-1){
                if(this.hood.board[this.row-1][this.column+1].sign === 'O') aliveNeighbours++;
            }
        }

        //Middle left
        if(this.column !== 0){
            if(this.hood.board[this.row][this.column-1].sign === 'O') aliveNeighbours++;
        }

        //Skipping middle middle, as we are middle middle.

        
        if(this.column !== this.hood.columns-1){
            if(this.hood.board[this.row][this.column+1].sign === 'O') aliveNeighbours++;
        }

        if(this.row !== this.hood.rows-1){
            //Bottom left
            if(this.column !== 0){
                if(this.hood.board[this.row+1][this.column-1].sign === 'O') aliveNeighbours++;
            }

            //Bottom middle
            if(this.hood.board[this.row+1][this.column].sign === 'O') aliveNeighbours++;

            //Bottom right
            if(this.column !== this.hood.columns-1){
                if(this.hood.board[this.row+1][this.column+1].sign === 'O') aliveNeighbours++;
            }
        }
        
        return aliveNeighbours;

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
        this.img     = "";
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
                this.img += node.sign + " ";
            }
            this.img += "\n";
        }
    }

    /* Prints the board. */
    printBoard(){
        console.log("'printBoard' called. Printing game board\n\n");
        console.log(this.img);
    }

    
    updateIter(row, column){
        let neighbours = 0;
        let alive;
        let node = null;
        
        if(row === this.rows) {
            console.log(this.img);
            return; 
        }
        
        node = this.board[row][column];
        neighbours = node.evolve();
        
        if(node.sign === 'O'){
            if(neighbours === 2 || neighbours == 3){
                alive = true;
                this.img += "O ";
            } else {
                this.img += ". ";
            }

        } else if(neighbours === 3){
            alive = true;
            this.img += "O ";
        } else {
            alive = false;
            this.img += ". ";
        }
        
        if(column === this.columns-1){
            this.img += "\n";
            this.updateIter(row+1, 0);
        } else {
            this.updateIter(row, column+1);
        }

        // After returning when base case hits,
        if(alive){
            this.board[row][column].sign = 'O';
        } else {
            this.board[row][column].sign = '.';
        }
    }
    
    /* Updates the board by looping once over the board. */
    updateBoard(){
        this.img = "";
        this.updateIter(0, 0);
    }
    
    
    play(){
        let i = 0;
        while(i++ < 10){
            
            setTimeout(this.updateBoard.bind(this), 1000)
        }
    }

}


function main(){
    const foo = new Board(20, 20);
}



main();


