import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {News} from "./pages/News/News";
import {InfoAboutSchool} from "./pages/InfoAboutSchool/InfoAboutSchool";
import {ClassroomTeachers} from "./pages/СlassroomTeachers/СlassroomTeachers";
import {EducatorOrganizer} from "./pages/EducatorOrganizer/EducatorOrganizer";
import {Librarian} from "./pages/Librarian/Librarian";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		children: [
			{
				path: '/home',
				element: <Home/>
			},
			{
				path: '/news',
				element: <News/>
			},
			{
				path: '/about',
				element: <InfoAboutSchool/>
			},
			{
				path: '/classroom-teachers',
				element: <ClassroomTeachers/>
			},
			{
				path: '/educator-organizer',
				element: <EducatorOrganizer/>
			},
			{
				path: '/librarian',
				element: <Librarian/>
			}
		]
	},
]);

root.render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
