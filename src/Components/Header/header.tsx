import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import { ReactComponent as Write } from "../../Assets/Write.svg";
import "./header.scss";
import Searchbar from "../SearchBar/searchbar";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountMenu from "../AccountMenu/accountmenu";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography/Typography";
function Header() {
	return (
		<Box className="header">
			<Box className="search-container">
				<Logo />
				<Searchbar />
			</Box>
			<Box className="profile-container">
				<Box className="write-icon-container">
					<Write />
					<Typography variant="body1">Write</Typography>
				</Box>
				<NotificationsOutlinedIcon />
				<AccountMenu />
			</Box>
		</Box>
	);
}

export default Header;
