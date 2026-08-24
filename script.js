async function populateGrid() {
    const characterGrid = document.getElementById("character-grid");

    try {
        const res = await fetch("https://jeff-api.onrender.com/characters");

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`)
        }

        const data = await res.json();

        for (const character of data.data) {
            const card = document.createElement("div");

            card.classList.add("character-card");

            card.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
            `

            card.addEventListener("click", () => {
                console.log("Navigation not implemented yet");
            })

            characterGrid.appendChild(card);
        }
    } catch (error) {
        console.error("Failed to fetch characters: ", error);
    }
}

populateGrid();