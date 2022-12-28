// Se obtienen los datos de los pokemones

const pokemon = document.getElementById('pokemon')

pokemon.addEventListener('change', addPokemons)

function addPokemons(e) {
    showPokemonImg(e.target.value);
    showPokemonName(e.target.value);
}

function selectPoke() {
    const pokeApi = 'https://pokeapi.co/api/v2/generation/1/'
    
    fetch(pokeApi, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
        const pokemons = data.pokemon_species;
        let html = '';

        sortByName(pokemons)
        
        for (const i in pokemons) {
            html += '<option value=' + pokemons[i].name + '>' + pokemons[i].name + '</option>'
        }

        pokemon.innerHTML = html; // Añade los options con los nombres de los pokemones al select
    });
}

selectPoke()

const pokemon_container = document.getElementById('pokemon_container');

let pokemons_container = document.createElement('div')
pokemons_container.classList.add('pokemon')

// Muestra las imágenes del pokemon seleccionado

function showPokemonImg(pokemonName) {
    const urlImg = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(urlImg, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
        const img = data.sprites.front_default;

        let img_content = `<div class="img-container"><img src="${img}" alt="${pokemonName}"></div>`
        
        pokemons_container.innerHTML = img_content;

        pokemon_container.append(pokemons_container)
    });
}

// Muestra el nombre del pokemon seleccionado

function showPokemonName(pokemonName) {
    const urlName = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(urlName, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
        const name = data.name;

        pokemons_container.innerHTML += `<div class="info"><h3 class="name">${name}</h3></div>`;

        pokemon_container.append(pokemons_container)
    })
    
}

// Se ordena los nombres alfabéticamente

function sortByName(pokemons) {
    pokemons.sort((a, b) => a.name.localeCompare(b.name))
}