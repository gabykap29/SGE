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
});