const movies = [
    { name: "Joker", language: "English", img: "https://via.placeholder.com/200x120?text=Joker" },
    { name: "Avengers", language: "English", img: "https://via.placeholder.com/200x120?text=Avengers" },
    { name: "KGF", language: "Hindi", img: "https://via.placeholder.com/200x120?text=KGF" },
    { name: "Baahubali", language: "Telugu", img: "https://via.placeholder.com/200x120?text=Baahubali" },
    { name: "Thudarum", language: "Tamil", img: "https://via.placeholder.com/200x120?text=Thudarum" }
];

let selectedSeats = [];

function showMovies() {
    const lang = document.getElementById("language").value;
    const result = document.getElementById("result");

    const filtered = movies.filter(m => m.language === lang);

    result.innerHTML = `
        <div class="movie-grid">
            ${filtered.map(m => `
                <div class="movie" style="background-image:url('${m.img}')"
                     onclick="openMovie('${m.name}')">
                    ${m.name}
                </div>`).join("")}
        </div>
    `;
}

function openMovie(name) {
    document.getElementById("movieTitle").innerText = name;
    switchPage(2);
}

function goToSeats() {
    createSeats();
    switchPage(3);
}

function createSeats() {
    const seatBox = document.getElementById("seats");
    seatBox.innerHTML = "";
    selectedSeats = [];

    for (let i = 1; i <= 15; i++) {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = i;
        seat.onclick = () => selectSeat(seat, i);
        seatBox.appendChild(seat);
    }
}

function selectSeat(seat, num) {
    seat.classList.toggle("selected");

    if (selectedSeats.includes(num)) {
        selectedSeats = selectedSeats.filter(s => s !== num);
    } else {
        selectedSeats.push(num);
    }

    document.getElementById("selectedSeats").innerText =
        selectedSeats.length ? selectedSeats.join(", ") : "None";
}

function goToPayment() {
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat");
        return;
    }
    switchPage(4);
}

function confirmBooking() {
    alert("🎉 Booking Confirmed!\nSeats: " + selectedSeats.join(", "));
    location.reload();
}

function switchPage(num) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(`page${num}`).classList.add("active");
}
