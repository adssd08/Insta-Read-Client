import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import { ReactComponent as Write } from "../../Assets/Write.svg";
import Searchbar from "../SearchBar/searchbar";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountMenu from "../AccountMenu/accountmenu";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography/Typography";
import IconButton from "@mui/material/IconButton/IconButton";
function Header() {
	return (
		<Box sx={{ display: "flex", padding: "1rem", justifyContent: "space-between", borderBottom: "solid 1px #F2F2F2" }}>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
				<Logo />
				<Searchbar />
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
				<Box sx={{ cursor: "pointer", display: "flex", gap: "4px" }}>
					<Write />
					<Typography variant="body1">Write</Typography>
				</Box>
				<IconButton>
					<NotificationsOutlinedIcon />
				</IconButton>
				<AccountMenu />
			</Box>
		</Box>
	);
}

export default Header;
