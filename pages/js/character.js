const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

async function populatePage() {
    const characterName = document.getElementById("character-name");
    const characterDesc = document.getElementById("character-desc");
    const characterImage = document.getElementById("character-img");
    const characterCanonicity = document.getElementById("character-canonicity");

    const res = await fetch(`https://jeff-api.onrender.com/characters/${characterId}`);
    const character = await res.json();

    characterName.innerHTML = character.name;
    characterDesc.innerHTML = character.description;
    characterImage.src = character.image;
    characterCanonicity.innerHTML = `Canon: ${character.canon ? "yes" : "no"}`;
}

populatePage();