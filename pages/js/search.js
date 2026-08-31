const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-button");
const characterGrid = document.getElementById("search-grid");

async function loadCharacters(name = "") {
    try {
        characterGrid.innerHTML = "";

        let url = "https://jeff-api.onrender.com/characters";

        if (name !== "") {
            url += `?name=${encodeURIComponent(name)}`;
        }

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
    const searchTerm = searchBar.value.trim();

    loadCharacters(searchTerm);
})