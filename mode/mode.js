// Benjamin-GLEITZ
// écouteur d'événements au bouton "New"
document.getElementById('newButton').addEventListener('click', handleNewButtonClick);
 
// Fonction à exécuter lorsqu'on clique sur le bouton "New"
async function handleNewButtonClick() {
    try {
        const redPlayerName = prompt('Votre prénom:');
 
        const response = await fetch('http://localhost:3000/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                redPlayerName,
                status
            }),
        });
 
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
        }
 
        const responseData = await response.json();
        console.log('Response:', responseData);
 
        // Rediriger vers une autre page avec les données de la partie
        window.location.href = `../board/board.html?gameId=${responseData.id}`;
    } catch (error) {
        console.error('Error:', error);
    }
}
 
// Fonction pour rejoindre une partie en tant que joueur bleu
async function joinGame(gameId) {
    try {
        const bluePlayerName = prompt('Prénom du joueur bleu:');
 
        const response = await fetch(`http://localhost:3000/games/${gameId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bluePlayerName,
            }),
        });
 
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
        }
 
        window.location.href = `../board/board.html?gameId=${gameId}`;
    } catch (error) {
        console.error('Error:', error);
    }
}
 
// Fonction pour afficher les parties créées
async function displayCreatedGames() {
    try {
        const response = await fetch('http://localhost:3000/games?status=OPENED');
        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
        }
 
        const openedGames = await response.json();
 
        // Récupérer la div "created"
        const createdDiv = document.querySelector('.created');
 
        // Effacer le contenu existant de la div "created"
        createdDiv.innerHTML = '';
 
        // Boucler sur les parties ouvertes et les afficher
        openedGames.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.classList.add('game-link');
            gameElement.dataset.gameId = game.id; // Stockez l'ID de la partie dans l'attribut data-game-id
            gameElement.innerHTML = `<p>${game.status}: ${game.redPlayerName}</p>`;
            createdDiv.appendChild(gameElement);
 
            // Ajoutez un écouteur d'événements pour rediriger vers la page de la partie au clic
            gameElement.addEventListener('click', () => {
                if (!game.bluePlayerName) {
                    // Si le joueur bleu n'est pas défini, demandez-lui de rejoindre la partie
                    joinGame(game.id);
                } else {
                    // Si le joueur bleu est déjà défini, redirigez simplement vers la page de la partie
                    window.location.href = `../board/board.html?gameId=${game.id}`;
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
 
displayCreatedGames();