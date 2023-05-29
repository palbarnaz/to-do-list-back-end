import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GStyles from './config/GlobalStyles';
import AppRoutes from './Routes/AppRoutes';
import { persistor, store } from './store';

function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <GStyles />
                    <AppRoutes />
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;
