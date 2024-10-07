import { useParams } from "react-router-dom"
import ProfileRoute from "./ProfileRoute"
import GlobalTopicRoute from "./GlobalTopicRoute"

export default function GlobalTopicOrProfileRoute() {
	let params = useParams()

	if (params.topicOrUsername?.startsWith("@")) {
		return <ProfileRoute />
	}

	return <GlobalTopicRoute />
}
