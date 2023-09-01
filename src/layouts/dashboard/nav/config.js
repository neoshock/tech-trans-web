// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

// navConfig.js

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    roles: ['admin', 'user']  // Esta pestaña es visible para admin y user
  },
  {
    title: 'estudiantes',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    roles: ['admin']  // Solo para admin
  },
  {
    title: 'mis materias',
    path: '/dashboard/products',
    icon: icon('ic_book'),
    roles: ['admin']  // Solo para user
  },
  {
    title: 'Contenido',
    path: '/dashboard/blog',
    icon: icon('ic_content'),
    roles: ['admin', 'user']  // Esta pestaña es visible para admin y user
  },
];

export default navConfig;

