import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDUG-mouArAOuAW6edhnLJWp4iKEdDVgVA",
    authDomain: "team-02-project-fe323.firebaseapp.com",
    databaseURL: "https://team-02-project-fe323-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "team-02-project-fe323",
    storageBucket: "team-02-project-fe323.appspot.com",
    messagingSenderId: "67171507587",
    appId: "1:67171507587:web:7bb5698501e0f56c882ab6"
};

export const app = initializeApp(firebaseConfig);