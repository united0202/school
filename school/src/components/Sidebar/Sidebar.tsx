import './Sidebar.scss';

import React, {FC, Fragment, useCallback, useContext, useState} from "react";
import {
    Button,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
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
import {TPageType} from "../../types";
import {usePages} from "../../hooks/usePages";
import {useUser} from "../../hooks/useUser";
import {AuthContext} from "../../context/AuthContext";
import {SignIn} from "../../popups/SignIn";

interface ISidebarProps {
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
}

export const Sidebar: FC<ISidebarProps> = ({isOpen, onOpen}) => {
    const [collapse, setCollapse] = useState<TPageType | null>(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();
    const {pages} = usePages();
    const {currentUser, signOut} = useContext(AuthContext)

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

    const handleCollapse = useCallback((type: TPageType) => {
        if (type === collapse) {
            setCollapse(null);
            return;
        }

        setCollapse(type);
    }, [collapse]);

    const handleNavigate = useCallback((path: string) => {
        navigate(path);
    }, []);

    const handleItemClicked = useCallback((isSubpages: boolean, id: TPageType) => {
        if (!isSubpages) {
            handleNavigate(`/${id}`);
            return;
        }

        handleCollapse(id);
    }, [handleNavigate, handleCollapse]);

    const handleSignInSignOut = useCallback(() => {
        // onOpen(false);

        if (currentUser) {
            signOut();
            handleNavigate('/about');
            return;
        }

        setPopupOpen(true);
        // handleNavigate('/login');
    }, [])

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
            <SignIn onClose={()=> setPopupOpen(false)} open={popupOpen} />
            <div className="sidebar-header">
                <Button
                    type="button"
                    variant="contained"
                    onClick={handleSignInSignOut}
                >
                    {currentUser ? 'Вийти' : 'Увійти'}
                </Button>
                <IconButton onClick={() => onOpen(false)}>
                    <ArrowBackIosOutlinedIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List component="nav" sx={{width: '100%', padding: 0}} aria-labelledby="nested-list-subheader">
                {pages.map(page => {
                    const icon = IconsMap[page.id];
                    const isSubpages = page.subpages !== undefined && page.subpages.length > 0;
                    return (
                        <Fragment key={page.id}>
                            <ListItemButton onClick={() => handleItemClicked(isSubpages, page.id)}>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={page.title}/>
                                {isSubpages && (collapse === page.id ? <ExpandLess/> : <ExpandMore/>)}
                            </ListItemButton>
                            <Divider/>
                            {isSubpages && (
                                <Collapse in={collapse === page.id} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {page.subpages && page.subpages.map(subpage => {
                                            const subIcon = IconsMap[subpage.id];
                                            return <ListItemButton key={subpage.id} sx={{pl: 4}}
                                                                   onClick={() => handleNavigate(`/${subpage.id}`)}>
                                                <ListItemIcon>
                                                    {subIcon}
                                                </ListItemIcon>
                                                <ListItemText primary={subpage.title}/>
                                            </ListItemButton>
                                        })}
                                    </List>
                                </Collapse>
                            )}
                        </Fragment>
                    )
                })}
            </List>
        </div>
    </Drawer>
}