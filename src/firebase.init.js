// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3KheJ8RzuIADk1SlTs1tgHLHqTWohzUk",
  authDomain: "ss-shop-f9e05.firebaseapp.com",
  projectId: "ss-shop-f9e05",
  storageBucket: "ss-shop-f9e05.appspot.com",
  messagingSenderId: "312516506265",
  appId: "1:312516506265:web:ac4d9313159108f6223e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;