import './Sidebar.scss';

import React, {FC, useCallback, useState} from "react";
import {
	Collapse,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import {SIDEBAR_WIDTH} from "../../config";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import DoorbellOutlinedIcon from '@mui/icons-material/DoorbellOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import CameraFrontOutlinedIcon from '@mui/icons-material/CameraFrontOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined';
import {useNavigate} from "react-router-dom";

interface ISidebarProps {
	isOpen: boolean;
	onOpen: (isOpen: boolean) => void;
}

type TCollapseType = 'educational' | 'toChildren';

export const Sidebar: FC<ISidebarProps> = ({isOpen, onOpen}) => {
	const [collapse, setCollapse] = useState<TCollapseType | null>(null);
	const navigate = useNavigate();

	const handleCollapse = useCallback((type: TCollapseType) => {
		if (type === collapse) {
			setCollapse(null);
			return;
		}

		setCollapse(type);
	}, [collapse]);

	const handleNavigate = useCallback((path: string) => {
		navigate(path);
	}, []);


	return <Drawer
		sx={{
			width: SIDEBAR_WIDTH,
			flexShrink: 0,
			'& .MuiDrawer-paper': {
				width: SIDEBAR_WIDTH,
				boxSizing: 'border-box',
			},
		}}
		variant="persistent"
		anchor="left"
		open={isOpen}
	>
		<div>
			<div className="sidebar-header">
				<Typography component="div" variant="h5">
					Головне меню:
				</Typography>
				<IconButton onClick={() => onOpen(false)}>
					<ArrowBackIosOutlinedIcon/>
				</IconButton>
			</div>
			<Divider/>
			<List component="nav" sx={{width: '100%', padding: 0}} aria-labelledby="nested-list-subheader">

				<ListItemButton onClick={() => handleNavigate('/news')}>
					<ListItemIcon>
						<FeedOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Hoвини"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={() => handleNavigate('/about')}>
					<ListItemIcon>
						<DnsOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Інформація про заклад"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={() => handleCollapse('educational')}>
					<ListItemIcon>
						<SchoolOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Виховна робота"/>
					{collapse === 'educational' ? <ExpandLess/> : <ExpandMore/>}
				</ListItemButton>
				<Collapse in={collapse === 'educational'} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{pl: 4}} onClick={() => handleNavigate('/classroom-teachers')}>
							<ListItemIcon>
								<Diversity3OutlinedIcon/>
							</ListItemIcon>
							<ListItemText primary="Класні керівники"/>
						</ListItemButton>
						<ListItemButton sx={{pl: 4}} onClick={() => handleNavigate('/educator-organizer')}>
							<ListItemIcon>
								<PeopleAltOutlinedIcon/>
							</ListItemIcon>
							<ListItemText primary="Педагог організатор"/>
						</ListItemButton>
						<ListItemButton sx={{pl: 4}} onClick={() => handleNavigate('/librarian')}>
							<ListItemIcon>
								<AccessibilityOutlinedIcon/>
							</ListItemIcon>
							<ListItemText primary="Бібліотекар"/>
						</ListItemButton>
					</List>
				</Collapse>
				<Divider/>

				<ListItemButton onClick={() => handleCollapse('toChildren')}>
					<ListItemIcon>
						<FamilyRestroomOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Учням"/>
					{collapse === 'toChildren' ? <ExpandLess/> : <ExpandMore/>}
				</ListItemButton>
				<Collapse in={collapse === 'toChildren'} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{pl: 4}} onClick={()=> handleNavigate('/rules')}>
							<ListItemIcon>
								<DensitySmallOutlinedIcon/>
							</ListItemIcon>
							<ListItemText primary="Правила для учнів"/>
						</ListItemButton>
						<ListItemButton sx={{pl: 4}} onClick={()=> handleNavigate('/schedule-of-days')}>
							<ListItemIcon>
								<DoorbellOutlinedIcon/>
							</ListItemIcon>
							<ListItemText primary="Розклад двінків"/>
						</ListItemButton>
						<ListItemButton sx={{pl: 4}} onClick={()=> handleNavigate('/class-schedule')}>
							<ListItemIcon>
								<CalendarMonthOutlinedIcon/>
							</ListItemIcon>
							<ListItemText primary="Розклад уроків"/>
						</ListItemButton>
						<ListItemButton sx={{pl: 4}} onClick={()=> handleNavigate('/distance-learning')}>
							<ListItemIcon>
								<CastForEducationOutlinedIcon/>
							</ListItemIcon>
							<ListItemText primary="Дистанційне навчання"/>
						</ListItemButton>
					</List>
				</Collapse>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/useful-links')}>
					<ListItemIcon>
						<AddLinkOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Корисні посилання"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/for-teachers')}>
					<ListItemIcon>
						<AutoStoriesOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Вчителям"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/assistants')}>
					<ListItemIcon>
						<HelpCenterOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Благодійна допомога"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/quality-of-education')}>
					<ListItemIcon>
						<SettingsSystemDaydreamOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Внутрішня система забезпечення якості освіти"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/self-assessment')}>
					<ListItemIcon>
						<CameraFrontOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Самооцінювання"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/academic-integrity')}>
					<ListItemIcon>
						<AnnouncementOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Положення про академічну доброчесність"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/transparency')}>
					<ListItemIcon>
						<EditCalendarOutlinedIcon/>
					</ListItemIcon>
					<ListItemText
						primary="Забезпечення прозорості та інмормаційної відкритості діяльності закладу освіти"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/annual-plan')}>
					<ListItemIcon>
						<TodayOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Річний план"/>
				</ListItemButton>
				<Divider/>

				<ListItemButton onClick={()=> handleNavigate('/psychologist')}>
					<ListItemIcon>
						<BoyOutlinedIcon/>
					</ListItemIcon>
					<ListItemText primary="Сторінка проектного психолога"/>
				</ListItemButton>
				<Divider/>
			</List>
		</div>
	</Drawer>
}