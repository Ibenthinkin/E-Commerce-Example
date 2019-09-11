import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyARj-uV3A21SiHF887UcgcKN-24bSHdWEg",
    authDomain: "e-commerce-example.firebaseapp.com",
    databaseURL: "https://e-commerce-example.firebaseio.com",
    projectId: "e-commerce-example",
    storageBucket: "",
    messagingSenderId: "60813922557",
    appId: "1:60813922557:web:ce94e592ac242c9cc86e94"
};

export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return;

    const userRef = firestsore.doc(`/users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
         const {displayName, email } = userAuth;
         const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestsore =firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;