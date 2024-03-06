
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
});