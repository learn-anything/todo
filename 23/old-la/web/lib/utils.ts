export function checkIfUrl(str: string) {
	try {
		new URL(str)
		return true
	} catch (_) {
		return false
	}
}
