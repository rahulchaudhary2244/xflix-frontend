import { ThemeProvider } from '@mui/material';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VideoPage from './components/VideoPage';
import { SnackbarProvider } from 'notistack';
import theme from './Theme';

export const config = {
    endpoint: `https://xflix-nodejs-server.onrender.com/v1`, //`http://localhost:8082/v1`, //`https://6942ec51-4423-43dc-bb80-606405084295.mock.pstmn.io/v1`,
};

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    dense
                    preventDuplicate
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    autoHideDuration={1000}
                >
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/video/:id" component={VideoPage} />
                    </Switch>
                </SnackbarProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
