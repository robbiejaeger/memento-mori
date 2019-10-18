const firebaseConfig = {
  apiKey: 'AIzaSyBvPeQMobRjWj20SrFuoJUSrMfMyLfdPL4',
  authDomain: "memento-mori-8609a.firebaseapp.com",
  projectId: 'memento-mori-8609a'
};

firebase.initializeApp(firebaseConfig);

const authUIConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
};

const authUI = new firebaseui.auth.AuthUI(firebase.auth());

loginBtn.addEventListener('click', function() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut().then(function() {
      console.log('Signed out successfully.');
    }).catch(function(err) {
      console.error('Sign out failed:', err);
    });
  } else {
    loginBtn.style.display = 'none';
    authContainer.style.display = 'block';
    authUI.start('#firebaseui-auth-container', authUIConfig);
  }
});

function getUidForLoggedInUser() {
  return firebase.auth().currentUser.uid;
}

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Signed In
      const displayName = user.displayName;
      authContainer.style.display = 'none';
      notifyBtn.style.display = 'block';
      userWelcomeMsg.textContent = `Hi, ${displayName}.`;
      loginBtn.style.display = 'block';
      loginBtn.textContent = 'Sign Out';
    } else {
      // Signed Out
      authContainer.style.display = 'none';
      notifyBtn.style.display = 'none';
      loginBtn.textContent = 'Sign In to Be Notified';
      userWelcomeMsg.textContent = '';
      userInfoMsg.textContent = '';
    }
  }, function(err) {
    console.error('Something happened on auth state change:', err);
  });
};

window.addEventListener('load', function() {
  initApp();
});
