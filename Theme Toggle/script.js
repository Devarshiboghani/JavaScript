const toggle = document.getElementById("toggle");
const lblLight = document.getElementById("lbl-light"); 
const lblDark = document.getElementById("lbl-dark");

const heading = document.getElementById("heading");
const icon = document.getElementById("icon");
const subtitle = document.getElementById("subtitle");

// Load theme
const theme = localStorage.getItem("theme");

if (theme === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;

    heading.innerText = "Good Night!";
    icon.innerText = "🌙";
    subtitle.innerText = "Dark Theme is active - easy on the eyes."

    lblLight.classList.remove("active");
    lblDark.classList.add("active");

} else {

    heading.innerText = "Good Morning!";
    icon.innerText = "☀️";
    subtitle.innerText = "Light Theme is active - bright and clear."

    lblDark.classList.remove("active");
    lblLight.classList.add("active");
}

// Toggle
toggle.onchange = () => {

    if (toggle.checked) {

        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");

        heading.innerText = "Good Night!"
        icon.innerText = "🌙";
        subtitle.innerText = "Dark Theme is active - easy on the eyes."

        lblLight.classList.remove("active");
        lblDark.classList.add("active");

    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");

        heading.innerText = "Good Morning!"
        icon.innerText = "☀️";
        subtitle.innerText = "Light Theme is active - bright and clear."

        lblDark.classList.remove("active");
        lblLight.classList.add("active");
    }
}