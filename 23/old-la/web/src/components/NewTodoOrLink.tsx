import { useEffect, useRef, useState } from "react"
import { proxy } from "valtio"
import Icon from "./Icons"

export default function NewTodoOrLink({ addLink }: any) {
	const local = proxy({
		// TODO: comented out because valtio reactivity is breaking on updates to it
		// https://discord.com/channels/740090768164651008/778312367439347724/1253700488139116595
		// inputValue: "",
		isUrlInput: false,
		showInput: true,
	})
	const [inputValue, setInputValue] = useState("")

	useEffect(() => {
		console.log(local, "local of new todo")
	}, [local])

	return (
		<form
			onSubmit={(event: React.FormEvent) => {
				event.preventDefault()
				if (inputValue.trim()) {
					addLink({ title: inputValue })
					setInputValue("")
					local.showInput = false
				}
			}}
		>
			{local.isUrlInput ? (
				<UrlInput inputValue={inputValue} />
			) : (
				<TextInput
					inputValue={inputValue}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						console.log(event.target.value, "event")
						setInputValue(event.target.value)
						local.isUrlInput =
							event.target.value.startsWith("http://") ||
							event.target.value.startsWith("https://")
					}}
				/>
			)}
		</form>
	)
}

function TextInput({
	inputValue,
	onChange,
	errorMessage,
}: {
	inputValue: string
	date?: number
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	errorMessage?: string
}) {
	return (
		<input
			type="text"
			placeholder={errorMessage || "Write a todo or paste link"}
			value={inputValue}
			onChange={onChange}
			autoFocus
			className="flex flex-row w-full h-full items-center bg-[#181818] outline-none placeholder-white/20 text-white/30 rounded-2xl p-3"
		/>
	)
}

function UrlInput({ inputValue }: { inputValue: string }) {
	const local = proxy({
		title: "",
		description: "",
	})
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.style.width = `${inputRef.current.value.length + 1}ch`
		}
	}, [local.title])

	useEffect(() => {
		fetch(inputValue)
			.then((response) => response.text())
			.then((html) => {
				const doc = new DOMParser().parseFromString(html, "text/html")
				const titleElement = doc.querySelectorAll("title")[0]
				local.title = titleElement ? titleElement.innerText : inputValue
			})
			.catch(() => {
				local.title = inputValue
			})
	}, [inputValue])

	return (
		<div className="bg-[#181818] w-full rounded-lg p-2 pb-2">
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row px-2 items-center relative">
					<input
						type="url"
						autoFocus
						ref={inputRef}
						value={local.title}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							local.title = event.target.value
						}}
						className="flex-grow text-base bg-transparent outline-none focus:ring-0 focus:outline-none text-white"
					/>
					<p className="text-neutral-700 text-sm font-light">2024</p>
				</div>
				<Icon name="Link" height="20" width="30" border="gray" />
			</div>
			<input
				type="text"
				placeholder="Add description"
				value={local.description}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					local.description = event.target.value
				}}
				className="text-base p-2 bg-transparent outline-none focus:ring-0 focus:outline-none text-white/50 placeholder:text-white/30"
			/>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row pt-2 space-x-2 items-center">
					<button className="bg-neutral-700/20 text-white/50 flex flex-row rounded-lg px-2 py-1 items-center whitespace-nowrap">
						<p className="pr-2">No Topic</p>
						<Icon name="ThinArrowDown" height="20" width="30" border="gray" />
					</button>
					<div className="flex flex-row items-center">
						<Icon name="Note" height="20" width="30" border="gray" />
						<input
							type="text"
							className="text-neutral-600 placeholder:text-neutral-600 text-base w-[1000px] font-normal px-2 bg-transparent rounded-md outline-none focus:ring-0"
							placeholder="Take a note..."
						/>
					</div>
				</div>
				<div className="flex flex-row items-center opacity-50">
					<Icon name="Options" height="22" width="32" border="gray" />
					<Icon name="Heart" height="22" width="32" border="gray" />
				</div>
			</div>
		</div>
	)
}
