const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-button");
const characterGrid = document.getElementById("search-grid");

const alignmentFilter = document.getElementById("alignment-filter");
const canonFilter = document.getElementById("canon-filter");

async function loadCharacters(name = "", alignment = "", canon = "") {
    try {
        characterGrid.innerHTML = "";

        const params = new URLSearchParams();

        if (name !== "") {
            params.append("name", name)
        }

        if (alignment !== "") {
            params.append("alignment", alignment);
        }

        if (canon !== "") {
            params.append("canon", canon)
        }

        let url = `https://jeff-api.onrender.com/characters?${params.toString()}`;

        console.log(url)

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await res.json();

        for (const character of data.data) {
            const card = document.createElement("div");

            card.classList.add("character-card");

            card.innerHTML = `
                <img src="${character.image}", alt="${character.name}">
                <h2>${character.name}</h2>
            `;

            card.addEventListener("click", () => {
                window.location.href = `/pages/character.html?id=${character.id}`
            });

            characterGrid.appendChild(card);
        }
    } catch (error) {
        console.error("Failed to fetch characters:", error)
    }
}

searchBtn.addEventListener("click", () => {
    const name = searchBar.value.trim();
    const alignment = alignmentFilter.value;
    const canon = canonFilter.value;

    loadCharacters(name, alignment, canon);
});