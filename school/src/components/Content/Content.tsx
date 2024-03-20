import './Content.scss'

import {FC} from "react";
import {Box, Container} from "@mui/material";
import {SIDEBAR_WIDTH} from "../../config";
import {Outlet} from "react-router-dom";

interface IContentProps {
	isOpen: boolean;
}

export const Content: FC<IContentProps> = ({isOpen}) => {

	return <Container maxWidth="xl" className="container">
		<Box sx={{flexGrow: 1}} className="header" width={isOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%'}
			 marginLeft={isOpen ? `${SIDEBAR_WIDTH}px` : '0'}>
			<Outlet />
		</Box>
	</Container>
}