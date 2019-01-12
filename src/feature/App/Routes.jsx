import Kyc from '../Kyc';
import Customer from '../Customer';
import Operator from '../Operator';
import Dashboard from '../Dashboard';

// import {
//     Kyc,
//     Customer,
//     Operator,
//     Dashboard
// } from 'feature';

/* === import material icon === */
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

export const SidebarRoutes = [
    {
        path: '/',
        component: Dashboard,
        icon: DashboardIcon,
        text: 'Dashboard'
    },
    {
        path: '/kyc',
        component: Kyc,
        icon: PersonIcon,
        text: 'Kyc'
    },
    {
        path: '/customer',
        component: Customer,
        icon: PersonIcon,
        text: 'Customer'
    },
    {
        path: '/operator',
        component: Operator,
        icon: PersonIcon,
        text: 'Operator'
    }
];

export const SettingRoutes = [
    {
        icon: PowerSettingsNewIcon,
        text: 'Logout'
    }
]
