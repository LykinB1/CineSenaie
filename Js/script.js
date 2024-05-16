// ASSENTOS

const seatMap = document.getElementById('seat-map');
const selectedSeatsContainer = document.getElementById('selected-seats');
const totalPriceContainer = document.getElementById('total-price');
const totalRows = 16; 
const seatsPerRow = 12; 
const seatPrice = 39.90; 
let selectedSeats = [];

function createSeats() {
    for (let row = 1; row <= totalRows; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.dataset.row = row;
            seat.dataset.seatNum = seatNum;
            seat.addEventListener('click', () => {
                toggleSeatSelection(seat);
            });
            const seatLabel = document.createElement('div');
            seatLabel.className = 'seat-label';
            seatLabel.textContent = `${row}-${seatNum}`;
            seat.appendChild(seatLabel);
            rowElement.appendChild(seat);
        }
        seatMap.appendChild(rowElement);
    }
}

function toggleSeatSelection(seat) {
    const seatIndex = selectedSeats.findIndex(s => s.row === seat.dataset.row && s.seatNum === seat.dataset.seatNum);
    if (seatIndex !== -1) {
        selectedSeats.splice(seatIndex, 1);
        seat.classList.remove('selected');
    } else {
        selectedSeats.push({
            row: seat.dataset.row,
            seatNum: seat.dataset.seatNum
        });
        seat.classList.add('selected');
    }
    updateSelectedSeats();
}

function updateSelectedSeats() {
    selectedSeatsContainer.innerHTML = '';
    const heading = document.createElement('h2');
    selectedSeatsContainer.appendChild(heading);
    if (selectedSeats.length === 0) {
        const noSeatsMessage = document.createElement('p');
        noSeatsMessage.textContent = 'Nenhum assento selecionado.';
        selectedSeatsContainer.appendChild(noSeatsMessage);
    } else {
        const list = document.createElement('ul');
        selectedSeats.forEach(seat => {
            const listItem = document.createElement('li');
            listItem.textContent = `Fila ${seat.row}, Assento ${seat.seatNum}`;
            list.appendChild(listItem);
        });
        selectedSeatsContainer.appendChild(list);
    }
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPrice = selectedSeats.length * seatPrice;
    totalPriceContainer.innerHTML = `<h2>Total a Pagar</h2><p>R$${totalPrice.toFixed(2)}</p>`;
}

createSeats();

// -------------------------------------------------------------------------------------------




// Search 

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', function () {
    searchInput.focus();
    document.getElementById('search').classList.toggle('expand');
});