import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({})
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();
  var trProvider = new firebase.auth.TwitterAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user)
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  }
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb User', user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log('gh User', user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('error', errorCode, errorMessage, email, credential);
      });
  }

  const handleTwitterSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(trProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var secret = credential.secret;
        var user = result.user;
        setUser(user);
        console.log('tr User', user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In using Google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign In using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign In using Github</button>
      <br />
      <button onClick={handleTwitterSignIn}>Sign In using Twitter</button>
      <h3>User: {user.displayName}</h3>
      <p>User image Url: {user.photoURL}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
