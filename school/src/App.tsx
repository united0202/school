import './App.scss';

import React from 'react';
import {Header} from "./components/Header/Header";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline/>
			<div className="App">
				<Header/>
			</div>
		</ThemeProvider>
	);
}

export default App;
