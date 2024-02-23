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
    const origin = parseInt(document.querySelector('#origin').value);
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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message || "Error al crear expediente. Intente de nuevo.",
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