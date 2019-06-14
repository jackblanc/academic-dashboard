import firebase from 'firebase'

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyCYCXB4wt7cz1Zb9rjjHeev0o1RSoNkfAU",
  authDomain: "academic-dashboard.firebaseapp.com",
  databaseURL: "https://academic-dashboard.firebaseio.com",
  storageBucket: "academic-dashboard.appspot.com",
  messagingSenderId: "123123123123"
};
var fire = firebase.initializeApp(config);

export default fire;