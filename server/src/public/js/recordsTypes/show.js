const selectType = document.getElementById('selectType');

const getTypes = async () => {
    try {
        const res = await fetch('/api/tipoExpedientes');
        if(!res.ok){
            throw new Error('Error al cargar los tipos de expedientes');
        };
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderTypes = async () => {
    const types = await getTypes();
    types.data.length < 1 ? selectType.innerHTML = "<option value=''> No hay tipos de expedientes</option>":(
        types.data.forEach(type => {
            const option = document.createElement('option');
            option.value = type.id;
            option.textContent = type.nombre;
            selectType.appendChild(option);
        })); 
};

document.addEventListener('DOMContentLoaded',async()=>{
    await renderTypes(await getTypes());
});