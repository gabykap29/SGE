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
      return  alertify.error(`Error message: ${message}`);
    }
    const { message } = await res.json();
    alertify.success(`Success message: ${message} `);
    setTimeout(() => {
      window.location.href = "/index";
    }, 2000);
  } catch (error) {
    console.log(error);
    return  alertify.error(`Error message: ${error}`);
  }
});
