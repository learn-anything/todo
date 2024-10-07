import { GlobalLink, LaAccount, Page, PersonalLink } from "@/web/src/schema"
import { startWorker } from "jazz-nodejs"
import { Group } from "jazz-tools"
import { RawControlledAccount } from "cojson"

async function seed() {
	const args = Bun.argv
	const command = args[2]
	try {
		switch (command) {
			case undefined:
				console.log("No command provided")
				break
			case "setup":
				await setup()
				break
			case "authInbox":
				await authInbox()
				break
			case "publicGlobalTopics":
				await publicGlobalTopics()
				break
			default:
				console.log("Unknown command")
				break
		}
		console.log("done")
	} catch (err) {
		console.error("Error occurred:", err)
	}
}

async function setup() {
	const { worker } = await startWorker({
		accountID: "co_zhvp7ryXJzDvQagX61F6RCZFJB9",
		accountSecret:
			"sealerSecret_z7o2TyWgbzin7Syoa4xUvoQc9ufyc3G2KWj6vfUsoE5en/signerSecret_z6ZnmVjPjqjFPtRcEiEVbPhuMcauvdE9hV7tVLUxRx1z5",
	})
	const globalLinksGroup = Group.create({ owner: worker })
	globalLinksGroup.addMember("everyone", "reader")

	// TODO: make it so it does not override
	await Bun.write(
		"./.env",
		`JAZZ_GLOBAL_GROUP=${JSON.stringify(globalLinksGroup.id)}`,
	)
}

// seeds / route (inbox of personal links, todos)
async function authInbox() {
	const { worker } = await startWorker({
		accountID: "co_zhvp7ryXJzDvQagX61F6RCZFJB9",
		accountSecret:
			"sealerSecret_z7o2TyWgbzin7Syoa4xUvoQc9ufyc3G2KWj6vfUsoE5en/signerSecret_z6ZnmVjPjqjFPtRcEiEVbPhuMcauvdE9hV7tVLUxRx1z5",
	})

	const user = (await (
		await LaAccount.createAs(worker, {
			creationProps: { name: "nikiv" },
		})
	).ensureLoaded({ root: { personalLinks: [], pages: [], todos: [] } }))!

	const globalLinksGroup = Group.create({ owner: worker })
	globalLinksGroup.addMember("everyone", "reader")

	const globalLink1 = GlobalLink.create(
		{ url: "https://google.com" },
		{ owner: globalLinksGroup },
	)
	const globalLink2 = GlobalLink.create(
		{ url: "https://jazz.tools" },
		{ owner: globalLinksGroup },
	)
	// TODO: make note: optional
	const personalLink1 = PersonalLink.create(
		{ globalLink: globalLink1, type: "personalLink", note: "" },
		{ owner: user },
	)
	const personalLink2 = PersonalLink.create(
		{ globalLink: globalLink2, type: "personalLink", note: "Great framework" },
		{ owner: user },
	)
	user.root.personalLinks.push(personalLink1)
	user.root.personalLinks.push(personalLink2)

	const page1 = Page.create(
		{ title: "Physics", content: "Physics is great" },
		{ owner: user },
	)
	const page2 = Page.create(
		{ title: "Karabiner", content: "Karabiner is great" },
		{ owner: user },
	)
	user.root.pages.push(page1)
	user.root.pages.push(page2)

	const credentials = {
		accountID: user.id,
		accountSecret: (user._raw as RawControlledAccount).agentSecret,
	}

	await Bun.write(
		"./web/.env",
		`VITE_SEED_ACCOUNTS='${JSON.stringify({
			nikiv: credentials,
		})}'`,
	)
	await Bun.write(
		"./.env",
		`VITE_SEED_ACCOUNTS='${JSON.stringify({
			nikiv: credentials,
		})}'`,
	)
}

// seeds global topics
async function publicGlobalTopics() {
	const { worker } = await startWorker({
		accountID: "co_zhvp7ryXJzDvQagX61F6RCZFJB9",
		accountSecret:
			"sealerSecret_z7o2TyWgbzin7Syoa4xUvoQc9ufyc3G2KWj6vfUsoE5en/signerSecret_z6ZnmVjPjqjFPtRcEiEVbPhuMcauvdE9hV7tVLUxRx1z5",
	})

	// console.log(process.env.JAZZ_GLOBAL_GROUP!, "group")
	const globalGroup = await Group.load(
		process.env.JAZZ_GLOBAL_GROUP!,
		worker,
		{},
	)
	// console.log(globalGroup, "group")
	// return

	const currentFilePath = import.meta.path
	const connectionsFilePath = `${currentFilePath.replace(
		"seed.ts",
		"/seed/connections.json",
	)}`
	const file = Bun.file(connectionsFilePath)
	const fileContent = await file.text()
	const topicsWithConnections = JSON.parse(fileContent)
	// let topicsWithConnections = JSON.stringify(obj, null, 2)
	console.log(topicsWithConnections)

	topicsWithConnections.map((topic) => {
		const globalTopic = GlobalTopic.create(
			{ name: topic.name, description: topic.description },
			{ owner: globalGroup },
		)
	})
}

await seed()
