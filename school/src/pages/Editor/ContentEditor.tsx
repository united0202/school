import './ContentEditor.scss'

import React, {FC, Fragment, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {Editor} from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {Button, Snackbar} from "@mui/material";
import {useParams} from "react-router-dom";
import {usePage} from "../../hooks/usePage";

export const ContentEditor: FC = () => {
    const {id} = useParams<{ id: string }>();
    const [state, setState] = useState<EditorState>(EditorState.createEmpty());
    const [open, setOpen] = useState(false);
    const {getPage, savePage} = usePage();

    const page = getPage(id ?? '');

    useEffect(() => {
        const initState = page && page.content ? EditorState.createWithContent(
            convertFromRaw(JSON.parse(page.content))
        ) : EditorState.createEmpty();

        setState(initState);
    }, [page]);

    // TODO add loading
    const save = useCallback(() => {
        const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
        savePage(id ?? '', content).finally(() => setOpen(true));
    }, [id, savePage, state])

    const onContentStateChange = (contentState: EditorState) => {
        setState(contentState);
    };

    const handleClose = useCallback((event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
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
        <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName editor"
            editorState={state}
            onEditorStateChange={onContentStateChange}
        />
        <Button
            type="button"
            variant="contained"
            onClick={save}
            sx={{mt: 2}}
            size="large"
        >
            Зберегти
        </Button>
    </Fragment>
}