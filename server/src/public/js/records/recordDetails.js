
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
    const origin = document.querySelector('#origin');
    const confiscationInput = document.querySelector('#confiscationInput');
    const recordPdf = document.querySelector('#recordPdf');
    const record = await getRecord(id);
    if(record.length === 0) {
        return;
    };
    department.textContent = "Departamento: " + record.localidad.departamento.nombre;
    locality.textContent = "Localidad: "+record.localidad.nombre;
    dateOrigin.textContent = "Fecha Origen: "+ dayjs(record.fecha_origen).format('DD-MM-YYYY');
    dateStart.textContent = "Fecha Inicio: "+ dayjs(record.fecha_inicio).format('DD-MM-YYYY');
    jurisdiction.textContent = "Circunscripción: "+record.juzgado.circunscripcion.nombre;
    court.textContent = "Juzgado: "+record.juzgado.nombre;
    order.textContent = "Orden: "+record.orden;
    secretary.textContent = "Secretario: "+record.secretario;
    resume.textContent = record.resumen;
    origin.textContent ="Inciado por: "+ record.origen_expediente.nombre;
    confiscation.textContent = record.secuestros!=null ? record.secuestros : 'No hay secuestros que mostrar.';
    confiscationInput.value = record.secuestros !=null ? record.secuestros : '';
    observations.textContent = record.observaciones ? record.observaciones : 'No hay observaciones que mostrar.';
    recordPdf.innerHTML = ``;
    if(record.files.length > 0) {
            for (let i = 0; i < record.files.length; i++) {
                recordPdf.innerHTML += `<a href="/uploads/${record.files[i].url}" class="btn" target="_blank"><img src="/img/pdf.png" width=40 > <span>${record.files[i].descripcion}</span> </a>`            }
    }else{
        recordPdf.innerHTML = `<p>No hay archivos adjuntos</p>`;
    };
    
    
    
    involvedPerson.innerHTML = ``;
    record.personasEnExpediente.forEach((person)=>{
        involvedPerson.innerHTML += `
        <tr>
            <td>${person.dni}</td>
            <td>${person.apellido}</td>
            <td>${person.nombre}</td>
            <td>${person.clase}</td>
            <td>${person.domicilio}</td>
            <td>${person.expediente_persona.descripcion}</td>
        </tr>
        `;
    })
    switch(record.estado) {
        // 1 es completado, 2 es vencido y 3 es en curso
        case "1":
            let fechaElevacion = record.fecha_elevacion ? dayjs(record.fecha_elevacion).format('DD-MM-YYYY') : 'No elevado';
            recordType.innerHTML = `Expediente ${record.tipo_expediente.nombre} <button class="btn" id="elevate"> <span class="badge bg-success">Expediente Elevado en fecha ${fechaElevacion}</span>  </button>`;
            break;
        case "2":
            recordType.innerHTML = `Expediente ${record.tipo_expediente.nombre} <button class="btn" id="elevate"> <span class="badge bg-danger">Vencido</span> </button>`;
            break;
        case "3":
            recordType.innerHTML = `Expediente ${record.tipo_expediente.nombre} <button class="btn" id="elevate"> <span class="badge bg-warning">En curso</span> </button>`;
            break;
        default:
            recordType.textContent = 'Sin estado';
            break;
    };
};

const elevateRecord =async (id)=>{
    const res = await fetch(`/api/expedientes/elevartExpediente/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(res.status === 404) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "No se pudo elevar el expediente!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        return;
    };
    const data = await res.json();
    Swal.fire({
        title: "Éxito!",
        text: data.message,
        icon: "success"
      });
    const recordId = document.querySelector('#recordId').dataset.id;
    renderRecord(recordId);

};


document.addEventListener('DOMContentLoaded',async () => {
    const recordId = document.querySelector('#recordId').dataset.id;
    await renderRecord(recordId);

    const elevateBtn = document.getElementById('elevate');
    elevateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    Swal.fire({
        title: "Estas seguro?",
        text: "Estas a punto de marcar como elevado este expediente!",
        icon: "warning",
        showCancelButton: true,
        
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {
            elevateRecord(recordId);
          Swal.fire({
            title: "Deleted!",
            text: "Expediente elevado con éxito!",
            icon: "success"
          });
        }
      });
             
      });

});

