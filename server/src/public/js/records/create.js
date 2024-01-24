const formCreateRecord = document.querySelector('#formCreateRecord');

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
        }),
    });
    const data = await res.json();
    if (!res.ok) {
        alertify.error(data.message);
        return;
    };
    alertify.success(data.message);
    console.log(data);
    setTimeout(() => {
        window.location.href = '/home';
    }, 2000);
});