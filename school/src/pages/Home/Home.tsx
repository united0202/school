import React, { FC } from "react";
import { usePage } from "../../hooks/usePage";
import draftToHtml from "draftjs-to-html";
import { Card, CardMedia} from "@mui/material";

export const Home: FC = () => {
	const {getPage} = usePage();
	const page = getPage('home');

	if (!page || !page.content) {
		return null;
	}

	return <Card sx={{p: 2, mb: 5}}>
		{page.image  && <CardMedia
			style={{maxHeight: 500, borderRadius: '10px'}}
			component="img"
			alt={page.title}
			image={page.image}
		/>}
		<div dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(page.content))}}/>
	</Card>
}