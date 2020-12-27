import PageWrapper from "./PageWrapper";

export default function Main({children}) {
	return (
		<main className="flex-1">
			<PageWrapper>
				{children}
			</PageWrapper>
		</main>
	)
}