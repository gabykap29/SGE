const formUser = document.getElementById('formUser');


formUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const lastname = document.getElementById('lastname').value;
        const firstname = document.getElementById('firstname').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alertify.error('Las contraseñas no coinciden');
        return;
    };

    const res = await fetch('/usuarios/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lastname,
            firstname,
            username,
            password,
            role
        })
    });
    if(!res.ok){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al crear el usuario!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        return;
    };
    const data = await res.json();
    Swal.fire({
        title: "Good job!",
        text: data.message,
        icon: "success"
      });
    formUser.reset();
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