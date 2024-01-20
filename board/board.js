const pieceTypes = [
    { type: 'Flag', count: 1, name: '🚩', "isRed": true},
    { type: 'Scout', count: 8, name: '⛺', "isRed": true},
    { type: 'Infantry', count: 5, name: '⚔️', "isRed": true},
    { type: 'Cavalry', count: 4, name: '🏇', "isRed": true},
    { type: 'Cannon', count: 4, name: '🚀', "isRed": true},
    { type: 'Bomb', count: 6, name: '💣', "isRed": true},
    { type: 'Sergeant', count: 1, name: 'SER', "isRed": true},
    { type: 'Lieutenant', count: 3, name: 'LIEU', "isRed": true},
    { type: 'Captain', count: 3, name: 'CAP', "isRed": true},
    { type: 'Commander', count: 2, name: 'COM', "isRed": true},
    { type: 'Colonel', count: 1, name: 'COL', "isRed": true},
    { type: 'General', count: 1, name: 'GEN', "isRed": true},
    { type: 'Marshal', count: 1, name: 'MAR', "isRed": true}
];

// Plateau initial vide avec des trous - Benjamin GLEITZ
const initialBoard = Array.from({ length: 10 }, () => Array(10).fill(null));

// Positions des trous au milieu du plateau - Benjamin GLEITZ
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

// Fonction pour créer le plateau - Benjamin GLEITZ
function createBoard() {
    const boardContainer = document.getElementById('board');

    for (let i = 0; i < initialBoard.length; i++) {
        for (let j = 0; j < initialBoard[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;

            // Vérifier si la cellule est un trou au milieu du plateau
            const isHole = holePositions.some(position => position.row === i && position.col === j);
            if (isHole) {
                cell.classList.add('hole');
            }

            boardContainer.appendChild(cell);
        }
    }
}

// Fonction pour afficher le plateau - Benjamin GLEITZ
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
            boardContainer.appendChild(cell);
        }
    }
}

// Fonction pour placer chaque pion sur le plateau - Benjamin GLEITZ
function placeRedPieces() {
    const boardContainer = document.getElementById('board');

    // Pour chaque type de pièce
    pieceTypes.forEach(pieceType => {
        // Pour chaque pièce de ce type
        for (let i = 0; i < pieceType.count; i++) {
            let row, col;

            if (pieceType.type === 'Flag') {
                // Place le drapeau au fond du plateau
                row = 9;
                col = 5;
            } else {
                // Place les autres pièces en bas du plateau
                do {
                    row = Math.floor(Math.random() * 4) + 6; // Lignes 6 à 9 pour le joueur rouge (en bas du plateau)
                    col = Math.floor(Math.random() * 10);
                } while (initialBoard[row][col] !== null);
            }

            // Placer la pièce dans cette cellule
            initialBoard[row][col] = {
                type: pieceType.type,
                player: 'red'
            };

            // Créer l'élément HTML pour la pièce
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            const pieceElement = document.createElement('div');
            pieceElement.className = 'piece-on-board';
            pieceElement.textContent = pieceType.name;

            // Ajouter la classe spécifique pour les pièces rouges
            if (pieceType.isRed) {
                pieceElement.classList.add('red-player');
            }

            // Ajouter l'élément pièce à la cellule
            cell.appendChild(pieceElement);
        }
    });
}

// Fonction pour placer chaque pion sur le plateau - Benjamin GLEITZ
function placeBluePieces() {
    const boardContainer = document.getElementById('board');

    // Pour chaque type de pièce
    pieceTypes.forEach(pieceType => {
        // Pour chaque pièce de ce type
        for (let i = 0; i < pieceType.count; i++) {
            let row, col;
            pieceType.isRed = false;

            if (pieceType.type === 'Flag') {
                // Place le drapeau au fond du plateau
                row = 0;
                col = 4;
            } else {
                // Place les autres pièces en bas du plateau
                do {
                    row = Math.floor(Math.random() * 4); // Lignes 6 à 9 pour le joueur rouge (en bas du plateau)
                    col = Math.floor(Math.random() * 10);
                } while (initialBoard[row][col] !== null);
            }

            // Placer la pièce dans cette cellule
            initialBoard[row][col] = {
                type: pieceType.type,
                player: 'blue'
            };

            // Créer l'élément HTML pour la pièce
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            const pieceElement = document.createElement('div');
            pieceElement.className = 'piece-on-board';
            pieceElement.textContent = pieceType.name;

            // Ajouter la classe spécifique pour les pièces rouges
            if (!pieceType.isRed) {
                pieceElement.classList.add('blue-player');
            }

            // Ajouter l'élément pièce à la cellule
            cell.appendChild(pieceElement);
        }
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

function showSection(sectionId) {
            // Masquer toutes les sections
            var sections = document.getElementsByClassName('section');
            for (var i = 0; i < sections.length; i++) {
                sections[i].style.display = 'none';
            }
            
            // Afficher la section spécifiée
            document.getElementById(sectionId).style.display = 'block';
        }
        
// Appellez la fonction pour créer le plateau
createBoard();

renderBoard();

// Appellez la fonction pour placer les pièces rouges sur le plateau
placeRedPieces();

// Appellez la fonction pour placer les pièces bleues sur le plateau
placeBluePieces();
