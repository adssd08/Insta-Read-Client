import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

function samePageLinkNavigation(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
	if (
		event.defaultPrevented ||
		event.button !== 0 || // ignore everything but left-click
		event.metaKey ||
		event.ctrlKey ||
		event.altKey ||
		event.shiftKey
	) {
		return false;
	}
	return true;
}

interface LinkTabProps {
	label?: string;
	href?: string;
}

function LinkTab(props: LinkTabProps) {
	return (
		<Tab
			component="a"
			onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
				// Routing libraries handle this, you can remove the onClick handle when using them.
				if (samePageLinkNavigation(event)) {
					event.preventDefault();
				}
			}}
			{...props}
		/>
	);
}

export default function PageTabs() {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		if (event.type !== "click" || (event.type === "click" && samePageLinkNavigation(event as React.MouseEvent<HTMLAnchorElement, MouseEvent>))) {
			setValue(newValue);
		}
	};

	return (
		<Box sx={{ width: "100%", paddingTop: "24px", position: "sticky", top: "0", backgroundColor: "white", zIndex: "1" }}>
			<Tabs sx={{ borderBottom: "solid 1px #F2F2F2" }} value={value} onChange={handleChange} variant="scrollable" scrollButtons allowScrollButtonsMobile aria-label="nav tabs example">
				<LinkTab label="Page One" href="/drafts" />
				<LinkTab label="Page Two" href="/trash" />
				<LinkTab label="Page Three" href="/spam" />
			</Tabs>
		</Box>
	);
}
