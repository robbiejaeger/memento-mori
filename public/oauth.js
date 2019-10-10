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

document.getElementById('login').addEventListener('click', function() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut().then(function() {
      console.log('Signed out successfully.');
    }).catch(function(err) {
      console.error('Sign out failed:', err)
    });
  } else {
    authUI.start('#firebaseui-auth-container', authUIConfig);
  }
});

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Signed In
      const displayName = user.displayName;
      const email = user.email;
      const uid = user.uid;
      const providerData = user.providerData;

      document.getElementById('user-welcome').textContent = `Hello, ${displayName}`;
      document.getElementById('login').textContent = 'Sign Out';
    } else {
      // Signed Out
      document.getElementById('user-welcome').textContent = 'Sign in to use the app';
      document.getElementById('login').textContent = 'Sign In';
    }
  }, function(err) {
    console.error('Something happned on auth state change:', err);
  });
};

window.addEventListener('load', function() {
  initApp();
});
