
$(document).ready(function () {

    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

    /** click event on toggle menu */
    $toggleCollapse.click(function () {
        $nav.toggleClass('collapse');
    })

});




const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});




var btnpopup = document.getElementById('btnPopup');
var overlay = document.getElementById('overlay');
var btnclose = document.getElementById('btnClose');

btnpopup.addEventListener('click',openModal);
btnClose.addEventListener('click',closePopup);

function openModal(){
    overlay.style.display = 'block';
}

function closePopup () {
    overlay.style.display = 'none';
}