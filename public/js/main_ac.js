
$(document).ready(function () {

    $ab = $('.ab');
    $togglesCollapses = $('.toggles-collapses');

    /** click event on toggle menu */
    $togglesCollapses.click(function () {
        $ab.toggleClass('collapses');
    })
    
});


var btnpopup1 = document.getElementById('btnPopup1');
var btnpopup2 = document.getElementById('btnPopup2');
var btnpopup3 = document.getElementById('btnPopup3');
var btnpopup4 = document.getElementById('btnPopup4');
var btnpopup5 = document.getElementById('btnPopup5');
var btnpopup6 = document.getElementById('btnPopup6');
var btnpopup7 = document.getElementById('btnPopup7');
var btnpopup = document.getElementById('btnPopup');
var overlay = document.getElementById('overlay');
var btnclose = document.getElementById('btnClose');

btnpopup1.addEventListener('click',openModal);
btnpopup2.addEventListener('click',openModal);
btnpopup3.addEventListener('click',openModal);
btnpopup4.addEventListener('click',openModal);
btnpopup5.addEventListener('click',openModal);
btnpopup6.addEventListener('click',openModal);
btnpopup7.addEventListener('click',openModal);
btnpopup.addEventListener('click',openModal);
btnClose.addEventListener('click',closePopup);

function openModal(){
    overlay.style.display = 'block';
}

function closePopup () {
    overlay.style.display = 'none';
}