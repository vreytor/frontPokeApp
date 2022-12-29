// Botón agregar a favoritos Listo

const btn_add_favourites = document.getElementById('btn_add_favourites');

btn_add_favourites.addEventListener('click', confirmAddFavourites)


// Debe solicitar la confirmación de usuario
function confirmAddFavourites() {
    if(confirm('¿Desea añadirlo a su lista de favoritos?')) { // Si le da a aceptar llama a la función addFavourites
        addFavourites()
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

        // console.log(pokeData);

        // Agregamos una llamada a la API para obtener la lista de Pokémon favoritos del usuario
        fetch(`https://backapipoke-production.up.railway.app/api/favoritos/`, {
            method: 'get'
        })
        .then((response) => response.json())
        .then((data) => {

          const filteredData = filterByUserId(data, uid);

            // Recorremos la lista de Pokémon favoritos
            for (let favorite of filteredData) {
                // Si el nombre del Pokémon ya se encuentra en la lista, mostramos un mensaje y evitamos enviar los datos al servidor
                if (favorite.name === name) {
                    alert('Ya ha sido agregado con anterioridad');
                    return;
                }
            }
            // Si el nombre del Pokémon no se encuentra en la lista, enviamos los datos al servidor
            sendFavourites(pokeData);
        });
    });
}


function filterByUserId(data, userId) {
  return data.filter((item) => item.user_id === userId);
}


function sendFavourites(pokeData) {
    fetch('https://backapipoke-production.up.railway.app/api/favoritos/', {
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