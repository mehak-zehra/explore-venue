
async function loginFormHandler(event) {
  console.log("mehak")
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
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);