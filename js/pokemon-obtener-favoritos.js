const userData = JSON.parse(localStorage.getItem("usuario"))
const user_uid = userData.usuario.uid

function obtenerFavoritos() {    
    fetch(`http://localhost:9000/api/user/`, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
        
        const filteredData = filterByUserId(data, user_uid);

        console.log(filteredData)

        muestraPokemonFavorito(filteredData)
    });
}


function filterByUserId(data, userId) {
    return data.filter((item) => item.user_id === userId);
}


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



const pokemon_favoritos_container = document.getElementById('pokemon_favoritos_container'); // grande

// Muestra las imágenes del pokemon seleccionado

function muestraPokemonFavorito(filteredData) {
    for (const index in filteredData) {
        let pokemon_total_container = document.createElement('div')
        let pokemon_img = document.createElement('div')
        let pokemon_text = document.createElement('div')

        const img = filteredData[index].img;
        const name = filteredData[index].name;
        const type = filteredData[index].type;

        let img_content = `<div class="img-container"><img src="${img}"></div>`
        let text_content = `<div class="info"><h3 class="name">${name}</h3></div>
        <small class="type">Tipo: <span>${type}</span></small>`
        
        pokemon_img.innerHTML = img_content;
        pokemon_text.innerHTML += text_content;

        pokemon_total_container.append(pokemon_img)
        pokemon_total_container.append(pokemon_text)
        pokemon_total_container.classList.add('pokemon')
        pokemon_total_container.style.backgroundColor = colors[type];
        pokemon_favoritos_container.append(pokemon_total_container)
    }   
}

obtenerFavoritos()