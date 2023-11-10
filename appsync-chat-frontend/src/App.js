import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth, Hub } from 'aws-amplify';
import { Route, Link, BrowserRouter,Routes } from 'react-router-dom';

import Chat from './Chat';
import Rooms from './Rooms';
import Profile from './Profile';
import theme from './theme';

const { primaryColor } = theme;

function Router() {
  return (
    <div>
      <BrowserRouter>
        <div style={topLevelContainerStyle}>
          <div style={headerStyle}>
            <a href="/" style={homeLinkStyle}>
              <p style={titleStyle}>CDK AppSync Chat</p>
            </a>
          </div>
          <nav style={navStyle}>
            <Link to="/" style={linkStyle}>
              View all rooms
            </Link>
            <Link to="/profile" style={linkStyle}>
              Profile
            </Link>
          </nav>
        </div>
        <div style={mainViewContainerStyle}>
          <Routes>
            <Route exact path="/" element={<Rooms />}>
            </Route>
            <Route path="/chat/:name/:id" element={<Chat />}>
            </Route>
            <Route exact path="/profile" element={<Profile />}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

function App() {
  const [user, updateUser] = React.useState(null);
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => updateUser(user))
      .catch(() => console.log('No signed in user.'));
    Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signIn':
          return updateUser(data.payload.data);
        case 'signOut':
          return updateUser(null);
        default:

      }
    });
  }, []);
  if (user) {
    return <Router />
  }
  return (
    <Authenticator loginMechanisms={['email']}>
      {({ signOut, user }) => (
        <div className="App">
          <p>
            Hey {user.username}, welcome to my channel, with auth!
          </p>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  )
}

const topLevelContainerStyle = {
  height: 170,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%'
}

const mainViewContainerStyle = {
  padding: '180px 30px 80px',
}

const headerStyle = {
  backgroundColor: primaryColor,
  padding: 30,
  color: 'white'
}

const titleStyle = {
  fontSize: 34,
  margin: 0,
  fontWeight: 600
}

const navStyle = {
  padding: '20px 30px',
  backgroundColor: '#ddd'
}

const homeLinkStyle = {
  textDecoration: 'none',
  color: 'white',
}

const linkStyle = {
  margin: 0,
  color: primaryColor,
  textDecoration: 'none',
  fontSize: 20,
  marginRight: 20
}

export default App