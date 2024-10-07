import { useAccount } from "../main"
import { PersonalLink, TodoItem } from "../schema"

export default function TestRoute() {
	const global = useAccount({
		// {} = loads all primitive fields
		// {} = can include references to load inside the object
		root: { pages: [{}], personalLinks: [{ globalLink: {} }], todos: [{}] },
	}).me?.root

	if (!global) return <></>

	return (
		<>
			<div className="text-white">
				<h1>Test</h1>
				<div className="text-white">
					{global.personalLinks.map((personalLink) => {
						return (
							<div key={personalLink.id}>{personalLink.globalLink.url}</div>
						)
					})}
				</div>
				<input
					type="text"
					value={global.personalLinks[1].note}
					onChange={(e) => {
						global.personalLinks[1].note = e.target.value
					}}
					className="p-2 rounded-md border border-gray-300"
				/>
			</div>
		</>
	)
}

function TodoItemComponent({ item }: { item: TodoItem }) {
	return ""
}

function PersonalLinkComponent({ item }: { item: PersonalLink }) {
	return item.globalLink?.url
}
