# Game Of Life
*Author: Oliver Johansen*  
*Started: 16.05.2021*   

### What is Game of Life
Conway's "Game of Life" is a simulation of how cells multiply and decay over time, given a few simple rules. The rules are:  
1. A cell can be in one of two possible states each round: "Dead" or "Alive".  
2. Each "round" is counted as a "generation".  
3. A cell's "neighbour" is a given cell's closest cell. Given a row- and column index, these are:  
    3.1 [row-1].  
    3.2 [row+1].  
    With one of these indices as well:  
    3.3 [column-1].  
    3.4 [column+1].  

The next rules dictates the state of the cell:  
3. A cell (which is alive) will die if there are more than 4 neighbours in a state of "Alive" around it due to starvation.  
4. A cell (which is alive) will die if there are less than 3 neighbours in a state of "Alive" around it due to underpopulation.  
5. A cell (which is alive) will remain alive if there are 3 or 4 neighbours in a state of "Alive" around it.  
6. A cell (which is dead) will remain dead there are anything but 3 neighbours in a state of "Alive" around it.  
7. A cell (which is dead) will be ressurected if there are exactly 3 neighbours in a state of "Alive" around it.  

### The Goal
The simulation does not require many lines of code. However, I want to get a nice feeling for JavaScript, CSS and HTML by working on this project. Later on, I will write more advanced (hopefully, at least) projects which actually solves real needs (for me at least;)).  


### TODO:
1. Write a class "Cell".    
    1.1 Properties: y-coordinate, x-coordinate, sign ('.' for dead and 'O' for alive).    
    1.2 Methods: getState, toString (at least something similar).

2. Write a class "GameBoard".  
    1.1 Properties: 2D Cell-array.  
    1.2 Methods: init, evolve, startSimulation.  


Other: (Do when I am done with the rest):  
1. Let user choose the randomness of the initial state.  
2. Let user change the scale of the simulation.  
3. Create a nice HTML and CSS page.  