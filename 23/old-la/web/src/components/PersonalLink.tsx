import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useRef } from "react"
import { proxy } from "valtio"
import Icon from "./Icons"

export function PersonalLink(props: {
	link: { title: string; description: string; date: string }
	expandedLink: string | null
	setExpandedLink: (title: string | null) => void
	showNewTodoOrLink: boolean
	index: number
}) {
	const local = proxy({
		title: props.link.title,
		description: props.link.description,
	})

	const ref = useRef<HTMLDivElement>(null)

	const isExpanded = props.expandedLink === props.link.title

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				ref.current &&
				!ref.current.contains(event.target as Node) &&
				isExpanded
			) {
				props.setExpandedLink(null)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isExpanded, props.setExpandedLink])

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			event.stopPropagation()
			props.setExpandedLink(isExpanded ? null : props.link.title)
		},
		[isExpanded, props.link.title, props.setExpandedLink],
	)

	// TODO: bring back once reactivity is fixed..
	// useEffect(() => {
	// 	local.isExpanded = props.expandedLink === props.link.title
	// 	console.log(props.expandedLink === props.link.title, "value..")
	// }, [props.expandedLink])

	return (
		<div ref={ref}>
			<motion.div
				id="ProfileLink"
				onClick={handleClick}
				className={`rounded-lg hover:bg-hoverDark bg-softDark py-[2px] h-full transition-all cursor-pointer ${
					isExpanded ? "h-full transition-all !bg-neutral-900" : ""
				}`}
			>
				<div className="flex flex-row items-center justify-between">
					<div
						className={`flex flex-row p-2 items-center w-full justify-between ${!isExpanded ? "bg-[#121212] rounded-xl py-2 px-4" : ""}`}
					>
						<div className="flex items-center">
							{isExpanded ? (
								<input
									onClick={(e) => e.stopPropagation()}
									value={local.title}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										local.title = event.target.value
									}}
									className="bg-inherit text-white/50 placeholder:text-neutral-600 w-full p-2 outline-none focus:outline-none focus:ring-0 border-none text-left"
								/>
							) : (
								<p>{props.link.title}</p>
							)}

							{isExpanded && (
								<p className="text-white/10 ml-2">{props.link.date}</p>
							)}
						</div>
						{isExpanded && (
							<Icon name="Link" height="20" width="30" border="gray" />
						)}
					</div>
				</div>

				{isExpanded ? (
					<motion.div
						onClick={(event: React.MouseEvent<HTMLDivElement>) => {
							event.stopPropagation()
						}}
						className="w-full h-full flex flex-col justify-between"
					>
						<div className="flex-col flex justify-between text-[14px]">
							<input
								onClick={(e) => e.stopPropagation()}
								className="bg-inherit text-white/50 placeholder:text-neutral-600 w-[90%] p-2 outline-none focus:outline-none focus:ring-0 border-none text-left"
								style={{ textAlign: "left", whiteSpace: "pre-wrap" }}
								value={local.description}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									local.description = event.target.value
								}}
								placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, officia."
							></input>
						</div>
						<div className="w-full flex flex-row justify-between items-center p-2">
							<div className="flex flex-row items-center">
								<Icon name="Note" height="24" width="24" border="white" />
								<input
									type="text"
									placeholder="Take a note..."
									onChange={() => {}}
									className="text-[14px] placeholder:text-neutral-600 text-white/40 pl-2 border-none bg-inherit outline-none focus:outline-none focus:ring-0"
								/>
							</div>
							{isExpanded ? (
								<div className="flex flex-row justify-between items-center gap-2">
									<motion.div
										animate={{
											transform: ["translateX(5px)", "translateX(0)"],
											opacity: [0, 0.6],
										}}
										transition={{ duration: 0.3 }}
										className="opacity-60 items-center flex flex-row gap-2"
									>
										<button className="cursor:pointer">
											<Icon
												name="Options"
												height="20"
												width="30"
												border="gray"
											/>
										</button>
										<button className="cursor:pointer">
											<Icon name="Heart" height="24" width="24" border="gray" />
										</button>
									</motion.div>
									<PeronalLinkStatus />
								</div>
							) : null}
						</div>
					</motion.div>
				) : null}
			</motion.div>
		</div>
	)
}

function PeronalLinkStatus() {
	const local = proxy({
		expanded: false,
		status: "Learning",
		expandTimer: false,
	})
	return (
		<motion.div
			animate={{
				transform: ["translateX(5px)", "translateX(0)"],
				opacity: [0, 1],
			}}
			transition={{ duration: 0.5 }}
			className="relative"
			onMouseLeave={() => {
				local.expandTimer = true
				setTimeout(() => {
					if (local.expandTimer) {
						local.expanded = false
					}
				}, 500)
			}}
			onMouseEnter={() => {
				local.expandTimer = false
			}}
		>
			<AnimatePresence>
				{local.expanded ? (
					<motion.div
						exit={{ opacity: 0, scale: 0.8 }}
						animate={{ scale: [0.8, 1.1, 1], opacity: [0, 1] }}
						transition={{ duration: 0.2, easing: "ease-in" }}
						className="absolute top-10 w-full min-w-fit left-0 bg-hoverDark p-1 rounded-[7px]"
						style={{
							border: "1px solid #1E1E1E",
							background: "rgba(55, 55, 55, 0.40)",
							backdropFilter: "blur(8.5px)",
						}}
					></motion.div>
				) : null}
			</AnimatePresence>
		</motion.div>
	)
}
