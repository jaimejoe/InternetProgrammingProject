function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
}

function getCookie(name) {
    const cookieArray = document.cookie.split('; ');
    for (const cookie of cookieArray) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}


function ReserveDate() {
    const username = getCookie("loggedInUser");
    const dateInput = $("#DatetimeLocal").val();

    if (!dateInput) {
        alert("Please select a date before submitting!");
        return;
    }

    if (!username) {
        alert("You must log in to reserve a date.");
        return;
    }

    const reservation = { username, date: dateInput };
    localStorage.setItem('reservation', JSON.stringify(reservation));

    $('.reservation-status').html(`<p>Reservation confirmed for <h2>${username}</h2> on <h2>${dateInput}</h2>.</p>`);
}

//bit of jquery
function ClearAll() {
    $("#firstname").val(''); 
    $("#email").val('');
}

function SignUp() {
    const username = $("#firstname").val();
    const email = $("#email").val();
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, email });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    window.location.href = "index.html";
}

function Login() {
    const username = $("#firstname").val();
    const email = $("#email").val();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => user.username === username && user.email === email);

    if (user) {
        setCookie("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or email!");
    }
}

function Logout() {
    document.cookie = "loggedInUser=; path=/";
    alert("You have been logged out!");
    window.location.reload();
}

function UpdateLoginStatus() {
    const username = getCookie("loggedInUser");
    const loginButtonContainer = document.querySelector(".account-buttons");

    if (username) {
        loginButtonContainer.innerHTML = `
            <span>${username}</span>
            <button onclick="Logout()">Logout</button>
        `;
    } else {
        loginButtonContainer.innerHTML = `
            <a href="login.html">Login</a>
            <a href="signup.html">Sign Up</a>
        `;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateLoginStatus);
} else {
    UpdateLoginStatus();
}
