const apiURL = 'https://api.sampleapis.com/wines/reds';
const wineContainer = document.getElementById('wine-container');
const dealsContainer = document.getElementById('deals-container');
const loader = document.getElementById('loader');

const wineModal = new bootstrap.Modal(document.getElementById('wineModal'));
const processModal = new bootstrap.Modal(document.getElementById('processModal'));

function showWineTrivia() { processModal.show(); }

function getGrape(name) { return name.includes("Cabernet") ? "Cabernet Sauvignon" : name.includes("Merlot") ? "Merlot" : "Premium Red Blend"; }
function getMethod(winery) { return `Traditionally fermented by ${winery} in oak barrels for 12-24 months.`; }

async function fetchWines() {
    try {
        const res = await fetch(apiURL);
        const data = await res.json();
        loader.style.display = 'none';
        
        // Deals
        data.slice(0, 3).forEach(wine => renderWine(wine, dealsContainer, true));
        // All
        data.forEach(wine => renderWine(wine, wineContainer, false));
    } catch (e) { loader.innerHTML = "Error loading."; }
}

function renderWine(wine, container, isDeal) {
    const card = document.createElement('div');
    card.className = isDeal ? 'col-md-4' : 'col-sm-6 col-md-4 col-lg-3';
    card.innerHTML = `
        <div class="card h-100 shadow p-3 text-center" onclick="showDetails(${JSON.stringify(wine).replace(/"/g, '&quot;')})" style="cursor:pointer">
            <img src="${wine.image}" class="wine-img mx-auto" onerror="this.src='https://via.placeholder.com/150'">
            <h6 class="fw-bold mt-2 text-truncate">${wine.wine}</h6>
            <div class="text-warning small">⭐ ${wine.rating.average}</div>
        </div>`;
    container.appendChild(card);
}

function showDetails(wine) {
    document.getElementById('modalImage').src = wine.image;
    document.getElementById('modalTitle').innerText = wine.wine;
    document.getElementById('modalGrape').innerText = getGrape(wine.wine);
    document.getElementById('modalProcess').innerText = getMethod(wine.winery);
    wineModal.show();
}

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Message Sent! We will contact you shortly.");
    e.target.reset();
});

fetchWines();