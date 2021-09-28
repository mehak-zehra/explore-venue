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
            document.location.replace('/login');
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);