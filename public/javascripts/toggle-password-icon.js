const iconWrapp = document.getElementById("icon-toggle");

if (iconWrapp !== null) {
    const input = document.getElementById("input-password");
    const icon = iconWrapp.querySelector(".fas");
    iconWrapp.onclick = (e) => {
        icon.classList.toggle("fa-eye-slash");
        icon.classList.toggle("fa-eye");
    
        if (icon.classList.contains("fa-eye-slash")) {
            input.type = "text";
        } else {
            input.type = "password";
        }
    }
}