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
            const id = btn.parentElement.parentElement.firstElementChild.textContent;
            const res = await fetch(`/api/departamentos/${id}`,{
                method: 'DELETE'
            });
            if(res.ok){
                btn.parentElement.parentElement.remove();
            }else{
                alertify.error('Error al eliminar el departamento');
            };
        });
    });
});