const formEditUser = () =>{
    let usuario = {
        uid: '',
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
      };
    usuario.id = JSON.parse(localStorage.getItem("usuario")).usuario.uid
    usuario.nombre = document.getElementById('nombre').value;
    usuario.apellido = document.getElementById('apellido').value;
    usuario.correo = document.getElementById('correo').value;
    usuario.password = document.getElementById('password').value;
    const url = 'https://backapipoke-production.up.railway.app/api/usuarios/'+usuario.id;
    fetch(url, {
        method: "PUT",
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
            alert('Usuario modificado con éxito');
  
          }
        })
        .catch((err) => {
          console.log(err.msg);
        });
}