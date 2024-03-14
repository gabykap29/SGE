const formLogsDate = document.getElementById("formLogsDate");

const getLogs = async (fecha) => {
  try {
    const res = await fetch(`/api/logs/${fecha}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error interno del servidor al obtener el archivo de logs!",
    });
    return { status: 500, message: "Error interno del servidor" };
  }
};

const renderLogData = (data) => {
  const registros = document.getElementById("registros");
  registros.innerHTML = "";
  if (data.status === 404) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "¡No se encontró el archivo de logs para la fecha indicada!",
    });
    return;
  }
  if (data.status === 500) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "¡Error interno del servidor al obtener el archivo de logs!",
    });
    return;
  }
  if (data.data.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: "¡No hay registros para la fecha indicada!",
    });
    return;
  }

  data.data.forEach((registro, index) => {
    const { timestamp, message } = registro;

    if (typeof message === "string") {
      // Si el mensaje es una cadena, probablemente sea un registro de solicitud sin formato
      const parts = message.split(" "); // Dividir la cadena por espacios
      const url = parts[0]; // El método HTTP debería estar en la primera parte
      const method = parts[1]; // La URL debería estar en la segunda parte
      const status = parts[2]; // El código de estado debería estar en la tercera parte
      const user = registro.meta.req.headers.cookie || "Parte de Petición";
      const ip = registro.meta.req.headers.host || "sin datos";
      const userAgent = registro.meta.req.headers["user-agent"] || "sin datos";
      const os = "sin datos";
      const cookieParts = user.split(";");
      const username = cookieParts[0].split("=")[1];
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${dayjs(timestamp).format("DD-MM-YYYY HH:mm")}</td>
            <td>${ip || "Sin datos"}</td>
            <td>${method || "GET"}</td>
            <td>${url || "Sin datos"}</td>

            <td>${status || 200}</td>
            <td>${os || "sin datos"}</td>
            <td>${userAgent || "sin datos"}</td>
            <td>${username || "Parte de Petición"}</td> 
            `;
      registros.appendChild(tr);
    } else {
      // Si el mensaje es un objeto, probablemente sea un registro de solicitud con formato JSON
      const { ip, method, url, status, userAgent, os } = message;

      let username;
      // Si existe un usuario en el mensaje, extraerlo
      if (!registro.meta) {
        username = "Parte de Petición";
      } else {
        const user = registro.meta.req.headers.cookie;
        const cookieParts = user.split(";");
        username = cookieParts[0].split("=")[1];
      }
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${dayjs(timestamp).format("DD-MM-YYYY HH:mm")}</td>
                <td>${ip}</td>
                <td>${url}</td>
                <td>${method}</td>
                <td>${status}</td>
                <td>${os}</td>
                <td>${userAgent}</td>
                <td>${username}</td> 
            `;
      registros.appendChild(tr);
    }
  });
};

formLogsDate.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fecha = document.getElementById("inputDate").value;
  const serverResponse = await getLogs(fecha);
  renderLogData(serverResponse);
});
