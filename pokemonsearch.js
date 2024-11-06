const searchButton = document.getElementById('search-button');

const hpStat = document.getElementById('hp');
const attackStat = document.getElementById('attack');
const defenseStat = document.getElementById('defense');
const spAttack = document.getElementById('special-attack');
const spDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const pokemonName = document.getElementById('pokemon-name');
const id = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const type = document.getElementById('types');
const pokemonImage = document.getElementById('sprite');

searchButton.addEventListener("click", () => {
    const inputValue = document.getElementById('search-input');
    let url = "https://pokeapi.co/api/v2";
    let query = "/pokemon/";
    let name = inputValue.value.toLowerCase();  
    let ENDPOINT = `${url}${query}${name}`;

    fetch(ENDPOINT)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Pokémon not found`);
            }
            return response.json();
        })
        .then(data => {
            const stats = {};
            stats.name = data.name;
            stats.id = data.id;
            stats.weight = data.weight;
            stats.height = data.height;
            stats.image = data.sprites.front_default;
            stats.types = data.types.map(type => type.type.name);  

         
            type.innerHTML = '';  

     
            stats.types.forEach(typeName => {
                const typeElement = document.createElement('div');  
                typeElement.textContent = typeName.toUpperCase();  
                type.appendChild(typeElement);  
            });


            stats.hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
            stats.attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
            stats.defense = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
            stats["special-attack"] = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
            stats["special-defense"] = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
            stats.speed = data.stats.find(stat => stat.stat.name === 'speed').base_stat;

            hpStat.textContent = stats.hp;
            attackStat.textContent = stats.attack;
            defenseStat.textContent = stats.defense;
            spAttack.textContent = stats["special-attack"];
            spDefense.textContent = stats["special-defense"];
            speed.textContent = stats.speed;
            pokemonName.textContent = stats.name.toUpperCase();
            id.textContent = stats.id;
            weight.textContent = stats.weight;
            height.textContent = stats.height;
            pokemonImage.src = stats.image;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation');
            alert("Pokémon not found");
        });
});
