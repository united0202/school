import { useCallback, useContext } from "react";
import { PagesContext } from "../context/PagesContext";
import { IPage } from "../types";

export const usePage = () => {
	const {pages} = useContext(PagesContext);

	const getPage = useCallback((id: string) => {
		const page = pages.find(page => page.id === id);

		if (page) {
			return page;
		}

		let subpage: IPage | undefined = undefined;

		pages.forEach(page => {
			if (page.subpages && page.subpages.length > 0) {
				const foundedPage = page.subpages.find(sub => sub.id === id);

				if (foundedPage) {
					subpage = foundedPage;
				}
			}
		})

		return subpage;
	}, [pages])


	return {
		getPage,
	}
}