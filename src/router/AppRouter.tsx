import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/Login/LoginPage.tsx';
import { DatingPage } from '../pages/Dating/DatingPage.tsx';
import { DatingConfirmed } from '../pages/DatingConfirmed/DatingConfirmed.tsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dating" element={<DatingPage />} />
                <Route path="/dating-confirmed" element={<DatingConfirmed />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
