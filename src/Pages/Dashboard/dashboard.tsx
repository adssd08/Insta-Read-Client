import Box from "@mui/material/Box/Box";
import Header from "../../Components/Header/header";
import Content from "../../Components/Content/content";
import SideNav from "../../Components/SideNav/sidenav";

export default function Dashboard() {
	return (
		<>
			<Header />
			<Box sx={{ maxWidth: "1336px", margin: "auto" }}>
				<Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
					<Content />
					<SideNav />
				</Box>
			</Box>
		</>
	);
}
