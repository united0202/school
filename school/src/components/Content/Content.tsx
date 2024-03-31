import './Content.scss'

import React, {FC} from "react";
import {Box, Container} from "@mui/material";
import {SIDEBAR_WIDTH} from "../../config";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {Home} from "../../pages/Home/Home";
import {DetailedPage} from "../../pages/DetailedPage/DetailedPage";
import {ContentEditor} from "../../pages/Editor/ContentEditor";
import {Pages} from "../../pages/Pages/Pages";

interface IContentProps {
    isOpen: boolean;
}

export const Content: FC<IContentProps> = ({isOpen}) => {

    return <Container maxWidth="xl" className="container">
        <Box sx={{flexGrow: 1}} className="header" width={isOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%'}
             marginLeft={isOpen ? `${SIDEBAR_WIDTH}px` : '0'}>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/page/:id' element={<DetailedPage/>}/>
                <Route path='/pages' element={<Pages/>}/>
                <Route path='/editor/:id' element={<ContentEditor/>}/>
                <Route path='*' element={<Home/>}/>
            </Routes>
            <Outlet/>

        </Box>
    </Container>
}