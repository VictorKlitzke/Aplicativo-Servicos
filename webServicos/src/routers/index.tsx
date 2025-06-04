import { Routes, Route } from 'react-router-dom';
import LoginPage from "../views/pages/auth/login_page";
import RegisterPage from "../views/pages/auth/register_page";
import HomePage from "../views/home_page";
import Layout from '../layout/layout';
import PrivateRoute from './privateRouter';
import ConfigPage from '../views/pages/config/config_page';
import NotFoundPage from '../error/Founderror';
import ProfilePage from '../views/pages/profile/profile_page';
import MyCategorysPage from '../views/pages/categorys/mycategorys';
import CreateServicePage from '../views/pages/servicos/createservices_page';
import MyServicesPage from '../views/pages/servicos/myservices_page';
import CreateCategorysPage from '../views/pages/categorys/createcategory';
import LandingPage from '../views/pages/landing_page.';
import AvailableServicesPage from '../views/pages/servicos/availableservices_page';
import ServicesDetailsPage from '../views/pages/servicos/details/servicesdetails_page';
import ConfirmationPage from '../views/pages/servicos/details/confirmtionserives_page';
import { NotificationPage } from '../views/pages/notification/notification_page';

export default function AppRouters() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
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
                <Route path="/createservices/new" element={<CreateServicePage />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/mycategory" element={<MyCategorysPage />} />
                <Route path="/createcategory/new" element={<CreateCategorysPage />} />
                <Route path="/availableservices" element={<AvailableServicesPage />} />
                <Route path="/servico/:id" element={<ServicesDetailsPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/notification" element={<NotificationPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
