import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DescriptionIcon from '@mui/icons-material/Description';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function JobSeekerMenu({ handleLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.userData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
  onClick={handleClick}
  size="small"
  sx={(theme) => ({
    ml: 2,
    border: '2px solid #1976d2',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#e3f2fd',
      transform: 'scale(1.05)',
    },
    // Smaller on mobile
    [theme.breakpoints.down('sm')]: {
      ml: 1,
      borderWidth: '1.5px',
    },
  })}
>
  <Avatar
    sx={(theme) => ({
      width: 32,
      height: 32,
      fontWeight: 'bold',
      fontSize: '16px',
      background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
      color: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
      // Smaller on mobile
      [theme.breakpoints.down('sm')]: {
        width: 28,
        height: 28,
        fontSize: '13px',
      },
    })}
  >
   <div>
    <img src={userData?.photoUrl} alt="" />
   </div>
  </Avatar>
</IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              minWidth: 220,
              borderRadius: '12px',
              mt: 1.5,
              p: 0.5,
              bgcolor: 'background.paper',
              overflow: 'visible',
              filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.15))',
              '& .MuiMenuItem-root': {
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#f0f7ff',
                  color: '#1976d2',
                  transform: 'translateX(2px)',
                },
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 18,
                width: 12,
                height: 12,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { handleClose(); navigate('/profile/bio'); }}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/profile/applied-job'); }}>
          Applied Jobs
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={() => { handleClose(); navigate('/profile/saved-jobs'); }}>
          <ListItemIcon>
            <CollectionsBookmarkIcon fontSize="small" />
          </ListItemIcon>
          Saved Jobs
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/profile/resume-manager'); }}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          CV
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/help') }}>
          <ListItemIcon>
            <SupportAgentIcon fontSize="small" />
          </ListItemIcon>
          Help & Support
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}