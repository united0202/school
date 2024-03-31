import './App.scss';

import React, {FC, useCallback, useMemo, useState} from 'react';
import {Header} from "./components/Header/Header";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Content} from "./components/Content/Content";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {BrowserRouter, createRoutesFromElements, Outlet, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {Home} from "./pages/Home/Home";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

export type TColorMode = 'light' | 'dark';

export const App: FC = () => {
    const [mode, setMode] = useState<TColorMode>('light')
    const [open, setOpen] = useState(false)

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const handleIsOpenChanged = useCallback(
        (isOpen: boolean) => {
            setOpen(isOpen);
        },
        []
    );

    return (
        <BrowserRouter>
            <AuthProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <div className="App">
                            <Sidebar onOpen={handleIsOpenChanged} isOpen={open}/>
                            <Header
                                isOpen={open}
                                onOpen={handleIsOpenChanged}
                            />
                            <Content isOpen={open}/>
                        </div>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </AuthProvider>
        </BrowserRouter>
    );
}