const formEditRecord = document.getElementById('formEditRecord');

const getRecord = async (id) => {
    const res = await fetch(`/api/expedientes/${id}`);
    const {data} = await res.json();
    if(res.status === 404) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró el expediente!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        return;
    };
    return data;
};

const renderRecord = async (id) => {
    const recordId = id;
    const recordEdit = await getRecord(recordId);
    const dateInit = dayjs(recordEdit.fecha_inicio).format('YYYY-MM-DD');
    const dateOrigin = dayjs(recordEdit.fecha_origen).format('YYYY-MM-DD');

    document.getElementById('selectType').value = recordEdit.tipo_expediente.nombre;
    document.getElementById('dateStart').value = dateInit;
    document.getElementById('dateOrigin').value = dateOrigin;
    document.getElementById('origin').value = recordEdit.origenExpediente;
    document.getElementById('secretary').value = recordEdit.secretario;
    document.getElementById('selectCourt').value = recordEdit.juzgado;
    document.getElementById('resume').value = recordEdit.resumen;
};

formEditRecord.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('recordID').dataset.id;
    const department = document.querySelector('#selectDepar').value;
    const locality = document.querySelector('#selecLocalidad').value;
    const type = document.querySelector('#selectType').value;
    const district = document.querySelector('#selectDistrict').value;
    const court = document.querySelector('#selectCourt').value;
    const dateStart = document.querySelector('#dateStart').value;
    const dateOrigin = document.querySelector('#dateOrigin').value;
    const order = document.querySelector('#order').value;
    const resume = document.querySelector('#resume').value;
    const secretary = document.querySelector('#secretary').value;
    const origin = parseInt(document.querySelector('#origin').value);

    const res = await fetch(`/api/editar/expediente/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            departamento_id: department,
            localidad_id: locality,
            circunscripcion_id: district,
            tipo_expediente_id: type,
            orden: order,
            localidad_id: locality,
            juzgado_id: court,
            fecha_inicio: dateStart,
            fecha_origen: dateOrigin,
            resumen: resume,
            secretario: secretary,
            origenExpediente: origin,
        }),
    });
    const data = await res.json();
    if(res.status === 404) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró el expediente!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        return;
    };

    if ( data.status !== 201) {
        const errorFieldsMap = {
            departamento_id: '#selectDepar',
            localidad_id: '#selecLocalidad',
            tipo_expediente_id: '#selectType',
            circunscripcion_id: '#selectDistrict',
            juzgado_id: '#selectCourt',
            fecha_inicio: '#dateStart',
            fecha_origen: '#dateOrigin',
            orden: '#order',
            resumen: '#resume',
            secretario: '#secretary',
            origenExpediente: '#origin'
        };
        let errors= '';
        data.errors.forEach(error =>{
            errors += `<li class="" style="text-align: left;"> ${error.msg} </li>`;
        });
        data.errors.forEach(error => {
            const fieldId = errorFieldsMap[error.path];
            if (fieldId) {
                const inputField = document.querySelector(fieldId);
                if (inputField) {
                    inputField.classList.add('is-invalid');
                }
            }
        });
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `
            <div class="alert alert-danger">
                <h4 class="alert-heading" >Se encontraron errores:</h4>
                <ul class=" mb-0">
                    ${errors}
                </ul>
            </div>
        `,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        return;
    };
    Swal.fire({
        title: "Éxito!",
        text: data.message,
        icon: "success"
      });
    setTimeout(() => {
        window.location.href = '/home';
    }, 2000);
    return;


});

document.addEventListener('DOMContentLoaded', async () => {
    if(document.getElementById('recordID')){
        const recordId = document.querySelector('#recordID').dataset.id;
        await renderRecord(recordId);
    };
});