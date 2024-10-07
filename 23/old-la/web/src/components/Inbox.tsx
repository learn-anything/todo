import { useState } from "react"
import { useProxy } from "valtio/utils"
import InboxTopbar from "./InboxTopbar"
import { PersonalLink } from "./PersonalLink"
import { PersonalLinkType } from "../types"
import NewTodoOrLink from "./NewTodoOrLink"
import { HomeAuthRouteState } from "../routes/HomeAuthRoute"

export default function Inbox() {
	// TODO: bring back once fixed https://discord.com/channels/740090768164651008/778312367439347724/1253698071657709688
	// const local = proxy({
	// 	expandedLink: null as string | null,
	// })
	// useEffect(() => {
	// 	console.log(local.expandedLink, "expandedLink")
	// }, [local.expandedLink])
	const [expandedLink, setExpandedLink] = useState<string | null>(null)
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
	const global = useProxy(HomeAuthRouteState)

	const handleDragStart = (index: number) => {
		setDraggedIndex(index)
	}

	const handleDragEnter = (index: number) => {
		if (draggedIndex === null) return
		if (draggedIndex === index) return

		const newLinks = [...global.personalLinks]
		const [removed] = newLinks.splice(draggedIndex, 1)
		newLinks.splice(index, 0, removed)

		global.personalLinks = newLinks
		setDraggedIndex(index)
	}

	const handleDragEnd = () => {
		setDraggedIndex(null)
	}

	return (
		<div className="w-full h-full border border-white/10 rounded-[20px]">
			<InboxTopbar />
			<div style={{ margin: "0 auto" }} className="w-[98%] flex flex-col mx-4">
				{global.enteringNewPersonalLinkOrTodo && (
					<NewTodoOrLink
						addLink={(link: PersonalLinkType) => {
							global.personalLinks = [...global.personalLinks, link]
							global.enteringNewPersonalLinkOrTodo = false
						}}
					/>
				)}
				{global.personalLinks.map((link, index) => (
					<div
						key={index}
						draggable
						onDragStart={() => handleDragStart(index)}
						onDragEnter={() => handleDragEnter(index)}
						onDragOver={(e) => e.preventDefault()}
						onDragEnd={handleDragEnd}
						className={`transition-transform duration-200 ${
							draggedIndex === index ? "opacity-50" : ""
						}`}
					>
						<PersonalLink
							link={link}
							expandedLink={expandedLink}
							setExpandedLink={(title) => {
								setExpandedLink(title)
							}}
							index={index}
							showNewTodoOrLink={global.enteringNewPersonalLinkOrTodo}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
