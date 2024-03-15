const users = document.querySelector('#users');

const getUsers = async()=>{
    try {
        const res = await fetch('/api/usuarios/listar');
        const data = await res.json();
        if(data.status === 400 || data.status === 404){
            alertify.error(data.message);
            return;
        };
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderUsers = async()=>{
    const usuarios = await getUsers();
    if(!usuarios){
        return;
    };
    users.innerHTML = '';
    usuarios.forEach(usuario => {
        let rol = '';
        switch (usuario.rol_id) {
            case 1:
                rol = 'Administrador';
                break;
            case 3:
                rol = 'Supervisor';
                break;
                case 2:
                rol = 'Usuario';
                break;
            default:
                rol = 'Visualizador';
                break;
        };
        users.innerHTML += `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre} ${usuario.apellido} </td>
            <td>${usuario.username}</td>
            <td>${rol}</td>
            <td>${dayjs(usuario.fechaCreacion).add(+3,'hour').format('DD-MM-YYYY HH:mm')}</td>

            <td>${usuario.estado === true ? (`<a href="#"role="button" id="btn-unlock" data-set="${usuario.id}><span class="text-primary"> Activo </span></a>`):(
                `<a href="#"role="button" id="btn-unlock" data-set="${usuario.id}"><span class="text-danger"> Bloqueado </span><a/>`
            )}</td>
            <td>
                <a href="/usuarios/editar/${usuario.id}" class="btn btn-outline btn-sm btn-outline-success " ><i class="bi bi-pencil-square"></i></a>
                <a href="#" class="btn btn-outline-danger btn-sm btn-eliminar" data-set="${usuario.id}"><i class="bi bi-x-circle-fill"></i></a>
            </td>
        </tr>
        `;
    });
};

document.addEventListener('DOMContentLoaded',async(e)=>{
    e.preventDefault();
    await renderUsers();
    const btnEliminar = document.querySelectorAll('.btn-eliminar');
    const btnUnlock = document.querySelectorAll('#btn-unlock');
    btnEliminar.forEach(btn=>{
        btn.addEventListener('click',async(e)=>{
            e.preventDefault();
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const id = parseInt(btn.dataset.set);
                  try {
                    const res = await fetch(`/api/usuarios/bloquear/${id}`, {
                      method: 'PUT'
                    });
                    const data = await res.json();
                    if(res.ok){
                        Swal.fire({
                            title: "Éxito!",
                            text: data.message,
                            icon: "success"
                        });
                        setTimeout(() => {
                            window.location.href = '/usuarios';
                        }, 1500);
                        return;
                    };
                    Swal.fire({
                      title: "Error!",
                      text: data.message,
                      icon: "error"
                    });
                    
                  } catch (error) {
                    console.error("Error deleting file:", error);
                    Swal.fire({
                      title: "Error",
                      text: "Error: 400 al eliminar el usuario!",
                      icon: "error"
                    });
                  }
                }
              });
        });
    });
    btnUnlock.forEach(btn=>{
        btn.addEventListener('click',async(e)=>{
            e.preventDefault();
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, unlock it!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const id = parseInt(btn.dataset.set);
                  try {
                    const res = await fetch(`/api/usuarios/desbloquear/${id}`, {
                      method: 'PUT'
                    });
                    const data = await res.json();
                    if(res.ok){
                        Swal.fire({
                            title: "Éxito!",
                            text: data.message,
                            icon: "success"
                            
                        });
                        await renderUsers();
                        setTimeout(() => {
                            window.location.href = '/usuarios';
                        }, 1500);
                        return;
                    };
                    Swal.fire({
                      title: "Error!",
                      text: data.message,
                      icon: "error"
                    });
                    return;
                  } catch (error) {
                    console.error("Error deleting file:", error);
                    Swal.fire({
                      title: "Error",
                      text: "Error: 400 al eliminar el usuario!",
                      icon: "error"
                    });
                  }
                }
              });
        });
    });


    });