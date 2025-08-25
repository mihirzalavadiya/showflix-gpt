// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD3FvbUDStqEdw5T0_NsZcPoCmfNbRH12U',
  authDomain: 'showflixgpt-9405f.firebaseapp.com',
  projectId: 'showflixgpt-9405f',
  storageBucket: 'showflixgpt-9405f.firebasestorage.app',
  messagingSenderId: '1011005873647',
  appId: '1:1011005873647:web:9fe4083bd54dc700bf2a1a',
  measurementId: 'G-KH8KYQT3DF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
