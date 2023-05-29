import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// eslint-disable-next-line react/function-component-definition
const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
