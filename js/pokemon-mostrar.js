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
        

        pokemons.map(element => {
            let string = element.name;           
            element.nombre = string[0].toUpperCase() + string.slice(1);
            
        })

        for (const i in pokemons) {
            html += '<option value=' + pokemons[i].name + '>' + pokemons[i].nombre + '</option>'
        }

        pokemon.innerHTML += html; // Añade los options con los nombres de los pokemones al select
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
        const nameUpperCase = data.name[0].toUpperCase() + data.name.slice(1);
        // console.log(name, 'Nombre pokimon')
        // if (verifyFavourites(name) == true ) {
        //     let text_content = `<div class="info ${name} favorite-pokemon"><h3 class="name">${name}</h3></div>`
        //     pokemons_container.innerHTML += text_content;
        // } else {
        //     let text_content = `<div class="info ${name}"><h3 class="name">${name}</h3></div>`
        //     pokemons_container.innerHTML += text_content;
        // }

        let text_content = `<div class="info ${name}"><h3 class="name">${nameUpperCase}</h3></div>`
        pokemons_container.innerHTML += text_content;

        pokemon_container.append(pokemons_container)
    })
    
}

// Se ordena los nombres alfabéticamente

function sortByName(pokemons) {
    pokemons.sort((a, b) => a.name.localeCompare(b.name))
}



// Cambiar color de elegidos

// function verifyFavourites(name) {    
//     const userData = JSON.parse(localStorage.getItem("usuario"))
//     const user_uid = userData.usuario.uid

//     fetch('https://backapipoke-production.up.railway.app/api/favoritos/', {
//         method: 'get'
//     })
//     .then((response) => response.json())
//     .then((data) => {
        
//         const filteredData = filterByUserId(data, user_uid);

//         console.log(filteredData,'filteredData');

//         const filteredName = findByName(filteredData, name)

//         console.log(filteredName)
//     });
// }

// function findByName(filteredData, name) {
//     return filteredData.find((pokemon) => pokemon.name == name)
// }

// function filterByUserId(data, userId) {
//     return data.filter((item) => item.user_id === userId);
// }