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

	const getPages = (): void => {
		const pages: IPage[] = [];
		const pageDocs = getDocs(pagesCollection);

		pageDocs.then(docs => {
			docs.docs.forEach(document => {
				const data = document.data();

				if (data.haveSubpages) {
					const subpagesCollection = collection(db, `pages/${document.id}/pages`);
					const subpagesDocuments = getDocs(subpagesCollection);

					subpagesDocuments.then(subpageDocs => {
						const subpages: IPage[] = [];
						subpageDocs.docs.forEach(sub => {
							const subdata = sub.data();
							subpages.push({
								title: subdata.title,
								id: sub.id as TPageType,
								order: subdata.order,
								content: subdata.content,
								isSubpage: true,
								image: subdata.image
							})
						})

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
				} else {
					pages.push({
						title: data.title,
						id: document.id as TPageType,
						subpages: [],
						order: data.order,
						content: data.content,
						isSubpage: false,
						image: data.image
					})
				}
			})
		}).finally(() => {
			const sorted = pages.sort((a, b) => a.order - b.order);
			setPages(sorted);
		})
	}

	return pages;
}

// const getPages = async (): Promise<void> => {
// 	console.log('getPages');
// 	const pages: IPage[] = [];
// 	const pageDocs = await getDocs(pagesCollection);
// 	pageDocs.docs.forEach(document => {
// 		const subpagesCollection = collection(db, `pages/${document.id}/pages`);
// 		const subpagesPromise = getDocs(subpagesCollection);
// 		subpagesPromise.then(subpagesDoc => {
// 			const subpages: IPage[] = [];
// 			if (subpagesDoc.docs.length > 0) {
// 				subpagesDoc.docs.forEach(sub => {
// 					const data = sub.data();
// 					subpages.push({
// 						title: data.title,
// 						id: sub.id as TPageType,
// 						order: data.order,
// 						content: data.content,
// 						isSubpage: true,
// 						image: data.image
// 					})
// 				})
// 			}
//
// 			const data = document.data();
//
// 			pages.push({
// 				title: data.title,
// 				id: document.id as TPageType,
// 				subpages: subpages.sort((a, b) => a.order - b.order),
// 				order: data.order,
// 				content: data.content,
// 				isSubpage: false,
// 				image: data.image
// 			})
// 		})
// 			.catch(reason => console.log('error get pages ', reason))
// 			.finally(() => {
// 				console.log('finally');
// 				const sorted = pages.sort((a, b) => a.order - b.order);
// 				setPages(sorted);
// 			})
// 	})
// }