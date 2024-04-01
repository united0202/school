import { createContext, FC, ReactNode, useCallback, useEffect, useState } from "react";
import { IPage } from "../types";
import { usePages } from "../hooks/usePages";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

interface Props {
	children?: ReactNode
}

interface IContent {
	content?: string;
	image?: string;
	title?: string
}

export const PagesContext = createContext({
	pages: [] as IPage[],
	updateContent: (id: string, data: IContent): Promise<void> => {
		return new Promise(resolve => {
		})
	},
});

export const PagesProvider: FC<Props> = ({children}) => {
	const [pages, setPages] = useState<IPage[]>([]);
	const currentPages = usePages();

	useEffect(() => {
		setPages(currentPages);
	}, [currentPages]);

	const save = useCallback((id: string, data: IContent): Promise<void> => {
		const document = doc(db, 'pages', id);
		const newFields: { content?: string, image?: string, title?: string } = {};

		if (data.content) {
			newFields.content = data.content;
		}

		if (data.image !== undefined) {
			newFields.image = data.image;
		}

		if (data.title) {
			newFields.title = data.title;
		}
		return updateDoc(document, newFields);
	}, []);

	const saveSubpage = useCallback((parentId: string, childId: string, data: IContent): Promise<void> => {
		const document = doc(db, `pages/${parentId}/pages`, childId);
		const newFields: { content?: string, image?: string, title?: string } = {};

		if (data.content) {
			newFields.content = data.content;
		}

		if (data.image !== undefined) {
			newFields.image = data.image;
		}

		if (data.title) {
			newFields.title = data.title;
		}
		return updateDoc(document, newFields);
	}, []);

	const updateContent = useCallback((id: string, data: IContent): Promise<void> => {
		const newPages = pages.slice();
		const pageIndex = newPages.findIndex(page => page.id === id);
		let subPage: { parentIndex: number, childIndex: number } = {childIndex: -1, parentIndex: -1};

		if (pageIndex !== -1) {
			if (data.content) {
				newPages[pageIndex].content = data.content;
			}

			if (data.image !== undefined) {
				newPages[pageIndex].image = data.image;
			}

			if (data.title) {
				newPages[pageIndex].title = data.title;
			}

			setPages(newPages);
			return save(id, data);
		}

		newPages.forEach((page, index) => {
			if (page.subpages && page.subpages.length > 0) {
				const childIndex = page.subpages.findIndex(sub => sub.id === id);

				if (childIndex !== -1) {
					subPage = {
						parentIndex: index,
						childIndex: childIndex,
					}
				}
			}
		})

		if (subPage.childIndex !== -1 && subPage.parentIndex !== -1) {
			if (data.content) {
				newPages[subPage.parentIndex].subpages![subPage.childIndex].content = data.content;
			}

			if (data.image) {
				newPages[subPage.parentIndex].subpages![subPage.childIndex].image = data.image;
			}

			if (data.title) {
				newPages[subPage.parentIndex].subpages![subPage.childIndex].title = data.title;
			}

			const parentId = newPages[subPage.parentIndex].id;
			const childId = newPages[subPage.parentIndex].subpages![subPage.childIndex].id;
			setPages(newPages);
			return saveSubpage(parentId, childId, data);
		}

		return new Promise<void>((resolve, reject) => {
			resolve();
			reject('updateContent error');
		})

	}, [pages, save, saveSubpage]);


	const value = {pages, updateContent}

	return <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
}