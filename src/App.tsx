import React from 'react';
import { Provider } from 'react-redux';

import GStyles from './config/GlobalStyles';
import AppRoutes from './Routes/AppRoutes';
import { store } from './store';

function App() {
    return (
        <>
            <Provider store={store}>
                <GStyles />
                <AppRoutes />
            </Provider>
        </>
    );
}

export default App;
