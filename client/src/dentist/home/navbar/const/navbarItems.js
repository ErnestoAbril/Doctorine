import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Home',
    route: '/home',
  },
  {
    id: 1,
    icon: <CalendarTodayIcon />,
    label: 'Calendar',
    route: 'calendar',
  },

  {
    id: 2,
    icon: <NoteAltIcon />,
    label: 'Register Patient',
    route: 'register',
  },

  {
    id: 3,
    icon: <PaymentsIcon />,
    label: 'Budget',
    route: 'budget',
  },
  {
    id: 4,
    icon: <AddBoxIcon />,
    label: 'Create HC',
    route: 'create-clinical-history',
  },
];
