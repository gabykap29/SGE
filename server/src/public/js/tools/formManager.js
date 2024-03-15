const formDepartment = document.getElementById('formDepartment');
const inputDepartment = document.getElementById('inputDepartment');
//crear departamento
formDepartment.addEventListener('submit',async (e) => {
    e.preventDefault();
    const department = inputDepartment.value;
    if(department === ''){
        Swal.fire({
            icon: 'error',
            title: 'El campo no puede estar vacío',
            text: 'Por favor, ingrese un nombre para el departamento',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    };
    const res = await fetch('/api/departamentos',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre:department})
    });
    const data = await res.json();
    if(data.status === 201){
        Swal.fire({
            icon: 'success',
            title: 'Departamento creado',
            text: data.message,
            showConfirmButton: true,
            timer: 1500
        });
    await renderDepartments();
    setTimeout(()=>{
        window.location.href = '/tools';
    },1500)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al crear departamento',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
        });
    };
    })

// crear localidad

const formLocality = document.getElementById('formLocality');

formLocality.addEventListener('submit',async (e) => {
    e.preventDefault();
    const locality = document.getElementById('inputLocality').value;
    const department = document.getElementById('selectDepar').value;
    if(locality === ''){
        Swal.fire({
            icon: 'error',
            title: 'El campo no puede estar vacío',
            text: 'Por favor, ingrese un nombre para la localidad',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    };
    const res = await fetch('/api/localidades',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre:locality, departamento_id:department})
    });
    const data = await res.json();
    if(data.status === 201){
        Swal.fire({
            icon: 'success',
            title: 'Localidad creada',
            text: data.message,
            showConfirmButton: true,
            timer: 1500
        });
        await renderLocalitiesTable(department);
        setTimeout(()=>{
            window.location.href = '/tools';
        },1500)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al crear localidad',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
        });
    }
});

//crear circunscripcion
const formDistrict = document.getElementById('formDistricts');
formDistrict.addEventListener('submit',async (e) => {
    e.preventDefault();
    const district = document.getElementById('inputDistricts').value;
    if(district === ''){
        Swal.fire({
            icon: 'error',
            title: 'El campo no puede estar vacío',
            text: 'Por favor, ingrese un nombre para la circunscripción',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    };
    const res = await fetch('/api/circunscripciones',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre:district})
    });
    const data = await res.json();
    if(data.status === 201){
        Swal.fire({
            icon: 'success',
            title: 'Circunscripción creada',
            text: data.message,
            showConfirmButton: true,
            timer: 1500
        });
        await renderDistricts();
        setTimeout(()=>{
            window.location.href = '/tools';
        },1500)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al crear circunscripción',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
        });
    }
});

//crear juzgado
const formCourt = document.getElementById('formCourt');
formCourt.addEventListener('submit',async (e) => {
    e.preventDefault();
    const court = document.getElementById('inputCourts').value;
    const district = document.getElementById('selectDistrict').value;
    if(court === ''){
        Swal.fire({
            icon: 'error',
            title: 'El campo no puede estar vacío',
            text: 'Por favor, ingrese un nombre para el juzgado',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    };
    const res = await fetch('/api/juzgados',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre:court, circunscripcion_id:district})
    });
    const data = await res.json();
    if(data.status === 201){
        Swal.fire({
            icon: 'success',
            title: 'Juzgado creado',
            text: data.message,
            showConfirmButton: true,
            timer: 1500
        });
        await renderCourtsTable(district);
        setTimeout(()=>{
            window.location.href = '/tools';
        },1500)
    }else if(data.status === 400){
        Swal.fire({
            icon: 'error',
            title: 'Error al crear juzgado',
            text: data.message,
            showConfirmButton: true,
            timer: 1500
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error interno del servidor',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
        });
    }
});