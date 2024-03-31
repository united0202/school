import {FC} from "react";
import {usePage} from "../../hooks/usePage";
import {RawDraftContentState} from "draft-js";
import draftToHtml from "draftjs-to-html";

export const Home: FC = () => {
	const {getPage} = usePage();
	const page = getPage('home');

	if (!page || !page.content) {
		return null;
	}

	const content: RawDraftContentState = JSON.parse(page.content);

	return <div dangerouslySetInnerHTML={{__html: draftToHtml(content)}}/>
}