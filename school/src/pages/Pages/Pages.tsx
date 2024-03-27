import React, {FC, Fragment} from "react";
import {Button, Collapse, Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {usePages} from "../../hooks/usePages";
import {TPageType} from "../../types";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccessibilityOutlinedIcon from "@mui/icons-material/AccessibilityOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import DensitySmallOutlinedIcon from "@mui/icons-material/DensitySmallOutlined";
import DoorbellOutlinedIcon from "@mui/icons-material/DoorbellOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import CameraFrontOutlinedIcon from "@mui/icons-material/CameraFrontOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import BoyOutlinedIcon from "@mui/icons-material/BoyOutlined";
import {useNavigate} from "react-router-dom";

export const Pages: FC = () => {
	const {pages} = usePages();
	const navigate = useNavigate();

	const IconsMap: Record<TPageType, any> = {
		news: <FeedOutlinedIcon/>,
		about: <DnsOutlinedIcon/>,
		educational: <SchoolOutlinedIcon/>,
		"classroom-teachers": <Diversity3OutlinedIcon/>,
		"educator-organizer": <PeopleAltOutlinedIcon/>,
		librarian: <AccessibilityOutlinedIcon/>,
		toChildren: <FamilyRestroomOutlinedIcon/>,
		rules: <DensitySmallOutlinedIcon/>,
		"schedule-of-days": <DoorbellOutlinedIcon/>,
		"class-schedule": <CalendarMonthOutlinedIcon/>,
		"distance-learning": <CastForEducationOutlinedIcon/>,
		"useful-links": <AddLinkOutlinedIcon/>,
		"for-teachers": <AutoStoriesOutlinedIcon/>,
		assistants: <HelpCenterOutlinedIcon/>,
		"quality-of-education": <SettingsSystemDaydreamOutlinedIcon/>,
		"self-assessment": <CameraFrontOutlinedIcon/>,
		"academic-integrity": <AnnouncementOutlinedIcon/>,
		transparency: <EditCalendarOutlinedIcon/>,
		"annual-plan": <TodayOutlinedIcon/>,
		psychologist: <BoyOutlinedIcon/>
	}

	const button = <Button
		type="button"
		variant="contained"
		onClick={() => {
			navigate('/editor');
		}}
	>
		Редагувати
	</Button>

	return <List component="nav" sx={{width: '100%', padding: 0}} aria-labelledby="nested-list-subheader">
		{pages.map(page => {
			const icon = IconsMap[page.id];
			const isSubpages = page.subpages !== undefined && page.subpages.length > 0;
			return (
				<Fragment key={page.id}>
					<ListItem secondaryAction={!isSubpages ? button : undefined}>
						<ListItemIcon>
							{icon}
						</ListItemIcon>
						<ListItemText primary={page.title}/>

					</ListItem>
					<Divider/>
					{isSubpages && (
						<Collapse in={true} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{page.subpages && page.subpages.map(subpage => {
									const subIcon = IconsMap[subpage.id];
									return <Fragment key={subpage.id}>
										<ListItem secondaryAction={button} sx={{pl: 10}}>
											<ListItemIcon>
												{subIcon}
											</ListItemIcon>
											<ListItemText primary={subpage.title}/>
										</ListItem>
										<Divider/>
									</Fragment>
								})}
							</List>
						</Collapse>
					)}
				</Fragment>
			)
		})}
	</List>
}