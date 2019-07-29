import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
  apiKey: "AIzaSyCYCXB4wt7cz1Zb9rjjHeev0o1RSoNkfAU",
  authDomain: "academic-dashboard.firebaseapp.com",
  databaseURL: "https://academic-dashboard.firebaseio.com",
  storageBucket: "academic-dashboard.appspot.com",
  messagingSenderId: "123123123123"
};
var fire = firebase.initializeApp(config);

fire.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default fire;
