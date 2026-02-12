let selectedCards = [];

// Ir a sección 2
function goToCards() {
  document.getElementById("section1").classList.remove("active");
  document.getElementById("section2").classList.add("active");

  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  selectedCards = [];

  // Cartas de Jugadores (1-12)
  for (let i = 1; i <= 12; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src="${i}.png" alt="card ${i}">`;
    card.onclick = () => toggleSelect(card, { type: 'player', id: i });
    cardsContainer.appendChild(card);
  }

  // ✨ Especiales: FC Points, Coins, Gems
  const specialCards = [
    { name: "FC Points", img: "fcpoint.png", amount: "100.000" },
    { name: "Coins", img: "coin.png", amount: "1.000.000" },
    { name: "Gems", img: "gem.png", amount: "50.000" }
  ];

  specialCards.forEach(item => {
    let card = document.createElement("div");
    card.classList.add("card", "special-card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="card-label">${item.amount} <br> <span>${item.name}</span></div>
    `;
    card.onclick = () => toggleSelect(card, { type: 'resource', name: item.name, img: item.img, amount: item.amount });
    cardsContainer.appendChild(card);
  });
}

// Selección múltiple mejorada
function toggleSelect(cardElement, cardData) {
  const index = selectedCards.findIndex(c => 
    (c.type === 'player' && c.id === cardData.id) || 
    (c.type === 'resource' && c.name === cardData.name)
  );

  if (index > -1) {
    cardElement.classList.remove("selected");
    selectedCards.splice(index, 1);
  } else {
    cardElement.classList.add("selected");
    selectedCards.push(cardData);
  }
}

// Ir a sección 3 (Búsqueda)
function goToSearching() {
  if (selectedCards.length === 0) {
    alert("Please select at least one card.");
    return;
  }

  document.getElementById("section2").classList.remove("active");
  document.getElementById("section3").classList.add("active");

  const playerID = document.getElementById("playerID").value || "GUEST_USER";
  document.getElementById("searchingPlayer").innerText = "Connecting to UID: " + playerID;

  let dots = 0;
  const loadingText = document.getElementById("loadingText");
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    loadingText.innerText = "Injecting Rewards" + ".".repeat(dots);
  }, 400);

  setTimeout(() => {
    clearInterval(interval);
    showFinalResults();
  }, 3000);
}

// Sección Final
function showFinalResults() {
  document.getElementById("section3").classList.remove("active");
  document.getElementById("section4").classList.add("active");

  const finalCards = document.getElementById("finalCards");
  finalCards.innerHTML = "";

  selectedCards.forEach(c => {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "selected", "reveal-animation");

    if (c.type === 'resource') {
      cardDiv.innerHTML = `
        <img src="${c.img}" alt="reward">
        <div class="card-label">${c.amount} <br> <span>${c.name}</span></div>
      `;
    } else {
      cardDiv.innerHTML = `<img src="${c.id}.png" alt="player">`;
    }
    finalCards.appendChild(cardDiv);
  });

  launchConfetti();
}

function restart() {
  document.getElementById("section4").classList.remove("active");
  document.getElementById("section1").classList.add("active");
  document.getElementById("playerID").value = "";
  selectedCards = [];
}

// 🎉 Confetti
function launchConfetti() {
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ffd600', '#00ff9c', '#ffffff'] });
}