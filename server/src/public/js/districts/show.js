const selectDistrict = document.getElementById('selectDistrict');

const getDistricts = async () => {
    try {
        const res = await fetch('/api/circunscripciones');
        if(!res.ok){
            throw new Error('Error al cargar los distritos');
        };
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderDistricts = async () => {
    const districs = await getDistricts();
    districs.data.length < 1 ? selectDistrict.innerHTML = '<option value="">No hay distritos</option>' : (
        districs.data.forEach(district => {
            const option = document.createElement('option');
            option.value = district.id;
            option.textContent = district.nombre;
            selectDistrict.appendChild(option);
        }));
    if(districs.data.length > 0 && document.querySelector('#districts')){
        const table = document.querySelector('#districts');
        table.innerHTML = '';
        districs.data.forEach(district=>{
            const row = table.insertRow();
            row.innerHTML = `
                <td>${district.id}</td>
                <td>${district.nombre}</td>
                <td class="text-center">
                    <button class="btn btn-danger btnDeleteDistrict btn-sm" data-id="${district.id}"><i class="bi bi-x-octagon-fill"></i></button>
                </td>
            `;
        });
    };
};

document.addEventListener('DOMContentLoaded',async()=>{
    await renderDistricts();
    const btnDeleteDistrict = document.querySelectorAll('.btnDeleteDistrict');
    if(btnDeleteDistrict){
        btnDeleteDistrict.forEach(btn=>{
            btn.addEventListener('click',async (e)=>{
                Swal.fire({
                    title: "Estas seguro?",
                    text: "Esta acción no se puede deshacer!, se eliminará el distrito y todos los expedientes asociados a él.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!"
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                        const id = btn.dataset.id;
                        const res = await fetch(`/api/circunscripciones/${id}`,{
                            method: 'DELETE'
                        });
                        const data = await res.json();
                        if(data.status === 200){
                            Swal.fire({
                                icon: 'success',
                                title: 'Distrito eliminado',
                                text: data.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            await renderDistricts();
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al eliminar distrito',
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