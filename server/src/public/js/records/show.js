const records = document.getElementById('records');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrevious');
const formFilters = document.getElementById('formFilters');
let page = 0;
const size = 10;
const getRecords = async (url,page=0, size=10) => {
    try {
        const urlFilter = `${url}page=${page}&size=${size}`;
        const res = await fetch(urlFilter);
        const {data} = await res.json();
        if(data.length < 1){
            return [];
        };
        return data;
    } catch (error) {
        console.log(error);
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });;
    };
};

const renderRecords = async (url,page,size) => {
    records.innerHTML = "";
    const expedientes = await getRecords(url,page,size);
    console.log(expedientes);
    if(expedientes.length < 1){
        records.innerHTML = `
        <td class="alert alert-primary text-center" role="alert" colspan="11">
        <i class="bi bi-info-circle-fill"></i>    
        No hay expedientes cargados en el sistema
        </td>
        `;
        return;
    };
    const html = expedientes.map((expediente,index) => {
        let estado;
        if(expediente.estado == 1){
            estado = 'Elevado';
        }else if(expediente.estado == 2){
            estado = 'Vencido';
        }else{
            estado = 'En curso';
        };
        return `
        <tr>
            <td>${expediente.orden}</td>
            <td>${expediente.localidad.departamento.nombre}</td>
            <td>${expediente.localidad.nombre}</td>
            <td>${expediente.tipo_expediente.nombre}</td>
            <td>${expediente.juzgado.circunscripcion.nombre}</td>
            <td>${expediente.juzgado.nombre}</td>
            <td>${dayjs(expediente.fecha_origen).format('DD/MM/YYYY')}</td>
            <td>${dayjs(expediente.fecha_inicio).format('DD/MM/YYYY')}</td>
            <td>${estado}</td>        
            <td>${expediente.secretario}</td>
            <td>
                <a href="/expedientes/buscar/${expediente.id}" class="btn btn-outline btn-sm btn-show "><i class="bi bi-eye-fill"></i></a>
                <a href="/expedientes/editar/${expediente.id}" class="btn btn-outline-success btn-sm mt-1 btnEdit"><i class="bi bi-pencil-fill"></i></a>
            </td>
        </tr>
        `;
    }).join("");
    records.innerHTML = html;
};

document.addEventListener('DOMContentLoaded',async()=>{
    let url = '/api/expedientes?';
    await renderRecords(url);

    btnNext.addEventListener('click',async()=>{
        page++;
        await renderRecords(url,page);
    });
    
    btnPrev.addEventListener('click',async()=>{
        if(page > 0){
            page--;
        await renderRecords(url,page);
        }});

    formFilters.addEventListener('submit',async(e)=>{
        e.preventDefault();
        try {
            const orden = document.getElementById('order').value;
            const departamento = document.getElementById('selectDepar').value;
            const localidad = document.getElementById('selecLocalidad').value;
            const circunscripcion =document.getElementById('selectDistrict').value;
            const juzgado = document.getElementById('selectCourt').value;
            const fechaInicio = document.getElementById('dateStart').value;
            const fechaFin = document.getElementById('dateEnd').value;
            const estado = document.getElementById('state').value;
            const origenExpediente = document.getElementById('originRecord').value;
            const palabrasClave = document.getElementById('keywords').value;
            if(departamento && localidad === ""|| localidad === null){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe seleccionar una localidad",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
                return;
            };

            url = `/api/expedientes?orden=${orden}&departamento=${departamento}&localidad=${localidad}&circunscripcion=${circunscripcion}&juzgado=${juzgado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&estado=${estado}&origenExpediente=${origenExpediente}&palabrasClave=${palabrasClave}&`;

            await renderRecords(url);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });;
        };
    });
    
});