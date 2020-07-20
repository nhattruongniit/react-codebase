/* === import material icon === */
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

/* === import component === */
import ChangePassword from '../ChangePassword';
import Profile from '../Profile';
import ResetPassword from '../ResetPassword';

export const RoutesApp = [
  {
    path: '/profile',
    to: 'profile',
    component: Profile,
    icon: PersonIcon,
    text: 'Profile',
  },
  {
    path: '/change-password',
    to: 'change-password',
    component: ChangePassword,
    icon: VpnKeyIcon,
    text: 'Change Password',
  },
  {
    path: '/reset-password',
    to: 'reset-password',
    component: ResetPassword,
    icon: VpnKeyIcon,
    text: 'Reset Password',
  },
];
