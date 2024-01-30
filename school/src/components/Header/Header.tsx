import {FC} from "react";
import './Header.scss'
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";

export const Header: FC = () => {
	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" textAlign="left" component="div" sx={{flexGrow: 1}}>
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)

}