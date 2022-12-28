const userData = JSON.parse(localStorage.getItem("usuario"))
const user_name = userData.usuario.nombre

const user = document.querySelector('span[class="user-name"]')

const insert_user_name = document.createElement('p');
insert_user_name.innerHTML = user_name;

user.append(insert_user_name)