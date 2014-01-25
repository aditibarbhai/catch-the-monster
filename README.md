# Catch The Monster! 
<em>A Simple HTML5 Game</em>

Catch The Monster is a simple HTML5 I made following [this tutorial](http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/).

There are some bugs in the original code which I have fixed in my version, namely:

1) I've added constraints to the game logic so that player no longer goes off screen

2) Added a simpler function to calculate the random position of the player, by giving a "max" and "min" range



    // random number generator from MDN:
    /**
     * Returns a random number between min and max
     */
    function getRandomArbitary (min, max) {
        return Math.random() * (max - min) + min;
    }

3) This also results in the monster no longer appearing half or completely off screen 
