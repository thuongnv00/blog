import { AppBar, Avatar, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import React, { useState } from "react";
import DrawComponent from "./DrawComponent";
import SearchIcon from '@mui/icons-material/Search';
import '../header/Navbar.css'
import avatar from '../header/man.png'
import { Link, Outlet } from "react-router-dom";



export default function Navbar() {

    const [value, setValue] = useState(0)
    const [age, setAge] = useState('');
    const [param, setParam] = useState('');


    const theme = useTheme()
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    console.log(isMatch)

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (<>
        <Container sx={{ boxShadow: 'none', height: '64px'}}>
                {!isMatch && <Toolbar sx={{}}>
                    <Link style={{ color: 'black' }} to='/'>
                        <MenuBookOutlinedIcon style={{ marginRight: 10 }}></MenuBookOutlinedIcon>
                    </Link>

                    {/* <Typography>BLOG</Typography> */}
                    <Tabs textColor='inherit' value={value} onChange={(event, value) => { setValue(value) }}>
                        <Tab label='Bài viết' href="/login"></Tab>
                        <Tab label='Thảo luận'></Tab>
                        <Tab label='Hỏi đáp'></Tab>
                    </Tabs>
                    <Grid sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                        <TextField variant="outlined" size="small" placeholder="Tìm kiếm từ khóa..." sx={{ backgroundColor: 'white', borderRadius: 1 }}></TextField>
                        <Button href="/search" variant="contained" size="small" sx={{ boxShadow: 'none', alignItems: 'center', backgroundColor: 'none !important' }}>
                            <SearchIcon></SearchIcon>
                        </Button>



                        <Button href="/login" sx={{ boxShadow: 'none', textTransform: 'initial' }} size="small" variant="contained">Đăng ký/Đăng nhập</Button>
                        <Avatar
                            alt="Remy Sharp"
                            src='https://firebasestorage.googleapis.com/v0/b/fir-951ef.appspot.com/o/f3804042-d366-4195-88d4-556b306f6892.jpg?alt=media&token=17ae9f44-4898-49ff-b2e2-14a50378dbe8'
                            sx={{ width: 30, height: 30 }}
                        />

                    </Grid>
                </Toolbar>}
                {isMatch && <>
                    <Toolbar>
                        <DrawComponent></DrawComponent>
                        <Typography sx={{ margin: '0 auto' }}><MenuBookOutlinedIcon></MenuBookOutlinedIcon></Typography>
                    </Toolbar>
                </>}
            <Outlet></Outlet>
        </Container>
    </>)
}