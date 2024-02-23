const elevados = document.getElementById('elevados');
const enCurso = document.getElementById('enCurso');
const vencidos = document.getElementById('vencidos');
const total = document.getElementById('total');

const getCountEstado = async () => {
    try {
        const res = await fetch('/api/countEstado');
        const data = await res.json();
        if(data.status === 404){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            return [];
        };
        return data;
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    };
};

const renderCountEstado = async () => {
    try {
        const data = await getCountEstado();
        let cantTotal = data.count ? data.count : 0;
        let cantElevados =  0;
        let cantEnCurso =  0;
        let cantVencidos =  0;

        if (data.data && data.data.length > 0) {
            for (const item of data.data) {
              if (item.estado == 1) {
                cantElevados = item.expedientes_por_estado;
              } else if (item.estado == 3) {
                cantEnCurso = item.expedientes_por_estado;
              } else if (item.estado ==2) {
                cantVencidos = item.expedientes_por_estado;
              }
            }
        }
        total.textContent = cantTotal;
        elevados.textContent = cantElevados;
        enCurso.textContent = cantEnCurso;
        vencidos.textContent = cantVencidos;
        
    } catch (error) {
        console.log(error);
        alertify.error('Error al mostrar los expedientes');
    };
};



document.addEventListener('DOMContentLoaded',async()=>{
    await renderCountEstado();
});