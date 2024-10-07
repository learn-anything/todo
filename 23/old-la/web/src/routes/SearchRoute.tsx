import Sidebar from "../components/Sidebar"
import { icons } from "../components/Icons"
import { IoSearch, IoCloseOutline } from "react-icons/io5"

interface ProfileTopicsProps {
	topic: string
}

const ProfileTopics: React.FC<ProfileTopicsProps> = ({ topic }) => {
	return (
		<div className="rounded-lg text-white items-center p-3 cursor-pointer bg-[#121212] flex flex-row justify-between">
			<p>{topic}</p>
			<icons.VectorArrowRight />
		</div>
	)
}

interface ProfileLinksProps {
	linklabel: string
	link: string
	topic: string
}

const ProfileLinks: React.FC<ProfileLinksProps> = ({
	linklabel,
	link,
	topic,
}) => {
	return (
		<div className="rounded-lg text-white items-center p-3 bg-[#121212] flex flex-row justify-between">
			<div className="flex flex-row space-x-3 items-center">
				<p className="text-white/90 text-base">{linklabel}</p>
				<div className="flex flex-row items-center gap-1 cursor-pointer">
					<icons.Link />
					<p className="text-white/10 hover:text-white/30 text-sm transition-colors duration-300">
						{link}
					</p>
				</div>
			</div>
			<div className="rounded-lg p-2 bg-[#1a1a1a] text-white/50 cursor-default">
				{topic}
			</div>
		</div>
	)
}

export default function SearchRoute() {
	return (
		<div className="flex h-screen w-screen box-border overflow-hidden text-white">
			<div className="w-1/7 mr-2">
				<Sidebar />
			</div>
			<div className="w-full mt-2 h-full border border-white/10 rounded-[20px] mr-2 flex justify-center">
				<div className="w-[55%]">
					<div className="mt-5 mb-2 w-full flex flex-row items-center relative  hover:text-white/60 transition-colors duration-300">
						<IoSearch className="absolute left-2 text-white/30" size={20} />
						<input
							type="text"
							autoFocus
							className="bg-[#16181d] placeholder:font-light placeholder:text-white/30 text-white/70 tracking-wider font-light outline-none rounded-[10px] w-full pl-10 pr-10 py-3"
							placeholder="Search..."
						/>
						<IoCloseOutline
							className="absolute right-2 text-white/30"
							size={20}
						/>
					</div>
					<div className="justify-center my-5 mx-auto space-y-1">
						<p className="text-white/50 pl-2 pb-3 text-base font-light">
							Topics <span className="text-white/70">1</span>
						</p>
						<ProfileTopics topic="Figma" />
					</div>

					<div className="justify-center my-5 mx-auto  space-y-1">
						<p className="text-white/50 pl-2 pb-3 text-base font-light">
							Links <span className="text-white/70">3</span>
						</p>
						<ProfileLinks
							linklabel="Figma"
							link="https://figma.com"
							topic="Figma"
						/>
						<ProfileLinks
							linklabel="Figma"
							link="https://figma.com"
							topic="Figma"
						/>
						<ProfileLinks
							linklabel="Figma"
							link="https://figma.com"
							topic="Figma"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
