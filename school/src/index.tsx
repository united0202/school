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
import {RulesForChildren} from "./pages/RulesForChildren/RulesForChildren";
import {ScheduleOfDays} from "./pages/ScheduleOfDays/ScheduleOfDays";
import {ClassSchedule} from "./pages/ClassSchedule/ClassSchedule";
import {DistanceLearning} from "./pages/DistanceLearning/DistanceLearning";
import {UsefulLinks} from "./pages/UsefulLinks/UsefulLinks";
import {CharitableAssistance} from "./pages/CharitableAssistance/CharitableAssistance";
import {QualityOfEducation} from "./pages/QualityOfEducation/QualityOfEducation";
import {SelfAssessment} from "./pages/SelfAssessment/SelfAssessment";
import {AcademicIntegrity} from "./pages/AcademicIntegrity/AcademicIntegrity";
import {AnnualPlan} from "./pages/AnnualPlan/AnnualPlan";
import {Psychologist} from "./pages/Psychologist/Psychologist";
import {AuthProvider} from "./context/AuthContext";
import {ContentEditor} from "./pages/Editor/ContentEditor";
import {Pages} from "./pages/Pages/Pages";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		children: [
			{
				path: '/editor',
				element: <ContentEditor/>,
			},
			{
				path: '/pages',
				element: <Pages/>,
			},
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
			},
			{
				path: '/rules',
				element: <RulesForChildren/>
			},
			{
				path: '/schedule-of-days',
				element: <ScheduleOfDays/>
			},
			{
				path: '/class-schedule',
				element: <ClassSchedule/>
			},
			{
				path: '/distance-learning',
				element: <DistanceLearning/>
			},
			{
				path: '/useful-links',
				element: <UsefulLinks/>
			},
			{
				path: '/for-teachers',
				element: <UsefulLinks/>
			},
			{
				path: '/assistants',
				element: <CharitableAssistance/>
			},
			{
				path: '/quality-of-education',
				element: <QualityOfEducation/>
			},
			{
				path: '/self-assessment',
				element: <SelfAssessment/>
			},
			{
				path: '/academic-integrity',
				element: <AcademicIntegrity/>
			},
			{
				path: '/transparency',
				element: <AcademicIntegrity/>
			},
			{
				path: '/annual-plan',
				element: <AnnualPlan/>
			},
			{
				path: '/psychologist',
				element: <Psychologist/>
			}
		]
	},
]);

root.render(
	<AuthProvider>
		<RouterProvider router={router}/>
	</AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
