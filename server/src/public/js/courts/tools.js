
const Court = async (id) => {
    try {
        const res = await fetch(`/api/juzgados/${id}`);
        if(!res.ok){
            throw new Error('Error en la petición');
        };
        const { data } = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderCourtTable = async (id) => {
    try {
        const court = await Court(id);
        if(court.length > 0 && document.querySelector('#courts')){
            const table = document.querySelector('#courts');
            table.innerHTML = '';
            court.forEach((court,index)=>{
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${court.circunscripcion.nombre}</td>
                    <td>${court.nombre}</td>
                    <td class="text-center">
                        <button class="btn btn-danger btnDeleteCourt btn-sm" data-id="${court.id}"><i class="bi bi-x-octagon-fill"></i></button>
                    </td>
                `;
            });
        };
    } catch (error) {
        console.log(error);
    };
};

selectDistrict.addEventListener('change', async () => {
    const id = selectDistrict.value;
    await renderCourtTable(id);
    const btnDeleteCourt = document.querySelectorAll('.btnDeleteCourt');
    btnDeleteCourt.forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            const res = await fetch(`/api/juzgados/${id}`,{
                method: 'DELETE'
            });
            const data = await res.json();
            if(data.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Juzgado eliminado',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                await renderCourtTable(selectDistrict.value);
            }else if(data.status === 404){
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar juzgado',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error interno del servidor',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    });
});


const formOrigin = document.getElementById('formOrigin');
formOrigin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const origin = document.getElementById('inputOrigin').value;
    if(origin === ''){
        Swal.fire({
            icon: 'error',
            title: 'El campo no puede estar vacío',
            text: 'Por favor, ingrese un nombre para el origen de expediente',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    };
    const res = await fetch('/api/origenesExpediente',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre:origin})
    });
    const data = await res.json();
    if(data.status === 201){
        Swal.fire({
            icon: 'success',
            title: 'Origen de expediente creado',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
        });
        await renderOriginRecord();
    }else if(data.status === 400){
        Swal.fire({
            icon: 'error',
            title: 'Error al crear origen de expediente',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error interno del servidor',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
        });
    }
});