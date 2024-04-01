import './ContentEditor.scss'

import React, { ChangeEvent, FC, Fragment, SyntheticEvent, useCallback, useContext, useEffect, useState } from "react";
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Button, Card, Divider, Grid, Input, Snackbar, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePage } from "../../hooks/usePage";
import { PagesContext } from "../../context/PagesContext";
import { storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const ContentEditor: FC = () => {
	const {id} = useParams<{ id: string }>();
	const [state, setState] = useState<EditorState>(EditorState.createEmpty());
	const [open, setOpen] = useState(false);
	const {getPage} = usePage();
	const {updateContent} = useContext(PagesContext);
	const page = getPage(id ?? '');

	const [title, setTitle] = useState(page?.title ?? '');
	const [image, setImage] = useState<string>(page?.image ?? '');


	useEffect(() => {
		const initState = page && page.content ? EditorState.createWithContent(
			convertFromRaw(JSON.parse(page.content))
		) : EditorState.createEmpty();

		setState(initState);
	}, [page]);

	const save = useCallback(() => {
		const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
		const data = {
			content,
			image,
			title,
		}
		updateContent(id ?? '', data).finally(() => setOpen(true));
	}, [id, image, state, title, updateContent])

	const onContentStateChange = (contentState: EditorState) => {
		setState(contentState);
	};

	const handleClose = useCallback((event: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	}, [])

	const handleTitleChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files.item(0);

			if (file) {
				file.stream()
					.getReader()
					.read()
					.then(bytes => {
						if (bytes.value) {
							const storageRef = ref(storage, file.name);
							uploadBytes(storageRef, bytes.value)
								.then((snapshot) => {
									getDownloadURL(storageRef)
										.then(url => {
											setImage(url)
										})
								});
						}
					})
			}

		}
	};

	const handleDeleteImage = useCallback(() => {
		setImage('');
	}, [])

	if (!page) {
		return null;
	}

	return <Fragment>
		<Snackbar
			open={open}
			autoHideDuration={2000}
			onClose={handleClose}
			message="УСПІШНО ЗБЕРЕЖЕНО"
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
		/>
		<Grid container spacing={2}>

			<Grid item xs={6}>
				<Card sx={{p: 2, mb: 5}}>
					<Typography sx={{mb: 2}} textAlign="center" variant="h5">Вибрати медіа файл:</Typography>
					<div className="row">
						<Input sx={{mb: 2}} color="primary" type='file' onChange={handleFileChange} title="Обрати"/>
						<Button
							disabled={!image}
							type="button"
							variant="contained"
							onClick={handleDeleteImage}
							size="small"
						>
							Видалити
						</Button>
					</div>
					{image && <div className="preview">
						<img style={{width: 150, height: 150, textAlign: 'center'}} src={image} alt="something"/>
					</div>}
				</Card>
			</Grid>
			<Grid item xs={6}>
				<Card sx={{p: 2, mb: 5}}>
					<Typography sx={{mb: 2}} textAlign="center" variant="h5">Назва сторінки:</Typography>
					<TextField
						onChange={handleTitleChanged}
						value={title}
						autoComplete={title}
						fullWidth id="outlined-basic"
						label="Назва"
						variant="outlined"
					/>
				</Card>
			</Grid>
			<Button
				fullWidth
				type="button"
				variant="contained"
				onClick={save}
				sx={{mt: 2}}
				size="large"
			>
				Зберегти
			</Button>
		</Grid>

		<Card sx={{p: 2}}>
			<Typography sx={{mb: 2}} textAlign="center" variant="h5">Редактор:</Typography>
			<Divider/>
			<Editor
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName editor"
				editorState={state}
				onEditorStateChange={onContentStateChange}
			/>
		</Card>
	</Fragment>
}