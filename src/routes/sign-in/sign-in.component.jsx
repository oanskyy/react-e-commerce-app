import { useEffect } from "react"
import { getRedirectResult } from "firebase/auth"
import {
	auth,
	signInWithGooglePopup,
	signInWithGoogleRedirect,
	createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils"

const SignIn = () => {
	// on MOUNT, this useEffect will run the callback ONCE, on mounting. (why? due to empty array)
	useEffect(() => {
		async function fetchData() {
			const response = await getRedirectResult(auth)
			console.log(response)
			if (response) {
				const userDocRef = await createUserDocumentFromAuth(response.user)
			}
		}
	}, [])

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup()
		const userDocRef = createUserDocumentFromAuth(user)
	}

	return (
		<div>
			<h1>Sign in page</h1>
			<button onClick={logGoogleUser}>Sign In with Google Popup</button>
			<button onClick={signInWithGoogleRedirect}>
				Sign In with Google Redirect
			</button>
		</div>
	)
}

export default SignIn
