import Swal from "sweetalert2";

const Localities = async (id) => {
    try {
        const res = await fetch(`/api/localidades/${id}`);
        if(!res.ok){ 
            throw { status: res.status, statusText: res.statusText }
        };
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return alertify.error('Error al cargar las localidades');
    };
};


const renderLocalitiesTable = async (id) => {
    const localities = await Localities(id);
    if(localities.data.length > 0 && document.querySelector('#localities')){
        const table = document.querySelector('#localities');
        table.innerHTML = '';
        localities.data.forEach((locality,index)=>{
            const row = table.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${locality.nombre}</td>
                <td>${locality.departamento.nombre}</td>
                <td>
                    <button class="btn btn-danger btnDeleteLocality btn-sm" data-id="${locality.id}"><i class="bi bi-x-octagon-fill"></i></button>
                </td>
            `;
        });
    };
};

selectDepart.addEventListener('change', async () => {
    const id = selectDepart.value;
    const table = document.querySelector('#localities');
    table.innerHTML = '';
    await renderLocalitiesTable(id);

    
    const btnDeleteLocality = document.querySelectorAll('.btnDeleteLocality');
    if(btnDeleteLocality){
        btnDeleteLocality.forEach(btn=>{
            btn.addEventListener('click',async (e)=>{
                Swal.fire({
                    title: "Estas seguro?",
                    text: "Esta acción no se puede deshacer!, se eliminará la localidad y todos los expedientes asociados a ella.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!"
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                        const id = btn.dataset.id;
                        const res = await fetch(`/api/localidades/${id}`,{
                            method: 'DELETE'
                        });
                        const data = await res.json();
                        if(data.status === 200){
                            Swal.fire({
                                icon: 'success',
                                title: 'Localidad eliminada',
                                text: data.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            await renderLocalitiesTable(selectDepart.value);
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al eliminar localidad',
                                text: data.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        };
                    };
                });
            });
        });
    };


});



