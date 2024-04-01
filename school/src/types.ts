export type TPageType =
    'news' |
    'about' |
    'educational' |
    'classroom-teachers' |
    'educator-organizer' |
    'librarian' |
    'toChildren' |
    'rules' |
    'schedule-of-days' |
    'class-schedule' |
    'distance-learning' |
    'useful-links' |
    'for-teachers' |
    'assistants' |
    'quality-of-education' |
    'self-assessment' |
    'academic-integrity' |
    'transparency' |
    'annual-plan' |
    'psychologist';

export interface IPage {
	title: string;
	id: TPageType;
	subpages?: IPage[];
	order: number;
	content: string;
	isSubpage: boolean;
	image?: string;
}


