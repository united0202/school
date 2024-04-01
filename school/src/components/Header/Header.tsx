import './Header.scss'

import React, { FC, useCallback } from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ColorModeContext } from "../../App";
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import { SIDEBAR_WIDTH } from "../../config";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import logo from '../../assets/logo.png'

interface IHeaderProps {
	onOpen: (isOpen: boolean) => void;
	isOpen: boolean;
}

export const Header: FC<IHeaderProps> = ({onOpen, isOpen}) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const colorMode = React.useContext(ColorModeContext);
	const user = useUser();

	const handleEdit = useCallback(() => {
		navigate('/pages');
	}, [])

	return (
		<Box  sx={{flexGrow: 1}} className="headerContainer" width={isOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%'}
		     marginLeft={isOpen ? `${SIDEBAR_WIDTH}px` : '0'}>
			<AppBar position="static">
				<Toolbar>
					{!isOpen && <IconButton
						onClick={() => {
							onOpen(true)
						}}
						color="inherit"
						aria-label="open drawer"
						edge="start"
					>
						<MenuIcon/>
					</IconButton>
					}
					<div className="headerMain">
						<div onClick={() => navigate('/')} className="logoWrapper">
							<img className="logo" src={logo} alt="logo"/>
							<Typography variant="h6" textAlign="left"
							            component="div"
							            sx={{flexGrow: 1, display: 'inline-block'}}>
								Чарівнянський ліцей
							</Typography>
						</div>
						<div>
							{user && <Button
								type="button"
								variant="contained"
								onClick={handleEdit}
							>
								Редагування
							</Button>}
							{/*<IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">*/}
							{/*	{theme.palette.mode === 'dark' ? <Brightness5OutlinedIcon/> : <Brightness4OutlinedIcon/>}*/}
							{/*</IconButton>*/}
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	)
}