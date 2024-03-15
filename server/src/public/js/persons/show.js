const inputDni = document.getElementById('input-dni');
const lastname = document.getElementById('input-lastname');
const firstname = document.getElementById('input-name');
const personsTable = document.getElementById('persons');
const formPerson = document.getElementById('formPerson');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
let page  = 0;
let size = 10;
let url = `/api/personas?`;
const getPerson = async ()=>{
    try {
        const dni = inputDni.value;
        const apellido = lastname.value;
        const nombre = firstname.value;
        const res = await fetch(url + `dni=${dni}&apellido=${apellido}&nombre=${nombre}&page=${page}&size=${size}`);
        if(!res.ok){
            return [];
        };
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error interno del servidor al obtener las personas!, codigo de error: '+error,
        });
    };
};

const renderPerson = async()=>{
    try {
        const personsResponse = await getPerson();
        const persons = personsResponse.data; // Accediendo a los datos dentro de la respuesta
        
        if (persons.length === 0) {
            return [];
        }
        
        personsTable.innerHTML = '';
        for (let i = 0; i < persons.length; i++) {
            let person = persons[i];
            console.log(person);
            let observaciones = person.observaciones === null ? 'Sin observaciones' : person.observaciones.slice(0, 10) + '...';
            personsTable.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${person.dni}</td>
                <td>${person.apellido}</td>
                <td>${person.nombre}</td>
                <td>${person.domicilio}</td>
                <td>${person.localidad}</td>
                <td>${person.clase}</td>
                <td>${observaciones}</td>
                <td>
                    <a href="/personas/ver/${person.id}" class="btn btn-show btn-sm"><i class="bi bi-search"></i></a>
                </td>
            </tr>
            `;
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error interno del servidor al obtener las personas!, codigo de error: La persona no existe en la base de datos',
        });
    };
};

formPerson.addEventListener('submit', async (e)=>{
    e.preventDefault();
    btnNext.addEventListener('click',async()=>{
        page++;
        await renderPerson();
    });
    btnPrev.addEventListener('click',async()=>{
        if(page > 0){
            page--;
            await renderPerson();
        }
    });

    await renderPerson();
});