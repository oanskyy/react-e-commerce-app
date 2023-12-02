import { initializeApp } from "firebase/app"
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider
} from "firebase/auth"

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
const firebaseApp = initializeApp(firebaseConfig)

// initialize provider
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
