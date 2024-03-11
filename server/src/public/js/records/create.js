const formCreateRecord = document.querySelector('#formCreateRecord');
const formSelect = document.querySelectorAll('.form-select');
formCreateRecord.addEventListener('submit', async (e) => {
    e.preventDefault();
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
    const origin = parseInt(document.querySelector('#originRecord').value);
    const res = await fetch('/api/expedientes/nuevo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
    console.log(data);
    if (data.status !== 200) {
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
        window.location.href = `/expedientes/buscar/${data.data.id}`;
    }, 2000);
});