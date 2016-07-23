var sideToggle = document.querySelector(".sidebar-toggle-wrapper");
var bodyContent = document.querySelector('.all-content-wrapper');
bodyContent.addEventListener('click', toggleNavIfOpen, false);
sideToggle.onclick = toggleSide;

function toggleNavIfOpen() {
    if (document.querySelector('.sidebar-toggle-wrapper.open')) {
        toggleSide();
    }
}

function toggleSide() {
    document.querySelector(".sidebar-toggle-wrapper").classList.toggle("open");
    document.querySelector(".sidebar").classList.toggle("open");
    document.querySelector(".all-content-wrapper").classList.toggle("open");
    document.querySelector('.site-footer').classList.toggle("open")
}
