import { proxy } from "valtio"

export default function GlobalTopicTopbar() {
	const local = proxy({
		activeButton: "Guide" as "Guide" | "All links",
	})
	return (
		<div className="flex flex-row justify-between px-5 pt-5 mb-5">
			<h1 className="text-white text-xl font-bold">topicOrUsername</h1>
			<div className="flex flex-row items-center space-x-5">
				<div className="flex flex-row items-center bg-[#181818] rounded-md">
					<button
						className={`rounded-l-md h-[34px] cursor-pointer px-[11px] ${local.activeButton === "Guide" ? "bg-[#232323] shadow-outer shadow-inner text-white/90 rounded-r-md" : "bg-[#181818] text-white/60"}`}
						onClick={() => {
							local.activeButton = "Guide"
						}}
					>
						Guide
					</button>
					<button
						className={`rounded-r-md h-[34px] cursor-pointer px-[11px] ${local.activeButton === "All links" ? "bg-[#232323] shadow-outer shadow-inner text-white/90 rounded-l-md" : "bg-[#181818] text-white/60"}`}
						onClick={() => {
							local.activeButton = "All links"
						}}
					>
						All links
					</button>
				</div>
				<button className="rounded-[7px] h-[34px] cursor-pointer shadow-inner shadow-outer px-[11px] bg-[#232323] text-white/70">
					Add to my profile
				</button>
			</div>
		</div>
	)
}
