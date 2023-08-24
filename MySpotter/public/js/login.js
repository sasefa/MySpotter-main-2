const loginHandler = async (username, password) => {
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('Logged in successfully.');
      // You can perform any desired server-side actions here
    } else {
      console.error('Failed to log in.');
    }
  }
};

const signupHandler = async (username, email, password) => {
  if (username && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('Signed up successfully.');
      // You can perform any desired server-side actions here
    } else {
      console.error('Failed to sign up.');
    }
  }
};

// Example usage
const username = 'exampleUsername';
const password = 'examplePassword';
const email = 'exampleEmail@example.com';

// Call the loginHandler or signupHandler functions with the necessary parameters
loginHandler(username, password);
signupHandler(username, email, password);
