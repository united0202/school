import { db } from "../firebase-config";
import {
	collection,
	getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { IPage, TPageType } from "../types";

export const usePages = () => {
	const [pages, setPages] = useState<IPage[]>([]);
	const pagesCollection = collection(db, "pages");

	useEffect(() => {
		getPages();
	}, []);

	const getPages = async (): Promise<void> => {
		const pages: IPage[] = [];
		const pageDocs = await getDocs(pagesCollection);
		pageDocs.docs.forEach(document => {
			const subpagesCollection = collection(db, `pages/${document.id}/pages`);
			const subpagesPromise = getDocs(subpagesCollection);
			subpagesPromise.then(subpagesDoc => {
				const subpages: IPage[] = [];
				if (subpagesDoc.docs.length > 0) {
					subpagesDoc.docs.forEach(sub => {
						const data = sub.data();
						subpages.push({
							title: data.title,
							id: sub.id as TPageType,
							order: data.order,
							content: data.content,
							isSubpage: true,
							image: data.image
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
					image: data.image
				})
			})
				.catch(reason => console.log('error get pages ', reason))
				.finally(() => {
					const sorted = pages.sort((a, b) => a.order - b.order);
					setPages(sorted);
				})
		})
	}

	return pages;
}


// export const usePages = () => {
// 	const [pages, setPages] = useState<IPage[]>([]);
// 	const pagesCollection = collection(db, "pages");
//
// 	useEffect(() => {
// 		getPages();
// 	}, []);
//
// 	const getPages = async (): Promise<void> => {
// 		const pages: IPage[] = [];
// 		const pageDocs = await getDocs(pagesCollection);
// 		pageDocs.docs.forEach(document => {
// 			const subpagesCollection = collection(db, `pages/${document.id}/pages`);
// 			const subpagesPromise = getDocs(subpagesCollection);
// 			subpagesPromise.then(subpagesDoc => {
// 				const subpages: IPage[] = [];
// 				if (subpagesDoc.docs.length > 0) {
// 					subpagesDoc.docs.forEach(sub => {
// 						const data = sub.data();
// 						subpages.push({
// 							title: data.title,
// 							id: sub.id as TPageType,
// 							order: data.order,
// 							content: data.content,
// 							isSubpage: true,
// 						})
// 					})
// 				}
//
// 				const data = document.data();
//
// 				pages.push({
// 					title: data.title,
// 					id: document.id as TPageType,
// 					subpages: subpages.sort((a, b) => a.order - b.order),
// 					order: data.order,
// 					content: data.content,
// 					isSubpage: false,
// 				})
// 			})
// 				.catch(reason => console.log('error get pages ', reason))
// 				.finally(() => {
// 					const sorted = pages.sort((a, b) => a.order - b.order);
// 					setPages(sorted);
// 				})
// 		})
// 	}
//
// 	return pages;
// }