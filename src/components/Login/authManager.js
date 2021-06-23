import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../configs/firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

const setUserName = name => {
    const user = auth.currentUser;

    user.updateProfile({
    displayName: name
    }).then(() => {
        
    })
};

export const setUser = (user, name) => {
    const {email, displayName, photoURL, emailVerified} = user;
    const newUser = {
        email,
        name: displayName || name,
        photo: photoURL,
        emailVerified
    };
    return newUser;
};

export const createUser = (email, password, name) => {
    return auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
        setUserName(name);
        return setUser(res.user, name);
    })
    .catch(err => err);
};

export const signingUser = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
    .then(res => setUser(res.user))
    .catch(err => err);
};

export const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return auth.signInWithPopup(provider)
    .then(res => setUser(res.user))
    .catch(err => err);
}

export const userSignOut = () => {
    return auth.signOut()
    .then(() => {
        return true;
    })
    .catch(() => false);
};