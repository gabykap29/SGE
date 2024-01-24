const selectCourt = document.querySelector('#selectCourt');


const getCourt = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/juzgados/${id}`);
        if(!res.ok){
            throw new Error('Error en la petición');
        };
        const { data } = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderCourt = async (id) => {
    try {
        const court = await getCourt(id);
        selectCourt.innerHTML = '';
        court.length < 1 ? selectCourt.value = 'No hay juzgados cargados!' : (
            court.forEach(court => {
                const option = document.createElement('option');
                option.value = court.id;
                option.textContent = court.nombre;
                selectCourt.appendChild(option);
            }));
    } catch (error) {
        console.log(error);
    };
};

selectDistrict.addEventListener('change', async () => {
    const id = selectDistrict.value;
    await renderCourt(id);
});