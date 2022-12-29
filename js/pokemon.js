

// }
let arrayPokemon = [];

let dataPokemonAll = async (result) => {
  result.map((pokemonItem) => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
      .then((result) => {
        createPokemon(result);
        arrayPokemon.push(result.data);
      });
  });


}


let dataPokemon = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').catch((err) => console.log("Error:", err));
  
  dataPokemonAll(response.data.results);
}

function fetchPokemonData(pokemon) {
  let url = pokemon.url
  fetch(url)
    .then(response => response.json())
    .then(function (pokeData) {
      console.log(pokeData)
    })
}


/*pintar card pokemon*/
const colors = {
  fire: '#FFA05D',
  grass: '#8FD594',
  electric: '#FFE43B',
  water: '#7E97C0',
  ground: '#CAAC4D',
  rock: '#90642D',
  poison: '#9D5B9B',
  bug: '#EAFD71',
  dragon: '#97b3e6',
  psychic: '#FF96B5',
  flying: '#CDCDCD',
  fighting: '#FF5D5D',
  normal: '#FFFFFF'
}

const main_types = Object.keys(colors);


const pokeContent = document.getElementById('pokemonContent');

function createPokemon(pokemon2) {

  let pokemon = pokemon2.data;

  const pokemonEl = document.createElement('div');

  pokemonEl.classList.add('pokemon');

  const poke_types = pokemon.types.map(type => type.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;


  if (poke_types.length == 2){
    const pokeInnerHTML = `
          <div class="img-container">
              <img src="${pokemon.sprites.front_default}" alt="${name}" />
          </div>
          <div class="info">
              <span class="number">#${pokemon.id.toString()
        .padStart(3, '0')}</span>
              <h3 class="name">${name}</h3>
              <small class="type">Tipo: <span>${poke_types[0]}</span></small>
              <small class="type">Tipo: <span>${poke_types[1]}</span></small>
          </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    pokeContent.appendChild(pokemonEl);
  } else {
    const pokeInnerHTML = `
          <div class="img-container">
              <img src="${pokemon.sprites.front_default}" alt="${name}" />
          </div>
          <div class="info">
              <span class="number">#${pokemon.id.toString()
        .padStart(3, '0')}</span>
              <h3 class="name">${name}</h3>
              <small class="type">Tipo: <span>${type}</span></small>
          </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    pokeContent.appendChild(pokemonEl);
  }

}

// let getUser = () => {
//   let userTemp = JSON.parse(localStorage.getItem("usuario"));
//   console.log(userTemp.usuario, 'data usuario');

//   document.getElementById('nombreUsuario').value = userTemp.usuario.nombre;
//   /* let emailUsuario = document.getElementById('emailUsuario'); */
// }

// getUser();

dataPokemon();

