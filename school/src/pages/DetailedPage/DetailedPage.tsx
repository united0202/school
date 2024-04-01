import React, { FC } from "react";
import { useParams } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import { usePage } from "../../hooks/usePage";
import { Card, CardMedia, Typography } from "@mui/material";

export const DetailedPage: FC = () => {
	const {id} = useParams<{ id: string }>();
	const {getPage} = usePage();
	const page = getPage(id ?? '');

	if (!page || !page.content) {
		return null;
	}

	return <Card sx={{p: 2, mb: 5}}>
		<Typography sx={{mb: 2}} textAlign="center" variant="h3">{page.title}</Typography>
		{page.image && <CardMedia
			style={{maxHeight: 500, borderRadius: '10px'}}
			component="img"
			alt={page.title}
			image={page.image}
		/>}
		<div dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(page.content))}}/>
	</Card>
}