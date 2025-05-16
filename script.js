const loginForm = document.getElementById("loginForm");
const errorBanner = document.getElementById("errorBanner");
const errorText = document.getElementById("errorText");
const setPassword = prompt("Set a password");


loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "x-api-key": "reqres-free-v1",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(async response => {
            const data = await response.json();
            if (response.ok && data.token) {
                if (password === setPassword) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "./home.html"
                } else {
                    errorBanner.style.display = "flex";
                    errorText.textContent = "wrong password";
                }
            } else {
                errorBanner.style.display = "flex";
                errorText.textContent = data.error;
            }
        })
        .catch(err => {
            console.log(err);
            errorMessage.textContent = "Network error";
        })
})

errorBanner.addEventListener("click", e => {
    if (e.target.classList.contains("dismiss-banner")) {
        errorBanner.style.display = "none";
    }
})