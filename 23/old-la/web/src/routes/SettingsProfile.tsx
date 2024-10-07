import { proxy } from "valtio"
import Icon from "../components/Icons"
import Sidebar from "../components/Sidebar"
import { useAccount } from "../main"
import { useProxy } from "valtio/utils"
import { checkIfUrl } from "../../lib/utils"
import { errorToast } from "../../lib/react-utils"
import { Toaster } from "react-hot-toast"

const SettingsProfileState = proxy({
	name: "",
	username: "",
	website: "",
	bio: "",
})
export default function SettingsProfile() {
	const local = useProxy(SettingsProfileState)
	const global = useAccount({
		root: {},
	}).me?.root
	// TODO: load proxy with global state
	if (!global) return <></>

	return (
		<>
			<Toaster />
			<div className="flex flex-col h-screen py-3">
				<div className="flex flex-1">
					<div className="w-1/5 mr-2">
						<Sidebar />
					</div>
					<div className="flex-1 flex flex-col border border-neutral-800 rounded-3xl">
						<div>
							<p className="text-[25px] text-white/20 tracking-wide font-semibold h-[74px] p-[20px]">
								Profile
							</p>
							<div className="px-[41px] p-[20px] flex gap-[40px]">
								<button className="w-[130px] h-[130px] border-dashed border rounded-2xl border-white/10 bg-[#141414] flex flex-col justify-center items-center text-white/50">
									<Icon name="Plus" />
									<p className="tracking-wide text-sm">Photo</p>
								</button>
								<div className="flex flex-col font-light space-y-4">
									<input
										type="text"
										placeholder="Your name"
										className="bg-[#121212] placeholder:font-light tracking-wide font-light outline-none rounded-[10px] placeholder-white/20 text-white/30 w-[400px] px-[14px] p-[13px]"
										value={local.name}
										onChange={(e) => {
											local.name = e.target.value
										}}
									/>
									<input
										type="text"
										placeholder="Username"
										value={local.username}
										onChange={(e) => {
											local.username = e.target.value
												.toLowerCase()
												.replace(/\s+/g, "-")
												.replace(/[^a-z0-9-]/g, "")
										}}
										className="bg-[#121212] placeholder:font-light tracking-wide outline-none rounded-[10px] placeholder-white/20 text-white/30 w-[400px] px-[14px] p-[13px]"
									/>
									<p className="text-white/30">
										learn-anything.xyz/@{local.username}
									</p>
									<input
										type="text"
										placeholder="Website"
										className="bg-[#121212] placeholder:font-light tracking-wide outline-none rounded-[10px] placeholder-white/20 w-[400px] px-[14px] p-[13px] text-white/30"
										value={local.website}
										onChange={(e) => {
											local.website = e.target.value
											// const isValidUrl = (url: string) => {
											// 	try {
											// 		new URL(url)
											// 		return true
											// 	} catch (_) {
											// 		return false
											// 	}
											// }
											// if (isValidUrl(e.target.value)) {
											// 	global.website = e.target.value
											// }
										}}
									/>
									<input
										type="text"
										placeholder="Bio"
										className="bg-[#121212] font-light placeholder:font-light tracking-wide pt-2 outline-none rounded-[10px] placeholder-white/20 w-[400px] h-[120px] px-[14px] pb-[104px] text-left text-white/30"
										value={local.bio}
										onChange={(e) => {
											local.bio = e.target.value
										}}
									/>
									<button
										onClick={() => {
											if (!checkIfUrl(local.website)) {
												errorToast("Website is not valid URL")
												return
											}
											global.website = local.website
											global.name = local.name
											// TODO: check that username does not already exist in jazz. show red error if it does.
											global.username = local.username
											global.bio = local.bio
										}}
										className="bg-[#121212] text-white/20 font-light tracking-wide outline-none rounded-md py-1 px-2 mt-4 w-[120px] flex justify-center items-center whitespace-nowrap"
									>
										Save
									</button>
								</div>
							</div>
						</div>
						{/* <button
							onClick={() => {
								if (!checkIfUrl(local.website)) {
									errorToast("Website is not valid URL")
									return
								}
								global.website = local.website
								global.name = local.name
								// TODO: check that username does not already exist in jazz. show red error if it does.
								global.username = local.username
								global.bio = local.bio
							}}
							className="bg-[#121212] text-white/20 font-light outline-none rounded-[10px] py-2 px-4 mt-4 w-[120px] flex justify-center items-center whitespace-nowrap"
						>
							Save
						</button> */}
					</div>
				</div>
			</div>
		</>
	)
}
