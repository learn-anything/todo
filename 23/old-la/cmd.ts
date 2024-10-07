import { $ } from "bun"
import { LaAccount } from "@/web/src/schema"
import { startWorker } from "jazz-nodejs"

// TODO: make more robust
const seedAccounts = JSON.parse(process.env.SEED_ACCOUNTS!)

async function main() {
	const args = Bun.argv
	const command = args[2]
	try {
		switch (command) {
			case "setup":
				await setup()
				break
			case "jazz-state":
				await getJazzState()
				break
		}
	} catch (err) {
		console.error("Error:", err)
	}
}

// TODO: make `bun setup` setup everything (jazz, seed, auth etc.)
// so readme is just `bun i`, `bun setup`, `bun dev` (and open localhost and start developing)
async function setup() {
	await $`git clone https://github.com/learn-anything/seed cli/seed`
}

// gets state for Jazz user
async function getJazzState() {
	const me = await (
		await startWorker({
			accountID: seedAccounts.nikiv.accountID,
			accountSecret: seedAccounts.nikiv.accountSecret,
			accountSchema: LaAccount,
		})
	).worker.ensureLoaded({
		root: {
			personalLinks: [{}],
			pages: [{}],
			todos: [{}],
		},
	})

	if (!me) return
	console.log(me.root.toJSON())
}

await main()
