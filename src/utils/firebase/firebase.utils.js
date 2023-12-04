import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup,signInWithRedirect, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCmDnI2YF_mKe7VbMnvvSFQUpwtegaAI04",
	authDomain: "crwn-clothing-db-77312.firebaseapp.com",
	projectId: "crwn-clothing-db-77312",
	storageBucket: "crwn-clothing-db-77312.appspot.com",
	messagingSenderId: "1073669151355",
	appId: "1:1073669151355:web:44b5fa9c9f476078a960de"
}

// Initialize Firebase
initializeApp(firebaseConfig)
// const firebaseApp = initializeApp(firebaseConfig)

// initialize provider
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

// instantiate
export const db = getFirestore()

export const createUserDocumentFromAuth = async userAuth => {
	const userDocRef = doc(db, "users", userAuth.uid)
	console.log(userDocRef)

	const userSnapshot = await getDoc(userDocRef)
	console.log(userSnapshot)
	console.log(userSnapshot.exists())

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()
		try {
			await setDoc(userDocRef, { displayName, email, createdAt })
		} catch (error) {
			console.log("error creating the user", error.message)
		}
	}
	return userDocRef
}
