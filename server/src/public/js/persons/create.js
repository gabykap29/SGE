const formPerson = document.getElementById('formPerson');
const dni = document.getElementById('dni');
const recordId = document.getElementById('recordId');
const getPerson = async (dni) => {
    try {
        const res = await fetch(`/api/personas?dni=${dni}`);
        if (res.status === 404) {
            return null; // O algún valor que indique que no se encontró la persona
        }
        if (!res.ok) {
            // Si hay algún otro tipo de error, puedes lanzar una excepción
            throw new Error(`Error en la solicitud: ${res.status}`);
        }
        const { data } = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null; // O algún valor que indique un error en la solicitud
    }
};


const renderPerson = (person) => {
    const lastname = document.getElementById('lastname');
    const firstname = document.getElementById('firstname');
    const address = document.getElementById('address');
    const observations = document.getElementById('observations');
    const locality = document.getElementById('localityPerson');
    const year = document.getElementById('year');
    if(person.length === 0){
        return [];
    };
    try {
        lastname.value = person.apellido;
        firstname.value = person.nombre;
        address.value = person.domicilio;
        observations.value = person.observaciones;
        locality.value = person.localidad;
        year.value = person.clase;
        console.log(person);
    } catch (error) {
        console.log(error);
    };

};

dni.addEventListener('change', async () => {
    const person = await getPerson(dni.value);
    if(!person){
        return [];
    };
    renderPerson(person[0]);
});

formPerson.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dni = document.getElementById('dni').value;
    const apellido = document.getElementById('lastname').value;
    const nombre = document.getElementById('firstname').value;
    const domicilio = document.getElementById('address').value;
    const obs = document.getElementById('obs').value;
    const tipo = document.getElementById('type').value;
    const clase = document.getElementById('year').value;
    const localidad = document.getElementById('localityPerson').value;

    const res = await fetch('/api/personas/create',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dni,
            apellido,
            nombre,
            domicilio,
            observaciones:obs,
            tipo,
            clase,
            localidad,
            recordId: recordId.dataset.id,
        }),
    });
    const data = await res.json();

    if(res.status === 201){
        alertify.success(data.message);
        formPerson.reset();
        //Funcion del archivo recordDetails.js
        const recordId = document.querySelector('#recordId').dataset.id;
        renderRecord(recordId);
        $('#modalPerson').modal('hide');
    }else{
        alertify.error(data.message);
    };
});