const selectOriginRecord = document.getElementById('origin');
const originRecord = document.getElementById('originRecord');

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
    if(document.getElementById('originRecord')){
    originRecord.innerHTML = '';
    origins.forEach(origin=>{
        originRecord.innerHTML+=`
        <option value=${origin.id}>
            ${origin.nombre}
        </option>
        `
    });};

    if(document.getElementById('selectOriginRecord')){
        const table = document.getElementById('originRecords');
        table.innerHTML = '';
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
                    <button class="btn btn-danger btnDeleteOrigin btn-sm" data-id=${origin.id}> <i class="bi bi-x-octagon-fill"></i></button>  
                </td>
            </tr>
            `
        });
    }else{
        origins.forEach((origin,index)=>{
            originRecord.innerHTML += `
            <option value=${origin.id}> ${origin.nombre} </option>
            `
        });
    }
};

document.addEventListener('DOMContentLoaded', async(e)=>{
    await renderOriginRecord();
    const btnDeleteOrigin = document.querySelectorAll('.btnDeleteOrigin');
    btnDeleteOrigin.forEach(btn=>{
        btn.addEventListener('click',async(e)=>{
            e.preventDefault();
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const res = await fetch(`/api/origenesExpediente/${btn.dataset.id}`,{
                        method: 'DELETE'
                    });
                    const data = await res.json();
                    if(data.status === 200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Origen de expediente eliminado',
                            text: data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        await renderOriginRecord();
                    }else if(data.status === 404){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al eliminar origen de expediente',
                            text: data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    };
                }
              });

        });
    });
});