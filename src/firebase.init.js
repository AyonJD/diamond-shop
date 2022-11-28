// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3-nABlTnwLfxGx8YGldJFqfv9QrMwKLY",
  authDomain: "ss-shop-d3230.firebaseapp.com",
  projectId: "ss-shop-d3230",
  storageBucket: "ss-shop-d3230.appspot.com",
  messagingSenderId: "269682394878",
  appId: "1:269682394878:web:5bde03bff52375897607af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;