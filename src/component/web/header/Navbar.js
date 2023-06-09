import { AppBar, Avatar, Box, Button, Container, Divider, FormControl, Grid, IconButton, InputLabel, ListItemIcon, Menu, MenuItem, Select, Tab, Tabs, TextField, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import React, { useEffect, useState } from "react";
import axios from "axios";
import DrawComponent from "./DrawComponent";
import SearchIcon from '@mui/icons-material/Search';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';



export default function Navbar() {

    const [value, setValue] = useState(0)
    const [param, setParam] = useState('');
    const [isLogin, setIsLogin] = useState(localStorage.getItem('token'))
    const [avatar,setAvatar] = useState('')

    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const auth = localStorage.getItem('token')

    useEffect(()=> {
        getInfo();
    },[auth])

    const getInfo = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/auth',
            headers: {
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json'
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setAvatar(response.data.avatar);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload()

    }

    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (isAuth & isAuth !== 'undefined') {
            navigate("/")
        }
    })

    const styleToolbar = {
        backgroundColor: 'white',
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'
    }



    return (<>
        <Container sx={{ boxShadow: 'none', height: '64px' }}>
            {!isMatch && <Toolbar sx={styleToolbar}>
                <Link style={{ color: 'black' }} to='/'>
                    <MenuBookOutlinedIcon style={{ marginRight: '50px',width:'50px',height:'50px' }}></MenuBookOutlinedIcon>
                </Link>

                {/* <Typography>BLOG</Typography> */}
                <Tabs textColor='inherit' value={value} onChange={(event, value) => { setValue(value) }}>
                    <Tab label='Bài viết' href="/profile"></Tab>
                    <Tab label='Thảo luận'></Tab>
                    <Tab label='Hỏi đáp'></Tab>
                </Tabs>
                <Grid sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                    <TextField variant="outlined" size="small" placeholder="Tìm kiếm từ khóa..." sx={{ backgroundColor: 'white', borderRadius: 1 }}></TextField>
                    <Button href="/search" variant="contained" size="small" sx={{ boxShadow: 'none', textTransform: 'initial', backgroundColor: 'none !important' }}>
                        <SearchIcon></SearchIcon>
                    </Button>
                    {!isLogin ?
                        <Button href="/login" sx={{textTransform: 'initial', backgroundColor: 'white', color: 'blue', boxShadow: 'none !important', '&:hover': { backgroundColor: '#ffffff' } }} size="small" variant="contained">Đăng ký/Đăng nhập</Button>
                        :
                        // :<Avatar
                        //     alt="Remy Sharp"
                        //     src='https://firebasestorage.googleapis.com/v0/b/fir-951ef.appspot.com/o/f3804042-d366-4195-88d4-556b306f6892.jpg?alt=media&token=17ae9f44-4898-49ff-b2e2-14a50378dbe8'
                        //     sx={{ width: 30, height: 30,marginLeft:'20px'}}
                        // />
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar src={avatar} sx={{ width: 32, height: 32 }}></Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={() => { navigate("profile") }}>
                                    <ListItemIcon>
                                        <PersonIcon fontSize="small"></PersonIcon>
                                    </ListItemIcon>
                                    Trang cá nhân
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => { localStorage.removeItem('token') }}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem onClick={() => { navigate("/login") }} >
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Đăng xuất
                                </MenuItem>
                            </Menu>
                        </>
                    }


                </Grid>
            </Toolbar>}
            {isMatch && <>
                <Toolbar sx={styleToolbar}>
                    <DrawComponent></DrawComponent>
                    <Typography sx={{ margin: '0 auto' }}><MenuBookOutlinedIcon sx={{width:'50px', height:'50px'}}/></Typography>
                </Toolbar>
            </>}
            <Outlet></Outlet>
        </Container>
    </>)
}