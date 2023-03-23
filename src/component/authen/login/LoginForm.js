
import { Adb, LockOutlined, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import React from "react";
import logo from '../login/logo.svg';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material";
import SearchIcon from "@mui/icons-material";
import '../login/Login.css'


const theme = createTheme();
// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = [
  {
    badge: 'Products',
    navigate: 'product'
  },
  {
    badge: 'Pricing',
    navigate: 'pricing'
  },
  {
    badge: 'Blog',
    navigate: 'blog'
  }
];

export default function LoginForm() {


  return (<div>
    <div className="container">
      <div className="main-navbar">
        <div className="narbar-items">
          <img src={logo}></img>
          {pages.map((page, index) => {
            return <div className="narbar-item" key={index}>
              {page.badge}
            </div>
          })}
        </div>
      </div>
    </div>
  </div>)






















  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };


  // return (

  //   <AppBar position="static">
  //     <Container maxWidth="xl">
  //       <Toolbar disableGutters>
  //         <AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
  //         <Typography
  //           variant="h6"
  //           noWrap
  //           component="a"
  //           href="/"
  //           sx={{
  //             mr: 2,
  //             display: { xs: 'none', sm: 'flex' },
  //             fontFamily: 'monospace',
  //             fontWeight: 700,
  //             letterSpacing: '.3rem',
  //             color: 'inherit',
  //             textDecoration: 'none',
  //           }}
  //         >
  //           BLOG
  //         </Typography>

  //         <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
  //           <IconButton
  //             size="large"
  //             aria-label="account of current user"
  //             aria-controls="menu-appbar"
  //             aria-haspopup="true"
  //             onClick={handleOpenNavMenu}
  //             color="inherit"
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //           <Menu
  //             id="menu-appbar"
  //             anchorEl={anchorElNav}
  //             anchorOrigin={{
  //               vertical: 'bottom',
  //               horizontal: 'left',
  //             }}
  //             keepMounted
  //             transformOrigin={{
  //               vertical: 'top',
  //               horizontal: 'left',
  //             }}
  //             open={Boolean(anchorElNav)}
  //             onClose={handleCloseNavMenu}
  //             sx={{
  //               display: { xs: 'block', sm: 'none' },
  //             }}
  //           >
  //             {pages.map((page) => (
  //               <MenuItem key={page.badge}>
  //                 <Typography textAlign="center">
  //                   <a style={{ textDecoration: "none" }} href="/das">{page.badge}</a>
  //                 </Typography>
  //               </MenuItem>
  //             ))}
  //           </Menu>
  //         </Box>
  //         <AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} />
  //         <Typography
  //           variant="h5"
  //           noWrap
  //           component="a"
  //           href="/"
  //           sx={{
  //             mr: 2,
  //             display: { xs: 'flex', sm: 'none' },
  //             flexGrow: 1,
  //             fontFamily: 'monospace',
  //             fontWeight: 700,
  //             letterSpacing: '.3rem',
  //             color: 'inherit',
  //             textDecoration: 'none',
  //           }}
  //         >
  //           BLOG
  //         </Typography>
  //         <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
  //           {pages.map((page) => (
  //             <Button
  //               key={page.badge} href={page.navigate}
  //               onClick={handleCloseNavMenu}
  //               sx={{ my: 2, color: 'white', display: 'block' }}
  //             >
  //               {page.badge}
  //             </Button>
  //           ))}
  //         </Box>


  //         <Box sx={{ flexGrow: 0 }}>
  //           <Tooltip title="Open settings">
  //             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
  //               <Avatar alt="Remy Sharp" src={logo} />
  //             </IconButton>
  //           </Tooltip>
  //           <Menu
  //             sx={{ mt: '45px' }}
  //             id="menu-appbar"
  //             anchorEl={anchorElUser}
  //             anchorOrigin={{
  //               vertical: 'top',
  //               horizontal: 'right',
  //             }}
  //             keepMounted
  //             transformOrigin={{
  //               vertical: 'top',
  //               horizontal: 'right',
  //             }}
  //             open={Boolean(anchorElUser)}
  //             onClose={handleCloseUserMenu}
  //           >
  //             {settings.map((setting) => (
  //               <MenuItem key={setting} onClick={handleCloseUserMenu}>
  //                 <Typography textAlign="center">{setting}</Typography>
  //               </MenuItem>
  //             ))}
  //           </Menu>
  //         </Box>
  //       </Toolbar>
  //     </Container>
  //   </AppBar>

  // );
}

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
