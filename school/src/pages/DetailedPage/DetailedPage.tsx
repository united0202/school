import {FC} from "react";
import {useParams} from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import {usePage} from "../../hooks/usePage";
import { RawDraftContentState} from "draft-js";

export const DetailedPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const {getPage} = usePage();
    const page = getPage(id ?? '');

    if (!page || !page.content) {
        return null;
    }

    const content: RawDraftContentState = JSON.parse(page.content);

    return <div dangerouslySetInnerHTML={{__html: draftToHtml(content)}}/>
}