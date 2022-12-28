function eliminarPokemonFavorito(pokemon_delete_button, id) {
    pokemon_delete_button.addEventListener('click', (event) => {
        fetch(`https://backapipoke-production.up.railway.app/api/favoritos/${id}`, { // Obtiene el id desde filteredData
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const pokemonContainer = event.target.parentNode; // Elimina pokemon_total_container del DOM
            pokemonContainer.remove();
        })
        .catch((err) => {
            console.log(err);
        });
    });
}