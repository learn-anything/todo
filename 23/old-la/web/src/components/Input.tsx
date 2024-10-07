import { useProxy } from "valtio/utils"
import { HomeAuthRouteState } from "../routes/HomeAuthRoute"

export default function Input() {
	const global = useProxy(HomeAuthRouteState)
	return (
		<>
			<input
				type="text"
				value={global.inputValue}
				onChange={(e) => {
					global.inputValue = e.target.value
				}}
				className="p-2 rounded-md border border-gray-300"
			/>
		</>
	)
}
