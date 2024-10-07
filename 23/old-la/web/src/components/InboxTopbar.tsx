import { AnimatePresence, motion } from "framer-motion"
import { proxy } from "valtio"
import Icons from "./Icons"
import Icon from "./Icons"

export default function InboxTopbar() {
	return (
		<div className="flex flex-row justify-between px-5 pt-5 mb-5">
			{/* <div className=" flex [&>*]:h-full bg-hoverDark rounded-md text-white/60 bg-[#191919] [&>*]:flex-center h-[34px] items-center">
				<button
					className={`px-[11px] cursor-pointer ${props.showView === "All" ? "bg-[#222222] text-white/80 rounded-md shadow-inner shadow-outer" : ""}`}
					onClick={() => {}}
				>
					All
				</button>
				<button
					className={`px-[11px] ${props.showView === "Links" ? "bg-[#222222] text-white/80 rounded-md shadow-inner shadow-outer" : ""}`}
					onClick={() => {}}
				>
					Links
				</button>
				<button
					className={`px-[11px] ${props.showView === "Todos" ? "bg-[#222222] text-white/80 rounded-md shadow-inner shadow-outer" : ""}`}
					onClick={() => {}}
				>
					Todos
				</button>
			</div>
			<div className="flex flex-row items-center gap-2 cursor-pointer">
				<TopicFilter />
				<SortFilter />
			</div> */}
		</div>
	)
}

function TopicFilter() {
	const local = proxy({
		filters: ["Liked", "Topic"],
		appliedFilters: [] as string[],
		expanded: false,
		expandTimer: false,
	})

	return (
		<div
			className="flex gap-2 w-fit"
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
			<div className="relative">
				<div
					style={{
						border: "1px dashed rgba(255, 255, 255, 0.10)",
						background: "rgba(255, 255, 255, 0.02)",
					}}
					className="flex flex-row items-center h-[34px] px-[11px] pl-[9px] rounded-[7px] shrink-0 flex-center dark:text-white/50"
					onClick={() => {
						local.expanded = !local.expanded
					}}
				>
					<Icons name="Plus" />
					Filter
				</div>

				<AnimatePresence>
					{local.expanded ? (
						<motion.div
							exit={{ opacity: 0, scale: 0.8 }}
							animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
							transition={{ duration: 0.22, easing: "ease-out" }}
							className="absolute top-10 w-full min-w-fit justify-center left-0 bg-hoverDark rounded-[7px] space-y-2"
							style={{
								border: "1px solid #1E1E1E",
								background: "rgba(55, 55, 55, 0.40)",
								backdropFilter: "blur(8.5px)",
							}}
						>
							{local.filters.map((filter: string, index: number) => {
								return (
									<div
										key={index}
										onClick={() => {
											if (!local.appliedFilters.includes(filter)) {
												local.appliedFilters = [filter, ...local.appliedFilters]
											}
											local.expanded = false
										}}
										className="rounded-[7px] h-[34px] px-[11px] flex flex-col space-y-2 hover:bg-softDarkText/10 text-white/60"
									>
										{filter}
									</div>
								)
							})}
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			{local.appliedFilters.map((filter, index) => {
				return (
					<div
						key={index}
						className="bg-hoverDark rounded-[7px] px-[11px] flex-center text-white/60 gap-10"
					>
						{filter}
					</div>
				)
			})}
		</div>
	)
}

function SortFilter() {
	const local = proxy({
		expanded: false,
		filterOrder: "Recently Added",
		expandTimer: false,
	})
	return (
		<div
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
			<div
				onClick={() => {
					local.expanded = !local.expanded
				}}
				className="flex flex-row items-center button px-[11px] pr-[4px] text-white/60 h-[34px] flex-center gap-1 rounded-[7px] bg-[#232323]"
			>
				{local.filterOrder}
				<Icon name="ArrowDown" />
			</div>
			<AnimatePresence>
				{local.expanded ? (
					<motion.div
						exit={{ opacity: 0, scale: 0.8 }}
						animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
						transition={{ duration: 0.22, easing: "ease-out" }}
						className="cursor-pointer absolute items-center top-10 inline-flex right-0 bg-hoverDark p-1 flex-col gap-[2px] min-w-fit rounded-[7px]"
						style={{
							border: "1px solid #1E1E1E",
							background: "rgba(55, 55, 55, 0.40)",
							backdropFilter: "blur(8.5px)",
						}}
					>
						<button
							onClick={() => {
								local.filterOrder = "Custom"
								local.expanded = false
							}}
							className="rounded-[7px] h-[34px] cursor-pointer px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60"
						>
							Custom
						</button>
						<button
							onClick={() => {
								local.filterOrder = "Recently Added"
								local.expanded = false
							}}
							className="flex flex-row items-center rounded-[7px] h-[34px] whitespace-nowrap px-[11px] hover:bg-softDarkText/10 text-white/60"
						>
							Recently Added
						</button>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}
