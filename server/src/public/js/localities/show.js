const selecLocality = document.getElementById('selecLocalidad');
const selectDepart = document.getElementById('selectDepar');
const getLocalities = async (id) => {
    try {
        const res = await fetch(`/api/localidades/${id}`);
        if(!res.ok){ 
            throw { status: res.status, statusText: res.statusText }
        };
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};

const showLocalities = async (id) => {
    const localities = await getLocalities(id);
    selecLocality.innerHTML= '';
    localities.data.length < 1 ? selecLocality.innerHTML = '<option value="">No hay localidades</option>' : (
        localities.data.forEach(locality => {
            const option = document.createElement('option');
            option.value = locality.id;
            option.textContent = locality.nombre;
            selecLocality.appendChild(option);
        }));
    
};

selectDepart.addEventListener('change', async () => {
    const id = selectDepart.value;
    await showLocalities(id);
});