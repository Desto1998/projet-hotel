let selection = document.querySelector('select');
let result = document.querySelector('label');

selection.addEventListener('change', ()=> {
    result.innerText = selection.options[selection.selectedIndex].text;
});