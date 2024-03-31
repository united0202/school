import {db} from "../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import {useEffect, useState} from "react";
import {TPageType} from "../types";

interface IPage {
    title: string;
    id: TPageType;
    subpages?: IPage[];
    order: number;
    content: string;
    isSubpage: boolean;
}

export const usePages = () => {
    const [pages, setPages] = useState<IPage[]>([])

    useEffect(() => {
        getPages();
    }, [])

    const pagesCollection = collection(db, "pages");
    const getPages = async (): Promise<void> => {
        const pages: IPage[] = [];
        const pageDocs = await getDocs(pagesCollection);
        pageDocs.docs.map(document => {
            const subpagesCollection = collection(db, `pages/${document.id}/pages`);
            const subpagesPromise = getDocs(subpagesCollection);
            subpagesPromise.then(subpagesDoc => {
                const subpages: IPage[] = [];

                if (subpagesDoc.docs.length > 0) {
                    subpagesDoc.docs.map(sub => {
                        const data = sub.data();
                        subpages.push({
                            title: data.title,
                            id: sub.id as TPageType,
                            order: data.order,
                            content: data.content,
                            isSubpage: true,
                        })
                    })
                }

                const data = document.data();

                pages.push({
                    title: data.title,
                    id: document.id as TPageType,
                    subpages: subpages.sort((a, b) => a.order - b.order),
                    order: data.order,
                    content: data.content,
                    isSubpage: false,
                })
            }).finally(() => {
                const sorted = pages.sort((a, b) => a.order - b.order);
                setPages(sorted);
            })
        })
    }

    return {
        pages
    }
}