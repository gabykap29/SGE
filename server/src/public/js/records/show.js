const records = document.getElementById('records');

const getRecords = async (page=0, size=10) => {
    try {
        const res = await fetch(`/api/expedientes?page=${page}&size=${size}`);
        const {data} = await res.json();
        if(data.length < 1){
            return [];
        };
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderRecords = async () => {
    const expedientes = await getRecords();
    if(expedientes.length < 1){
        records.innerHTML = `
        <div class="alert alert-warning" role="alert">
            No hay expedientes cargados en el sistema
        </div>
        `;
        return;
    };
    console.log(expedientes)
    const html = expedientes.map((expediente,index) => {
        return `
        <tr>
            <td>${expediente.orden}</td>
            <td>${expediente.localidad.departamento.nombre}</td>
            <td>${expediente.localidad.nombre}</td>
            <td>${expediente.tipo_expediente.nombre}</td>
            <td>${expediente.juzgado.circunscripcion.nombre}</td>
            <td>${expediente.juzgado.nombre}</td>
            <td>${expediente.fechaCreacion}</td>
            <td>${expediente.fechaIngreso}</td>
            <td>${expediente.estado}</td>        
            <td>${expediente.secretario}</td>
            <td>
                <a href="/expedientes/${expediente.id}" class="btn btn-outline btn-sm btn-show"><i class="bi bi-eye-fill"></i></a>
            </td>
        </tr>
        `;
    }).join("");
    records.innerHTML = html;
};
document.addEventListener('DOMContentLoaded',async()=>{
    await renderRecords();
});