import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { icons } from "../components/Icons"
import { Link } from "react-router-dom"

interface Props {
	username: string
}

interface ProfileStatsProps {
	number: number
	label: string
}

// interface ProfilePagesProps {
// 	topic: string
// }

interface ProfileLinksProps {
	linklabel: string
	link: string
	topic: string
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ number, label }) => {
	return (
		<div className="text-center font-semibold">
			<p className="text-4xl text-white">{number}</p>
			<p className="text-[#878787]">{label}</p>
		</div>
	)
}

// const ProfilePages: React.FC<ProfilePagesProps> = ({ topic }) => {
// 	return (
// 		<div className="rounded-lg text-white items-center p-3 cursor-pointer bg-[#121212] flex flex-row justify-between">
// 			<p>{topic}</p>

// 			<icons.VectorArrowRight />
// 		</div>
// 	)
// }

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
					<p className="text-white/10 text-sm">{link}</p>
				</div>
			</div>
			<div className="rounded-lg p-2 bg-[#1a1a1a] text-white/50">{topic}</div>
		</div>
	)
}

const ProfileRoute = () => {
	const params = useParams()

	if (!params.topicOrUsername) {
		return (
			<div className="flex flex-col h-screen py-3">
				<div className="flex flex-1">
					<div className="w-1/5 mr-2">
						<Sidebar />
					</div>
					<div className="flex-1 flex flex-col border border-neutral-800 rounded-3xl text-white/30">
						<p className="text-2xl font-semibold text-center h-[74px] my-10 border-b border-neutral-900">
							Oops! This account doesn’t exist.
						</p>
						<p className="text-lg  font-semibold text-center mb-5">
							Try searching for another.
						</p>
						<p className="text-lg font-semibold text-center mb-5">
							The link you followed may be broken, or the page may have been
							removed. Go back to
							<Link to="/">
								<span className="text-white/40">homepage</span>
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-screen py-3">
			<div className="flex flex-1">
				<div className="w-1/5 mr-2">
					<Sidebar />
				</div>
				<div className="flex-1 flex flex-col border border-neutral-800 rounded-3xl">
					<p className="text-2xl text-white/30 font-semibold h-[74px] p-[20px]">
						{params.topicOrUsername}
					</p>
					<div className="flex flex-col items-center bg-inherit text-white pb-5 border-b border-neutral-900">
						<div className="flex align-top w-full max-w-2xl">
							<div className="w-[130px] h-[130px] bg-[#222222] rounded-md mr-3" />
							<div className="ml-6 flex-1">
								<p className="text-[25px] font-semibold mb-3">
									Username Username
								</p>
								<div className="text-white text-[24] font-light mb-1 flex flex-row">
									<icons.Link />
									<p className="pl-1">Usernametext</p>
								</div>
								<a
									href="https://"
									className="text-white/40 text-sm font-light mb-1 flex flex-row items-center"
								>
									<icons.Link />
									<p className="pl-1">usernamelink</p>
								</a>
							</div>
							<button className="ml-auto px-3 h-[34px] bg-[#222222] text-white/70 hover:opacity-60 rounded-md shadow-inner shadow-outer">
								Follow
							</button>
						</div>
					</div>
					<div className="flex justify-center mt-10">
						<div className="flex flex-row gap-20">
							<ProfileStats number={64} label="Learning" />
							<ProfileStats number={124} label="To Learn" />
							<ProfileStats number={12} label="Learned" />
						</div>
					</div>

					{/* <div className="justify-center mt-10 mx-auto w-[50%] space-y-1">
							<p className="text-white/50 pl-2 pb-3 text-base font-light">
								Public Pages
							</p>
							<ProfilePages topic="Figma" />
							<ProfilePages topic="React" />
							<ProfilePages topic="Redux" />
						</div> */}
					<div className="justify-center mt-10 mx-auto w-[50%] space-y-1">
						<p className="text-white/50 pl-2 pb-3 text-base font-light">
							Public Links
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

export default ProfileRoute
