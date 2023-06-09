import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from '../config/layout/DefaultLayout';
import Archived from '../pages/Archived';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Tasks from '../pages/Tasks';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<WelcomeLayout component={Welcome} />} /> */}
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/tasks" element={<DefaultLayout component={Tasks} />} />
                <Route path="/archived" element={<DefaultLayout component={Archived} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
