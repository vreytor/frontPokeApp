
let Usuario = [];

function verificarPasswordsRegistro(pass1 = '',pass2 = '') {
  if(pass1 != pass2) {
    return false;
  } else {
    return true;
  }
}

document.getElementById('form1').addEventListener('submit', function (element) {

  let credenciales = {
    correo: '',
    password: ''
  };

  credenciales.correo = document.getElementById('correoL').value;
  credenciales.password = document.getElementById('passwordL').value;

  // Stop submit event.
  element.preventDefault();


  const url = 'https://backapipoke-production.up.railway.app/api/auth/login';

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: credenciales.correo,
      password: credenciales.password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data,'data');
      // code here //
      if (data.msg) {
        alert(`${data.msg}`); /*displays error message*/
      } else {

        localStorage.setItem("usuario", JSON.stringify(data));
        alert('Bienvenid@!!');
        location.href ="http://127.0.0.1:5500/pages/pokemon/pokemonlist.html";

      }
    })
    .catch((err) => {
      console.log(err.msg);
    });

});


document.getElementById('form2').addEventListener('submit', function (element) {


  element.preventDefault();

  pass1 = document.getElementById('password').value;
  pass2 = document.getElementById('password2').value;

  const band = verificarPasswordsRegistro(pass1,pass2);
  console.log(band,'band');

  if (!band){
    window.alert('Las contraseñas no coinciden');
  }else {

    let usuario = {
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
    };

    usuario.nombre = document.getElementById('nombre').value;
    usuario.apellido = document.getElementById('apellido').value;
    usuario.correo = document.getElementById('correo').value;
    usuario.password = document.getElementById('password').value;

    const url = 'https://backapipoke-production.up.railway.app/api/usuarios';

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        password: usuario.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data');
        // code here //
        if (data.errors) {
          console.log(`${data.errors}`);
        } else {
          //Manejar rutas si entra acá lo metes a tu admin template y muestras topdo lo que quieres hacer
          //console.log('Uusario Creado con éxito jejeje');
          alert('Usario Creado con Éxito');

        }
      })
      .catch((err) => {
        console.log(err.msg);
      });
  }
});

let getUser = () => {
  let userTemp = JSON.parse(localStorage.getItem("usuario"));
  console.log(userTemp, 'data usuario');
}

getUser();




