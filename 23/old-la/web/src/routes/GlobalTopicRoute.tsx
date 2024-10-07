import { useProxy } from "valtio/utils"
import GlobalTopicTopbar from "../components/GlobalTopicTopbar"
import Icon from "../components/Icons"
import Sidebar from "../components/Sidebar"
import { useAccount } from "../main"

export default function GlobalTopicRoute() {
	const local = useProxy({
		showView: "All",
		inputValue: "Testing",
		rotateIcon: false,
	})
	const global = useAccount({}).me?.root
	if (!global) return <></>

	const links = [
		{ title: "Just JavaScript", url: "https://justjavascript.com" },
		{ title: "Modern JavaScript Tutorial", url: "https://javascript.info" },
	]

	return (
		<div className="flex h-screen mt-2 mb-2 max-w-screen w-screen overflow-hidden text-white">
			<div className="w-1/6">
				<Sidebar />
			</div>
			<div className="w-5/6 mx-5 h-full border border-white/10 rounded-[20px]">
				<GlobalTopicTopbar />
				<div className="px-5 py-3">
					<h2 className="text-white/60 mb-3">Intro</h2>
					{links.map((link, index) => (
						<div
							key={index}
							className="flex flex-row items-center justify-between p-2 rounded-xl hover:cursor-pointer bg-[#121212] mb-1"
						>
							<div className="flex space-x-5 items-center">{link.title}</div>
							<div
								className="text-zinc-600 hover:cursor-pointer"
								onClick={() => window.open(link.url, "_blank")}
							>
								<a href={link.url} className="text-white">
									<Icon name="Link" height="20" width="20" />
								</a>
							</div>
						</div>
					))}
				</div>
				<div className="px-5 py-3">
					<h2 className="text-white/60 mb-3">Other</h2>
					{links.map((link, index) => (
						<div
							key={index}
							className="flex flex-row items-center justify-between p-2 rounded-xl hover:cursor-pointer bg-[#121212] mb-1"
						>
							<div className="flex space-x-5 items-center">{link.title}</div>
							<div
								className="text-zinc-600 hover:cursor-pointer"
								onClick={() => window.open(link.url, "_blank")}
							>
								<a href={link.url} className="text-white">
									<Icon name="Link" height="20" width="20" />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
