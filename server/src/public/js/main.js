const btnLogout = document.getElementById('btn-logout');
(function ($) {
    "use strict";

    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });
})(jQuery);



btnLogout.addEventListener('click',()=>{
    let timerInterval;
Swal.fire({
  title: "Cerrando sesion...",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
    const res = fetch('/logout',{
        method:'GET'
    });
    res.then((res)=>{
        if(res.status === 200){
            window.location.href = '/';
        }
    });
  }
})
});

//funcion para obtener el nombre del usuario y mostrarlo en el sidebar

localStorage.getItem('fullname') ? document.getElementById('fullname').innerText = JSON.parse(localStorage.getItem('fullname')) : null;
localStorage.getItem('rol') ? document.getElementById('rol').innerText = JSON.parse(localStorage.getItem('rol')) : null;


//visualizar elementos del dom segun el permiso.. si lo modifican no pasa nada, porque el sistema valida los permisos desde el servidor, no desde el cliente!

document.addEventListener('DOMContentLoaded', async () => {
    const userManager = document.getElementById('userManager');
    const createRecord = document.getElementById('createRecord');
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const editRecord = document.querySelectorAll('.btnEdit');
    const logs = document.getElementById('logs');
    const settings = document.getElementById('tools');
    let permissionsUser = permissions.includes('Ver Usuario', 'Editar Usuario', 'Eliminar Usuario', 'Crear Usuario ');
    let permissionsRecordsCreate = permissions.includes('Crear Expediente')
    let permissionsRecordsEdit = permissions.includes('Editar Expediente');
    let permissionsLogs = permissions.includes('Ver Logs');
    let permissionsSettings = permissions.includes('Ver Ajustes');
    if(!permissionsUser){
        userManager.remove();
    };

    if(permissionsRecordsCreate === false){
        createRecord.remove();
    };


    if(!permissionsRecordsEdit){
        editRecord.forEach((record)=>{
            record.style.display = 'none';
        });
    };

    if(!permissionsLogs){
        logs.remove();
    };

    if(!permissionsSettings){
        settings.remove();
    }
    });

    const imgPerfil = document.getElementById('imgPerfil');
    const imgProfileNavbar = document.getElementById('imgProfileNavbar');
    const fullname = JSON.parse(localStorage.getItem('fullname'));    
    imgPerfil.src = `https://ui-avatars.com/api/?name=${fullname}&background=random`
    imgProfileNavbar.src = `https://ui-avatars.com/api/?name=${fullname}&background=random`

