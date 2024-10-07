"use client"
import { AnimatePresence, motion } from "framer-motion"
import { IoSearch } from "react-icons/io5"
import { icons } from "./Icons"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { proxy } from "valtio"

export default function Sidebar() {
	const local = proxy({
		expanded: false,
		expandTimer: false,
	})
	const navigate = useNavigate()

	const location = useLocation()
	const currentPath = location.pathname

	return (
		<div className="flex flex-col justify-between h-screen min-w-[200px] bg-dark text-textGray ">
			<div>
				<div className="flex-between m-[20px] mr-[2px] flex flex-row justify-between items-center">
					<div className="cursor-pointer" onClick={() => navigate("/")}>
						<icons.LearnAnythinglogo />
					</div>
					<button
						onClick={
							currentPath !== "/search"
								? () => navigate("/search")
								: () => navigate("/")
						}
						className="w-[50%] h-[50px] flex items-center justify-center px-2 rounded-xl text-white/20 hover:text-white/50 transition-colors duration-300 bg-[#161616]"
					>
						{currentPath !== "/search" ? (
							<IoSearch className="w-6 h-6 ml-[4px] mr-auto" />
						) : (
							<p> ← Back</p>
						)}
					</button>
				</div>
				<div className="col-gap-[8px] pl-2">
					<div
						className={`cursor-pointer px-3 text-white/70 ${currentPath === "/globaltopic" ? "" : "bg-[#1b1b1b]"} p-[8px] rounded-[7px] transition-all`}
					>
						Inbox
					</div>
					{/* {currentPath !== "/globaltopic" && (
						<div
							className="cursor-pointer px-3 text-white/60 p-[6px] rounded-[7px] transition-all"
							onClick={() => {
								// props.setCurrentPage("MyLinks")
							}}
						>
							Links
						</div>
					)} */}

					{/* <div className="flex-between text-white/40">
						<h2 className="text-white/20 text-[14px] px-3 p-2">Pages</h2>
						<div
							onClick={() => {
								props.setMode("Page")
								props.setCurrentPage("")
							}}
						>
							<Icon name="Plus" />
						</div>

						{props.personalPages.map((page, index) => {
							return (
								<div
									key={index}
									onClick={() => {
										props.topicTitle?.set({})
									}}
									className="text-white/60 px-3 p-[6px] cursor-pointer mb-[2px] hover:bg-hoverDark rounded-[7px] transition-all"
								>
									{page.title}
								</div>
							)
						})}
					</div> */}
				</div>
			</div>
			<div
				className="relative"
				onClick={() => {
					local.expanded = !local.expanded
				}}
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
				<div className="p-4 pb-6wl flex flex-row space-x-2 items-center">
					<div className="w-5 h-5 rounded-sm bg-neutral-600"></div>
					<p className="text-base text-white/70 hover:text-white/40 cursor-pointer">
						Profile
					</p>
				</div>
				<AnimatePresence>
					{local.expanded ? (
						<motion.div
							exit={{ opacity: 0, scale: 0.8 }}
							animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
							transition={{ duration: 0.22, easing: "ease-out" }}
							className="absolute bottom-[3em] w-[98%] min-w-fit left-[6px] bg-hoverDark rounded-[7px]"
							style={{
								border: "1px solid #1E1E1E",
								background: "rgba(55, 55, 55, 0.40)",
								backdropFilter: "blur(8.5px)",
							}}
						>
							<div
								onClick={() => {
									navigate("/settings/profile")
								}}
								className="rounded-[7px] h-[34px] cursor-pointer whitespace-nowrap px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60"
							>
								Edit Profile
							</div>
							<div
								onClick={() => {
									window.open("https://discord.gg/bxtD8x6aNF", "_blank")
								}}
								className="rounded-[7px] h-[34px] cursor-pointer whitespace-nowrap px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60"
							>
								Support
							</div>
							<div className="rounded-[7px] h-[34px] cursor-pointer whitespace-nowrap px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60">
								Sign out
							</div>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</div>
	)
}
