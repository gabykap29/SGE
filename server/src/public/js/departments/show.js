const SelectDepart = document.querySelector('#selectDepar');

const getDepartments = async () => {
    try {
        const res = await fetch('/api/departamentos');
        if(!res.ok){ 
            throw new Error('Error en la petición')
        }        
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    };
};

const renderDepartments = async () => {
    const departments = await getDepartments();
    departments.data.length < 1 ? SelectDepart.innerHTML = `<option value="0">No hay departamentos</option>` : (
        departments.data.forEach(department=>{
            const option = document.createElement('option');
            option.value = department.id;
            option.textContent = department.nombre;
            SelectDepart.appendChild(option);
        }));
    //renderizar en tabla de tools
    if(departments.data.length > 0 && document.querySelector('#departments')){
        const table = document.querySelector('#departments');
        departments.data.forEach((department,index)=>{
            const row = table.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${department.nombre}</td>
                <td class="text-center">
                    <button class="btn btn-danger btnDeleteDepartment btn-sm" data-id="${department.id}"><i class="bi bi-x-octagon-fill"></i></button>
                </td>
            `;
        });
    }
};

document.addEventListener('DOMContentLoaded',async ()=>{
    await renderDepartments();
    const btnDeleteDepartment = document.querySelectorAll('.btnDeleteDepartment');
    btnDeleteDepartment.forEach(btn=>{
        btn.addEventListener('click',async ()=>{
            Swal.fire({
                title: "Estas seguro?",
                text: "Esta acción no se puede deshacer!, se eliminará el departamento y todos los expedientes asociados a él.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    const id = btn.dataset.id;
                    const res = await fetch(`/api/departamentos/${id}`,{
                        method: 'DELETE'
                    });
                    const data = await res.json();
                    if(data.status === 200){
                        btn.parentElement.parentElement.remove();
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al eliminar departamento',
                            text: data.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    };
                }
              });
        });
    });
});