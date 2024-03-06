const selectOriginRecord = document.getElementById('origin');

const getOriginRecord = async ()=>{
    try {
        const res = await fetch('/api/origenesExpediente/listar');
        if(!res.ok){
            return [];
        };
        const {data} = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderOriginRecord = async()=>{
    const origins = await getOriginRecord();
    if(origins.length < 1){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error, por favor inicie sesión nuevamente!... SI el error persiste, comuniquese con el Desarrollador!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          return ;
    };
    if(document.getElementById('selectOriginRecord')){
    origins.forEach(origin=>{
        selectOriginRecord.innerHTML+=`
        <option value=${origin.id}>
            ${origin.nombre}
        </option>
        `
    });};

    if(document.getElementById('originRecords')){
        const table = document.getElementById('originRecords');
        origins.forEach((origin,index)=>{
            table.innerHTML += `
            <tr>
                <td>
                    ${index + 1}
                </td>
                <td>
                    ${origin.nombre}
                </td>
                <td class="text-center">
                    <a href="/api/origenesExpediente/eliminar/${origin.id}" class="btn btn-danger btnDeleteOrigin btn-sm"> <i class="bi bi-x-octagon-fill"></i></a>  
                </td>
            </tr>
            `
        });
    };
};

document.addEventListener('DOMContentLoaded', async(e)=>{
    await renderOriginRecord();
});