
 
    const login= async(){
        try {
        const response = await fetch(API+'/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Store JWT
                window.location.href = '/dashboard'; // Redirect to dashboard
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
        }
    }

module.exports = {
    login
};