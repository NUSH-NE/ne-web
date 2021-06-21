import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import App from './App';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

export default function Entry() {
    return <Router>
        <ThemeProvider theme>

        </ThemeProvider>
        <Switch>
            <Route path='/'><App /></Route>
        </Switch>
    </Router>
}