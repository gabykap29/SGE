const getRecord = async (id) => {
    try {
        const res = await fetch(`/api/expedientes/${id}`);
        if(res.status === 404) {
            return [];
        };
        const {data} = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderRecord = async (id) => {
    const department = document.querySelector('#department');
    const locality = document.querySelector('#locality');
    const dateOrigin = document.querySelector('#dateOrigin');
    const dateStart = document.querySelector('#dateStart');
    const jurisdiction = document.querySelector('#jurisdiction');
    const court = document.querySelector('#court');
    const order = document.querySelector('#order');
    const secretary = document.querySelector('#secretary');
    const resume = document.querySelector('#resume');
    const involvedPerson = document.querySelector('#involvedPerson');
    const confiscation = document.querySelector('#confiscation');
    const observations = document.querySelector('#observations');
    const recordType = document.querySelector('#recordType');

    const record = await getRecord(id);
    if(record.length === 0) {
        return;
    };
    department.textContent = "Departamento/ " + record.localidad.departamento.nombre;
    locality.textContent = "Localidad/ "+record.localidad.nombre;
    dateOrigin.textContent = "Fecha Origen/"+ dayjs(record.fecha_origen).format('DD-MM-YYYY');
    dateStart.textContent = "Fecha Inicio/"+ record.fecha_inicio;
    jurisdiction.textContent = "Circunscripción/ "+record.juzgado.circunscripcion.nombre;
    court.textContent = "Juzgado/ "+record.juzgado.nombre;
    order.textContent = "Orden/ "+record.orden;
    secretary.textContent = "Secretario/"+record.secretario;
    resume.textContent = record.resumen;
    involvedPerson.innerHTML = record.persona_involucrada ? record.persona_involucrada : '<td colspan="4">No hay personas involucradas</td>'; 
    confiscation.textContent = record.confiscacion ? record.confiscacion : 'No hay secuestros que mostrar.';
    observations.textContent = record.observaciones ? record.observaciones : 'No hay observaciones que mostrar.';
    switch(record.estado) {
        // 1 es completado, 2 es vencido y 3 es en curso
        case "1":
            recordType.innerHTML = `Expediente ${record.tipo_expediente.nombre} <span class="badge bg-success">Completado</span>`;
            break;
        case "2":
            recordType.innerHTML = `Expediente ${record.tipo_expediente.nombre} <span class="badge bg-danger">Vencido</span>`;
            break;
        case "3":
            recordType.innerHTML = `Expediente ${record.tipo_expediente.nombre} <span class="badge bg-warning">En curso</span>`;
            break;
        default:
            recordType.textContent = 'Sin estado';
            break;
    };
};

document.addEventListener('DOMContentLoaded', () => {
    const recordId = document.querySelector('#recordId').dataset.id;
    renderRecord(recordId);
});