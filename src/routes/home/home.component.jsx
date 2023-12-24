import { Outlet } from "react-router-dom"
import { Fragment } from "react"
import Directory from "../../components/directory/directory.component"

const Home = () => {
	return (
		<Fragment>
			<Outlet />
			<Directory />
		</Fragment>
	)
}

export default Home
