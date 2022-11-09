/*
REGLES DU JEU :
- Le jeu a 2 joueurs, jouant tour à tour.
- A chaque tour, un joueur lance un dé autant de fois qu'il le souhaite. Chaque résultat est ajouté à son résultat ROUND.
- MAIS, si le joueur lance un 1, tout son résultat ROUND est perdu. Ensuite, c'est au tour du joueur suivant.
- Le joueur peut choisir de "Hold", ce qui signifie que son résultat ROUND est ajouté à son résultat GLOBAL. Après c'est au tour du joueur suivant.
- Le premier joueur à atteindre 100 points sur le score GLOBAL remporte la partie.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Nombre aléatoire
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Afficher le résultat
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3. Mettre à jour le score du tour SI le numéro obtenu n'étais pas 1
        if (dice !== 1) {
            // Ajouter un résultat
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Nouveau joueur
            nextPlayer();
        }
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Ajouter le résultat actuel au score GLOBAL
        scores[activePlayer] += roundScore;

        // Mettre à jour l'UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Vérifier si le joueur a gagné le jeu
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Nouveau joueur
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Nouveau joueur
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}