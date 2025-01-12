import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApprovalIcon from '@mui/icons-material/Approval';

interface NavbarProps {
    children?: ReactNode; // Optional children prop
  }


const Navbar: React.FC<NavbarProps> = ({ children }) => {
    const role = localStorage.getItem('user_role');
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        navigate("/"); // Redirect to the login/home page
    };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1875D2" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {/* Title */}
        <Typography variant="h6" sx={{ color: "white" }}>
          Northeastern Club Hub - {role}
        </Typography>

        {/* Icons Section */}
        <div style={{ display: "flex", gap: "8px", color: "white" }}>
            <div>{children}</div>
          {role === "clubAdmin" && <IconButton color="inherit" onClick={() => navigate('/my-events')}>
            <EventIcon />
          </IconButton>}
          {role === "clubAdmin" && <IconButton color="inherit" onClick={() => navigate('/entry-request')}>
            <ApprovalIcon />
          </IconButton>}
          {/* <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton> */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;