const pokemon_close_btn = document.querySelector('div.pokemon')

pokemon_close_btn.addEventListener('onmouseenter', delete_pokemon)

function delete_pokemon() {
    alert('funciona')
}