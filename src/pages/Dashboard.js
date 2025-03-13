import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function Dashboard({ signOut, user }) {
  return (
    <div className="text-center">
      <h2>Dashboard</h2>
      <p>Welcome back, {user.username}!</p>
      <button className="btn btn-danger" onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(Dashboard);
