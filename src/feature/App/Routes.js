/* === import material icon === */
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';

/* === import component === */
import ChangePassword from '../ChangePassword';
import Profile from '../Profile';
import FillForm from '../FillForm';

export const RoutesApp = [
  {
    path: '/:nameApp/profile',
    to: 'profile',
    component: Profile,
    icon: PersonIcon,
    text: 'Profile',
  },
  {
    path: '/:nameApp/fill-form',
    to: 'fill-form',
    component: FillForm,
    icon: CreateIcon,
    text: 'Fill Form',
  },
  {
    path: '/:nameApp/change-password',
    to: 'change-password',
    component: ChangePassword,
    icon: VpnKeyIcon,
    text: 'Change Password',
  },
];
