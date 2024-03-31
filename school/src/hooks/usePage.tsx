import {usePages} from "./usePages";
import {
    updateDoc,
    doc,
} from "firebase/firestore";
import {db} from "../firebase-config";

export const usePage = () => {
    const {pages} = usePages();

    const getPage = (id: string) => {
        return pages.find(mainPage => {
            const isExists = mainPage.id === id;

            if (isExists) {
                return mainPage;
            }

            if (mainPage.subpages && mainPage.subpages.length > 0) {
                const subPage = mainPage.subpages.find(sub => sub.id === id);

                if (subPage) {
                    return subPage;
                }
            }
        });
    }

    const savePage = (id: string, content: string): Promise<void> => {
        const document = doc(db, 'pages', id);
        const newFields = {content};
        return updateDoc(document, newFields);
    }

    return {
        getPage,
        savePage
    }
}