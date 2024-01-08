const spinner = document.querySelector('#spinner');
let classList = spinner.classList;
function hideSpinner() {
  setTimeout(()=>{
    classList.remove('show');
    classList.add('hide');
    spinner.style.display = 'none';
  },1000)
};

hideSpinner();