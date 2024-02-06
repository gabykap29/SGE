const formConfiscation = document.getElementById('formConfiscation');
const formObservations = document.getElementById('formObservations');
formConfiscation.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('recordId').dataset.id;
    const secuestros = document.getElementById('confiscationInput').value;

    const res = await fetch(`/api/expedientes/secuestros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            secuestros,
        }),
    });
    if(res.status === 404) {
        alertify.error('No se encontro el expediente');
        return;
    };
    const data = await res.json();
    alertify.success(data.message);
    const recordId = document.querySelector('#recordId').dataset.id;
    renderRecord(recordId)
    $('#modalSecuestro').modal('hide');
});

formObservations.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('recordId').dataset.id;
    const observaciones = document.getElementById('observationsInput').value;

    const res = await fetch(`/api/expedientes/observaciones/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            observaciones,
        }),
    });
    if(res.status === 404) {
        alertify.error('No se encontro el expediente');
        return;
    };
    const data = await res.json();
    alertify.success(data.message);
    $('#modalObservaciones').modal('hide');
    const recordId = document.querySelector('#recordId').dataset.id;
    renderRecord(recordId);
});
