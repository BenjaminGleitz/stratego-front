// Configuration des types de pièces - Benjamin GLEITZ
const pieceTypes = [
    { type: 'Flag', count: 1, name: 'Fl' },
    { type: 'Scout', count: 8, name: 'Sc' },
    { type: 'Infantry', count: 5, name: 'In' },
    { type: 'Cavalry', count: 5, name: 'Cav' },
    { type: 'Cannon', count: 6, name: 'Can' },
    { type: 'Bomb', count: 6, name: 'Bo' },
    { type: 'Sergeant', count: 4, name: 'Se' },
    { type: 'Lieutenant', count: 4, name: 'Li' },
    { type: 'Captain', count: 4, name: 'Ca' },
    { type: 'Commander', count: 4, name: 'Com' },
    { type: 'Colonel', count: 3, name: 'Col' },
    { type: 'General', count: 2, name: 'Ge' },
    { type: 'Marshal', count: 1, name: 'Ma' }
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

// Récupérez l'ID de la partie depuis l'URL (paramètre gameId)
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

async function shuffle() {
    try {
        // Effectuez l'appel API pour mélanger
        const response = await fetch(`http://localhost:3000/games/${gameId}`, {
            method: 'PATCH', // Utilisez la méthode POST pour les opérations de mise à jour
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
        }

        // Mettez à jour le redSetup en appelant la fonction update
        await fetch(`http://localhost:3000/games/${gameId}`, {
            method: 'PATCH', // Utilisez la méthode PATCH pour les opérations de mise à jour partielle
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                redSetup: 'ok',
            }),
        });

        // Optionnel : Effectuez toute autre action nécessaire après la mise à jour
        console.log('RedSetup updated: ok');
    } catch (error) {
        console.error('Error:', error);
    }
}

// // Fonction pour mélanger les pièces en faisant appel à l'API - Benjamin GLEITZ
// async function shuffle() {
//     try {
//         const response = await fetch('http://localhost:3000/'); // !Remplacez l'URL pour api-games
//         if (!response.ok) {
//             throw new Error('Unable to fetch game configuration');
//         }

//         const newConfig = await response.json();

//         updateBoard(newConfig);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// Fonction pour mettre à jour le plateau avec une nouvelle configuration - Benjamin GLEITZ
// function updateBoard(newConfig) {
//     // Réinitialisez le plateau
//     initialBoard.forEach(row => row.fill(null));

//     newConfig.forEach(({ row, col, piece }) => {
//         initialBoard[row][col] = piece;
//     });

//     renderBoard();
// }

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

            if (initialBoard[i][j]) {
                cell.innerHTML = `<div class="piece-on-board">${initialBoard[i][j]}</div>`;
            }

            boardContainer.appendChild(cell);
        }
    }
}

// Mettez à jour le contenu de l'élément avec le message
messageElement.textContent = message;
