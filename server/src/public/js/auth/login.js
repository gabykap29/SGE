const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("user").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const { message } = await res.json();
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión!",
        text: message,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;  
    }
    const { message, permisos, rol,fullname } = await res.json();
    
    Swal.fire({
      title: "Good job!",
      text: message,
      icon: "success"
    });
    localStorage.setItem('permissions', JSON.stringify(permisos));
    localStorage.setItem('rol', JSON.stringify(rol));
    localStorage.setItem('fullname', JSON.stringify(fullname));
    setTimeout(() => {
      window.location.href = "/home";
    }, 2000);
  } catch (error) {
    console.log(error);
    return  Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
      footer: '<a href="#">Why do I have this issue?</a>'
    });;
  }
});
