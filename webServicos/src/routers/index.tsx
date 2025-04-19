import { Routes, Route } from 'react-router-dom';
import LoginPage from "../views/pages/login_page";
import RegisterPage from "../views/pages/register_page";
import HomePage from "../views/home_page";
import Layout from '../layout/layout';
import PrivateRoute from './privateRouter';
import CreateServicePage from '../views/pages/servicos/createServices_page';
import MyServicesPage from '../views/pages/servicos/myServices_page';
import ConfigPage from '../views/pages/config/config_page';
import NotFoundPage from '../error/Founderror';
import ProfilePage from '../views/pages/profile/profile_page';

export default function AppRouters() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                <Route path="/homePage" element={<HomePage />} />
                <Route path="/myservices" element={<MyServicesPage />} />
                <Route path="/createservices" element={<CreateServicePage />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Rota pra erro 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
