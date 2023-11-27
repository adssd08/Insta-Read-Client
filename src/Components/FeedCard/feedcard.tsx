import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import image from "../../Assets/signup-image.png";
import Chip from "@mui/material/Chip/Chip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { styled } from "@mui/material/styles";

export default function FeedCard() {
	const ArticleCard = styled("article")(({ theme }) => ({
		borderBottom: "solid 1px #F2F2F2",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		gap: "16px",
		width: "100%",
	}));

	const CardImage = styled("img")(({ theme }) => ({
		width: "120px",
		height: "120px",
	}));

	return (
		<ArticleCard>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<IconButton size="small" sx={{ ml: 2, marginLeft: 0 }}>
					<Avatar sx={{ width: 24, height: 24 }}>M</Avatar>
				</IconButton>
				<Box sx={{ display: "flex" }}>
					<Typography variant="body2">User Name</Typography>
					<Typography variant="body2">.Date</Typography>
				</Box>
			</Box>
			<Box sx={{ display: "flex" }}>
				<Box>
					<Typography sx={{ paddingBottom: "8px" }} variant="h5">
						Article Heading
					</Typography>
					<Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id sunt velit non dolorem architecto omnis corporis totam dolorum impedit! Unde pariatur voluptatem aperiam omnis id saepe, neque iste distinctio mollitia!</Typography>
					<Box sx={{ display: "flex", justifyContent: "space-between", padding: "32px 0" }}>
						<Box>
							<Chip label="Article Category" />
							<Typography sx={{ marginLeft: "8px" }} variant="caption">
								read time
							</Typography>
						</Box>
						<Box>
							<IconButton size="small" sx={{ ml: 2 }}>
								<BookmarkAddOutlinedIcon />
							</IconButton>
							<IconButton size="small" sx={{ ml: 2 }}>
								<RemoveCircleOutlineOutlinedIcon />
							</IconButton>
							<IconButton size="small" sx={{ ml: 2 }}>
								<MoreHorizIcon />
							</IconButton>
						</Box>
					</Box>
				</Box>
				<Box sx={{ paddingLeft: "32px" }}>
					<CardImage src={image} />
				</Box>
			</Box>
		</ArticleCard>
	);
}
