const id = document.getElementById('card-person').dataset.id;
const nameComplete = document.getElementById('nameComplete');
const dni = document.getElementById('dni');
const addres = document.getElementById('addres');
const clase = document.getElementById('class');
const locality = document.getElementById('locality');
const description = document.getElementById('description');
const recordTable = document.getElementById('records');

const getPerson = async()=>{
    const res = await fetch (`/api/personas/show/${id}`);
    if(!res.ok){
        return [];
    };
    const {data} = await res.json();
    return data;
};

const renderPerson = async()=>{
   try {
    const person = await getPerson();
    if(person.length === 0){
        alertify.error('Error al obtener la persona.-');
        return;
    };
    nameComplete.innerHTML = `<strong>Nombre y Apellido: ${person.nombre} ${person.apellido}</strong>`;
    dni.innerHTML = `<strong>DNI: ${person.dni} </strong>`;
    addres.innerHTML = `<strong>Domicilio: ${person.domicilio}</strong>`;
    clase.innerHTML = `<strong>Clase: ${person.clase}</strong>`;
    locality.innerHTML = `<strong>Localidad: ${person.localidad}</strong>`;
    description.innerHTML = `<strong>${person.observaciones != null && person.observaciones!='' ? person.observaciones : 'No hay observaciones para mostrar.' }</strong>`;

    if(person.expedientesDePersona.length > 0){
        person.expedientesDePersona.forEach((record,index)=>{
            let estado;
        if(person.estado == 1){
            estado = 'Elevado';
        }else if(person.estado == 2){
            estado = 'Vencido';
        }else{
            estado = 'En curso';
        };
            recordTable.innerHTML=`
            <tr>
            <td>${index+1}</td>
            <td>${record.orden}</td>
            <td>${record.localidad.departamento.nombre}</td>
            <td>${record.localidad.nombre}</td>
            <td>${record.tipo_expediente.nombre}</td>
            <td>${record.juzgado.circunscripcion.nombre}</td>
            <td>${record.juzgado.nombre}</td>
            <td>${dayjs(record.fecha_origen).format('DD/MM/YYYY')}</td>
            <td>${dayjs(record.fecha_inicio).format('DD/MM/YYYY')}</td>
            <td>${estado}</td>        
            <td>${record.secretario}</td>
            <td>
                <a href="/expedientes/buscar/${record.id}" class="btn btn-outline btn-sm btn-show "><i class="bi bi-eye-fill"></i></a>
            </td>
            </tr>
            `;
        })
    }else{
        recordTable.innerHTML = `
        <tr>
            <td colspan='11' class='alert alert-warning text-center'>
                No hay expedientes vinculados a la persona!
            </td>
        </tr>
        `;
    };
   } catch (error) {
    console.log(error);
    alertify.error('Error al renderizar la persona!');
   };
};

document.addEventListener('DOMContentLoaded', async(e)=>{
    await renderPerson();
});