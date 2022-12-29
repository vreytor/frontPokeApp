const userData = JSON.parse(localStorage.getItem("usuario"))
const user_name = userData.usuario.nombre

const user = document.querySelector('span[class="user-name"]')

const insert_user_name = document.createElement('p');
insert_user_name.innerHTML = user_name;

user.append(insert_user_name)

let userInfo = {
    name: userData.usuario.nombre + " " + userData.usuario.apellido,
    email: userData.usuario.correo,
    createdAt: userData.usuario.created_at
}

document.getElementById("cardUserTitle").innerHTML = userInfo.name
document.getElementById("cardUserEmail").innerHTML = userInfo.email
document.getElementById("cardUserCreatedAt").innerHTML = "Fecha de registro: "+userInfo.createdAt
console.info(userData)
