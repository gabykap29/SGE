const formEditUser = document.getElementById('formEditUser');
const contentEditUser = document.getElementById('content-edit');
const getUser = async ()=>{
    try {
        const id = contentEditUser.dataset.id;
        const res = await fetch(`/api/usuarios/${id}`);
        const data = await res.json();
        if(data.length === 0){
            Swal.fire({
                icon: "error",
                title: "Error 404 - Not Found",
                text: "Usuario no encontrado!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            return;
        };
        const {nombre,apellido,username,rol} = data;
        document.getElementById('lastname').value = nombre;
        document.getElementById('firstname').value = apellido;
        document.getElementById('username').value = username;
        document.getElementById('rol').value = rol;

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Error 500 - Internal Server Error",
            text: "Error al obtener el usuario!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    };
};

formEditUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const id = contentEditUser.dataset.id;
        const lastname = document.getElementById('lastname').value;
        const firstname = document.getElementById('firstname').value;
        const username = document.getElementById('username').value;
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if(password !== confirmPassword){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Las contraseñas no coinciden!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            return;
        };
        const res = await fetch(`/api/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apellido:lastname,
                nombre:firstname,
                username,
                role,
                password,
                confirmPassword
            })
        });
        if(!res.ok){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al editar el usuario!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            return;
        };
        const data = await res.json();
        Swal.fire({
            title: "Éxito!",
            text: data.message,
            icon: "success"
          });
        formEditUser.reset();
        setTimeout(() => {
            window.location.href = '/usuarios';
        }, 1500);
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    };
});

document.addEventListener('DOMContentLoaded',()=>{
    getUser();
});