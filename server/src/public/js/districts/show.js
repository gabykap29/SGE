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
};

document.addEventListener('DOMContentLoaded',async()=>{
    await renderDistricts();
});