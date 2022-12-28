// Botón agregar a favoritos Listo

const btn_add_favourites = document.getElementById('btn_add_favourites');

btn_add_favourites.addEventListener('click', confirmAddFavourites)


// Debe solicitar la confirmación de usuario
function confirmAddFavourites() {
    if(confirm('está usted seguro?')) { // Si le da a aceptar llama a la función addFavourites
        addFavourites()
    } else {
        console.log('vuelva pronto')
    }
}

// Obtenemos los datos en un object
function addFavourites() {
    const pokemonName = pokemon.value; // Obtiene el value del option seleccionado
    const btn_favorito = document.getElementById(`${pokemonName}`); 
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
        const img = data.sprites.front_default;
        const name = data.name;
        const type = data.types[0].type.name;

        const userData = JSON.parse(localStorage.getItem("usuario"));
        const uid = userData.usuario.uid;
        
        let pokeData = { // Este objeto debería enviarse a la base de datos
            user_id: uid,
            name: name,
            img: img,
            type: type
        }

        console.log(pokeData);

        sendFavourites(pokeData)
    });
}

function sendFavourites(pokeData) {
    fetch('http://localhost:9000/api/user/', {
        method: 'POST',
        body: JSON.stringify(pokeData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}