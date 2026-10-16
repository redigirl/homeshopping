const form = document.getElementById('signup');
const statusEl = document.getElementById('statusMessage');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: document.getElementById('fullname').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
                phone: document.getElementById('phone').value.trim(),
            }),
        });
        const data = await res.json();
        statusEl.textContent = data.message;
        if (res.ok) {
            form.reset();
        }
    } catch (err) {
        statusEl.textContent = 'could not reach the server.';
    }
});