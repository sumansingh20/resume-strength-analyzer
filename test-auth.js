const http = require('http');

// Test authentication flow
async function testAuth() {
  const baseUrl = 'http://localhost:3000';
  
  // Test 1: Register a new user
  console.log('🧪 Testing registration...');
  const registerData = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    name: 'Test User'
  };
  
  try {
    // Use http.request instead of fetch
    const registerResult = await makeRequest(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)
    });
    
    console.log('📝 Register response:', registerResult);
    
    if (registerResult.token) {
      console.log('✅ Registration successful, token received');
      
      // Test 2: Use token to access protected endpoint
      console.log('🧪 Testing protected endpoint...');
      const meResult = await makeRequest(`${baseUrl}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${registerResult.token}`
        }
      });
      
      console.log('👤 Me response:', meResult);
      
      if (meResult && !meResult.error) {
        console.log('✅ Protected endpoint working with token');
      } else {
        console.log('❌ Protected endpoint failed');
      }
    } else {
      console.log('❌ Registration failed - no token received');
    }
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
  }
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          resolve({ error: 'Invalid JSON', status: res.statusCode, data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

testAuth();
