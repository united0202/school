import './ContentEditor.scss'

import React, {FC, Fragment, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {Editor} from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import draftToHtml from 'draftjs-to-html';
import {Button, IconButton, Snackbar} from "@mui/material";

const content = JSON.stringify({
    "entityMap": {},
    "blocks": [{
        "key": "637gr",
        "text": "Initialized from content state.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }]
});

export const ContentEditor: FC = () => {
    const [state, setState] = useState<EditorState>(EditorState.createEmpty());
    const [open, setOpen] = useState(false);
    const [contentState, setContentState] = useState<RawDraftContentState>({blocks: [], entityMap: {}});

    useEffect(() => {
        const initState = EditorState.createWithContent(
            convertFromRaw(JSON.parse(content))
        )
        setState(initState)
    }, []);

    const save = useCallback(() => {
        const res = JSON.stringify(convertToRaw(state.getCurrentContent()));
        setOpen(true);
    }, [])

    const onContentStateChange = (contentState: EditorState) => {
        setState(contentState);
    };

    const handleClose = useCallback((event: SyntheticEvent | Event, reason?: string)=> {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }, [])

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
            onContentStateChange={setContentState}
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
        <div dangerouslySetInnerHTML={{__html: draftToHtml(contentState)}}/>
    </Fragment>
}