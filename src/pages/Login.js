import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function Login({ signOut, user }) {
  return (
    <div className="text-center">
      <h1>Welcome to Serverless App</h1>
      <h3>Hello, {user.username} 👋</h3>
      <button className="btn btn-danger mt-3" onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(Login);
