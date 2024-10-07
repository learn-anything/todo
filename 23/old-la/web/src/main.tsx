// TODO: render HomePublic if not auth'd
import { createJazzReactContext, DemoAuth } from "jazz-react"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import GlobalTopicOrProfileRoute from "./routes/GlobalTopicOrProfileRoute"
import HomeAuthRoute from "./routes/HomeAuthRoute"
import SettingsProfile from "./routes/SettingsProfile"
import TestRoute from "./routes/TestRoute"
import { LaAccount } from "./schema"
import SearchRoute from "./routes/SearchRoute"
// import UserErrorRoute from "./routes/UserErrorRoute"
import path from "path"

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeAuthRoute />,
	},
	{
		path: "/search",
		element: <SearchRoute />,
	},
	{
		path: "/:topicOrUsername",
		element: <GlobalTopicOrProfileRoute />,
	},
	{
		path: "/settings/profile",
		element: <SettingsProfile />,
	},
	{
		path: "/test",
		element: <TestRoute />,
	},
	// {
	// 	path: "/user-error",
	// 	element: <UserErrorRoute />,
	// },
	// {
	//  path: "*",
	//  element: <HomeAuthRoute />,
	// },
	// {
	//  path: "/@:username/:page-name",
	//  element: <PersonalPageRoute />,
	// },
	// TODO: remove from prod (only available locally)
])

const Jazz = createJazzReactContext({
	auth: DemoAuth({
		appName: "Learn Anything",
		accountSchema: LaAccount,
		seedAccounts:
			import.meta.env.VITE_SEED_ACCOUNTS &&
			JSON.parse(import.meta.env.VITE_SEED_ACCOUNTS),
	}),
	peer: "wss://mesh.jazz.tools/?key=nikita@nikiv.dev",
})
export const { useAccount, useCoState } = Jazz

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Jazz.Provider>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Jazz.Provider>,
)
