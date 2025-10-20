// Simple test script to verify the API works
const fetch = require('node-fetch');

async function testLogin() {
    try {
        console.log('Testing login API...');
        
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'student',
                password: 'password'
            })
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        if (response.ok && data.user && data.user.role === 'student') {
            console.log('✅ Student login test passed!');
        } else {
            console.log('❌ Student login test failed');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Only run if this file is executed directly
if (require.main === module) {
    testLogin();
}

module.exports = { testLogin };
