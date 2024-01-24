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
};

document.addEventListener('DOMContentLoaded',async ()=>{
    await renderDepartments();
});