document.querySelector('.sidebar-toggle-wrapper').addEventListener('click',navToggle,false);
document.querySelector('.all-content-wrapper').addEventListener('click',navToggleCheck,false);

function navToggle() {
	$('.sidebar-toggle-wrapper,.site-navigation,.all-content-wrapper,#toggle-search').toggleClass('open');
}

function navToggleCheck() {
	var navIsOpen = document.querySelector('.all-content-wrapper.open') ? true : false;
	if(navIsOpen){
		$('.sidebar-toggle-wrapper,.site-navigation,.all-content-wrapper,#toggle-search').removeClass('open');
	}
}