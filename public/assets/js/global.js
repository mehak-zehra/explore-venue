function goToSingleVenue(id) {
    window.location.href = "/venue/" + id;
}

function goToSearchPage() {
    window.location.href = "/search";
}

function goToLoginPage() {
    window.location.href = "/login";
}

function goToSignUpPage() {
    window.location.href = "/signup";
}


// handle login flow
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#emailAddress').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/search');
        } else {
            alert(response.statusText);
        }
    }
}

let loginFormEl = document.querySelector('.login-form');
if (loginFormEl) {
    loginFormEl.addEventListener('submit', loginFormHandler);
}

// handle signup flow
async function signupFormHandler(event) {
    event.preventDefault();

    const firstname = document.querySelector('#first-name').value.trim();
    const lastname = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstname && lastname && email && password) {
        const response = await fetch('/api/user/signup', {
            method: 'post',
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            document.location.replace('/search');
        } else {
            alert(response.statusText);
        }
    }
}

let signupFormEl = document.querySelector('.signup-form')
if (signupFormEl) {
    signupFormEl.addEventListener('submit', signupFormHandler);
}


// handle logout flow
async function logout() {
    const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

let logoutEl = document.querySelector('#logout');
if (logoutEl) {
    logoutEl.addEventListener('click', logout);
}


// confetti test

// var myCanvas = document.createElement('canvas');
// document.appendChild(myCanvas);

myCanvas= document.getElementById("canvas");

var myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
});
// myConfetti({
//   particleCount: 1000,
//   spread: 1600
//   // any other options from the global
//   // confetti function
// });

myConfetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });