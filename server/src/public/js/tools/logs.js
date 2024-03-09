const formLogsDate = document.getElementById('formLogsDate');

const getLogs = async (fecha) => {
    try {
        const res = await fetch(`/api/logs/${fecha}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error interno del servidor al obtener el archivo de logs!',
        });
        return { status: 500, message: 'Error interno del servidor' };
    }
};

function extractUser(userAgent) {
    var matches = userAgent.match(/\badmin\b|\buser\b/i);
    return matches ? matches[0] : "Desconocido";
}

function renderLogData(response) {
    if (response.status === 200) {
        var logData = response.data.trim().split('\n');
        var tableBody = document.getElementById('registros');
    
        logData.forEach(function(log) {
            var logDetails = log.split(' ');
            var timestamp = logDetails.slice(0, 3).join(' ');
            var ip = logDetails[logDetails.length - 2];
            var method = logDetails[1];
            var request = logDetails[2];
            var status = logDetails[3];
            var userAgent = logDetails.slice(4).join(' ').replace(/"/g, '');
    
            var os;
            if (userAgent.includes("Windows")) {
                os = "Windows";
            } else if (userAgent.includes("Macintosh")) {
                os = "Macintosh";
            } else if (userAgent.includes("Linux")) {
                os = "Linux";
            } else {
                os = "Otro";
            }
    
            var user = extractUser(userAgent);
    
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${timestamp}</td>
                <td>${ip}</td>
                <td>${request}</td>
                <td>${method}</td>
                <td>${status}</td>
                <td>${os}</td>
                <td>${user}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message || 'Error al obtener los registros de logs',
        });
    }
}

formLogsDate.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fecha = document.getElementById('inputDate').value;
    const serverResponse = await getLogs(fecha);
    renderLogData(serverResponse);
});
