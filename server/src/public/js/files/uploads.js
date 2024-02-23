const formFiles = document.getElementById('formFiles');
const fileDescription = document.getElementById('file-description');

const uploadFile = async(file, id)=>{
    console.log(file);
    if(file.type !== 'application/pdf'){
        alertify.error('Tipo de archivo no válido. Se permite solo PDF.');
        return;
    };
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('descripcion', fileDescription.value);


    const res = await fetch(`/api/expedientes/upload/${id}`, {
        method: 'POST',
        body: formData,
    });
    const data = await res.json();

    if(data.status === 400 || data.status === 500) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al subir el archivo!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        return;
    };
    Swal.fire({
        title: "Éxito!",
        text: data.message,
        icon: "success"
      });
};

formFiles.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('recordId').dataset.id;
    const pdf = document.getElementById('file-input').files[0];
    await uploadFile(pdf, id);
    $('#modalFiles').modal('hide');
    await renderRecord(id);
});