function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('open');
}

function toggleDropdown(event, element) {
    event.preventDefault();
    const dropdown = element.parentElement;
    dropdown.classList.toggle('open');
}