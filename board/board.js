// Déclaration des variables globales
const pieceTypes = [
    { type: 'Flag', count: 1, name: '🚩', isRed: true },
    { type: 'Scout', count: 8, name: '⛺', isRed: true },
    { type: 'Infantry', count: 5, name: '⚔️', isRed: true },
    { type: 'Cavalry', count: 4, name: '🏇', isRed: true },
    { type: 'Cannon', count: 4, name: '🚀', isRed: true },
    { type: 'Bomb', count: 6, name: '💣', isRed: true },
    { type: 'Sergeant', count: 1, name: 'SER', isRed: true },
    { type: 'Lieutenant', count: 3, name: 'LIEU', isRed: true },
    { type: 'Captain', count: 3, name: 'CAP', isRed: true },
    { type: 'Commander', count: 2, name: 'COM', isRed: true },
    { type: 'Colonel', count: 1, name: 'COL', isRed: true },
    { type: 'General', count: 1, name: 'GEN', isRed: true },
    { type: 'Marshal', count: 1, name: 'MAR', isRed: true }
];

let currentPlayer = 'red'; // Initialisez la variable avec le joueur de départ
let selectedPiece = null;

// Plateau initial vide avec des trous
const initialBoard = Array.from({ length: 10 }, () => Array(10).fill(null));

// Positions des trous au milieu du plateau
const holePositions = [
    { row: 4, col: 2 },
    { row: 4, col: 3 },
    { row: 4, col: 6 },
    { row: 4, col: 7 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 6 },
    { row: 5, col: 7 }
];

// Fonction pour effacer le plateau de jeu
function clearBoard() {
    for (let i = 0; i < initialBoard.length; i++) {
        for (let j = 0; j < initialBoard[i].length; j++) {
            initialBoard[i][j] = null;
        }
    }
}

// Fonction pour mélanger les pièces et les placer sur le plateau de jeu en fonction des coordonnées
function shuffle(pieceConfigurations) {
    
    
fetchPieceConfigurations();
}

// Fonction pour afficher le plateau
function renderBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    for (let i = 0; i < initialBoard.length; i++) {
        for (let j = 0; j < initialBoard[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;

            const isHole = holePositions.some(position => position.row === i && position.col === j);
            if (isHole) {
                cell.classList.add('hole');
            }

            // Vérifier si la cellule contient une pièce
            if (initialBoard[i][j]) {
                const piece = initialBoard[i][j];
                const pieceElement = document.createElement('div');
                pieceElement.className = 'piece-on-board';
                pieceElement.textContent = pieceTypes.find(type => type.type === piece.type).name;

                // Ajouter la classe spécifique pour les pièces rouges ou bleues
                if (piece.player === 'red') {
                    pieceElement.classList.add('red-player');
                } else {
                    pieceElement.classList.add('blue-player');
                }

                // Ajouter l'élément pièce à la cellule
                cell.appendChild(pieceElement);
            }

            // Ajouter un gestionnaire d'événements de clic à chaque cellule
            cell.addEventListener('click', () => {
                // Vérifier si la cellule contient une pièce avant d'appeler handleCellClick
                if (initialBoard[i][j]) {
                    handleCellClick(i, j);
                } else {
                    // Ajoutez ici le code à exécuter si la cellule est vide
                    console.log('Cellule vide');
                }
            });

            boardContainer.appendChild(cell);
        }
    }
}

// Fonction pour récupérer les configurations de pièces depuis le serveur
function fetchPieceConfigurations() {
    fetch('http://localhost:3000/hints/pieces') // Assurez-vous de mettre l'URL correcte de votre serveur
        .then(response => response.json())
        .then(data => {
            // Effacer le plateau de jeu avant de placer les pièces
            clearBoard();

            // Placer chaque pièce sur le plateau en fonction de ses coordonnées
            data.forEach(piece => {
                const row = piece.coordinates.row;
                const col = piece.coordinates.col;
                const pieceType = piece.type;
                const player = piece.isRed ? 'red' : 'blue'; // Déterminer le joueur de la pièce

                // Placer la pièce sur le plateau à la position (row, col)
                initialBoard[row][col] = {
                    type: pieceType,
                    player: player
                };
            });

            console.log('Configurations de pièces récupérées :', data);

            // Actualiser l'interface utilisateur pour refléter les changements sur le plateau
            renderBoard();
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des configurations de pièces :', error);
        });
}

function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
 
    showSection('section1')
}
 
function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Appel de la fonction pour récupérer les configurations de pièces et les placer sur le plateau
fetchPieceConfigurations();
