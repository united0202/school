import React, {FC, useState} from "react";
import {Editor} from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState} from "draft-js";

export const ContentEditor: FC = () => {
	const [state, setState] = useState(EditorState.createEmpty());

	const onContentStateChange = (contentState: EditorState) => {
		setState(contentState);
	};

	return <Editor
		editorState={state}
		toolbarClassName="toolbarClassName"
		wrapperClassName="wrapperClassName"
		editorClassName="editorClassName"
		onEditorStateChange={onContentStateChange}
		onContentStateChange={contentState => console.log(contentState)}
	/>;
}