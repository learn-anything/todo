import { useState, useEffect } from "react"

export function useMedia(query: string): boolean {
	const [matches, setMatches] = useState<boolean>(false)

	useEffect(() => {
		if (window.matchMedia) {
			const media = window.matchMedia(query)
			if (media.matches !== matches) {
				setMatches(media.matches)
			}
			const listener = () => {
				setMatches(media.matches)
			}
			media.addListener(listener)
			return () => media.removeListener(listener)
		}

		return undefined
	}, [matches, query])

	return matches
}