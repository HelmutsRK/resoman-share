import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import App from './App';
import LoginPage from "./pages/Login";
import ProjectsPage from './pages/Projects';
import Users from './pages/Users';
import Customers from './pages/Customers';
import MainLayout from "./components/Layout/MainLayout";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FolderIcon from '@mui/icons-material/Folder';
import LoginLayout from "./components/Layout/LoginLayout";
import ProjectDetailsPage from "./pages/Projects/details";
import CustomersPage from "./pages/Customers";
import ProjectAddEditPage from "./pages/Projects/AddEdit";
import CustomerAddEditPage from "./pages/Customers/AddEdit";
import CustomerDetailsPage from "./pages/Customers/details";
import UserDetailsPage from "./pages/Users/details";
import UserAddEditPage from "./pages/Users/AddEdit";

export const ROUTES = [
    {
        path: "/",
        key: "login",
        auth: false,
        title: "Login",
        showOnMenu: false,
        component: LoginPage,
        layoutComponent: LoginLayout,
        routeIcon: null,
    },
    {
        path: "/projects",
        key: "projects",
        auth: true,
        title: "Projekti",
        showOnMenu: true,
        component: ProjectsPage,
        layoutComponent: MainLayout,
        routeIcon: <FolderIcon/>,
    },
    {
        path: "/projects/:projectId",
        key: "project_details",
        auth: true,
        title: "Projekta dati",
        showOnMenu: false,
        component: ProjectDetailsPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
    {
        path: "/projects/edit/:projectId",
        key: "project_edit",
        auth: true,
        title: "Projekta labošana",
        showOnMenu: false,
        component: ProjectAddEditPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
    {
        path: "/projects/add",
        key: "project_add",
        auth: true,
        title: "Projekta pievienošana",
        showOnMenu: false,
        component: ProjectAddEditPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
    {
        path: "/users",
        key: "users",
        auth: true,
        title: "Darbinieki",
        showOnMenu: true,
        component: Users,
        layoutComponent: MainLayout,
        routeIcon: <AssignmentIndIcon/>,
    },
    {
        path: "/users/:userId",
        key: "users_details",
        auth: true,
        title: "Darbinieka dati",
        showOnMenu: false,
        component: UserDetailsPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
    {
        path: "/users/add",
        key: "users_add",
        auth: true,
        title: "Darbinieka pievienošana",
        showOnMenu: false,
        component: UserAddEditPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
    {
        path: "/users/edit/:userId",
        key: "users_edit",
        auth: true,
        title: "Darbinieka labošana",
        showOnMenu: false,
        component: UserAddEditPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
    {
        path: "/customers",
        key: "customers",
        auth: true,
        title: "Klienti",
        showOnMenu: true,
        component: CustomersPage,
        layoutComponent: MainLayout,
        routeIcon: <PeopleAltIcon/>,
    },
    {
        path: "/customers/add",
        key: "customers_add",
        auth: true,
        title: "Klienta pievienošana",
        showOnMenu: false,
        component: CustomerAddEditPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
    {
        path: "/customers/edit/:customerId",
        key: "customer_edit",
        auth: true,
        title: "Klienta labošana",
        showOnMenu: false,
        component: CustomerAddEditPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
    {
        path: "/customers/:customerId",
        key: "customer_details",
        auth: true,
        title: "Klienta dati",
        showOnMenu: false,
        component: CustomerDetailsPage,
        layoutComponent: MainLayout,
        routeIcon: null,
    },
]

export const RenderRoutes = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    {ROUTES.map((route, i) => {
                        return (
                            <Route
                                path={route.path}
                                key={route.key}
                                exact={route.exact}
                                element={
                                    <App
                                        pageComponent={route.component}
                                        id={route.key}
                                        routeProtected={route.auth}
                                        layoutComponent={route.layoutComponent}
                                        pageTitle={route.title}
                                    />
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
