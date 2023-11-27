import { styled } from "@mui/material/styles";
import PageTabs from "../PageTabs/pagetabs";
import FeedCard from "../FeedCard/feedcard";
import Box from "@mui/material/Box/Box";
import { randomString } from "../../Utils/utilities";

export default function Content() {
	const MainContent = styled("main")(({ theme }) => ({
		maxWidth: "728px",
	}));
	const articles = new Array(10).fill(
		<Box key={randomString()} sx={{ width: "96%", margin: "auto", paddingTop: "24px" }}>
			<FeedCard />
		</Box>
	);
	console.log("Articles: ", articles);
	return (
		<>
			<MainContent>
				<PageTabs />
				<Box sx={{ paddingTop: "24px" }}>{articles}</Box>
			</MainContent>
		</>
	);
}
