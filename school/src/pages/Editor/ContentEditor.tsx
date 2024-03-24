import React, {FC, Fragment, useCallback, useEffect, useState} from "react";
import {Editor} from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import draftToHtml from 'draftjs-to-html';

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
    const [contentState, setContentState] = useState<RawDraftContentState>({blocks: [], entityMap: {}});

    useEffect(() => {
        const initState = EditorState.createWithContent(
            convertFromRaw(JSON.parse(content))
        )
        setState(initState)

    }, []);

    const save = useCallback(() => {
        const res = JSON.stringify(convertToRaw(state.getCurrentContent()))
    }, [])

    const onContentStateChange = (contentState: EditorState) => {
        setState(contentState);
    };

    return <Fragment>
        <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorState={state}
            onEditorStateChange={onContentStateChange}
            onContentStateChange={setContentState}
        />
        <div dangerouslySetInnerHTML={{__html: draftToHtml(contentState)}}/>
    </Fragment>
}