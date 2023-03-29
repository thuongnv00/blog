import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Container, Grid, List, ListItem, ListItemButton, Paper, styled, TextField, Typography } from "@mui/material";
import Navbar from '../header/Navbar'
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../userProfile/userProfile.css'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HomeIcon from '@mui/icons-material/Home';


export default function UserProfile() {


    const [data, setData] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedImg, setSelectedImg] = useState('https://thumbs.dreamstime.com/z/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg')

    const [username, setUsername] = useState('')
    const [openInfo, setOpenInfo] = useState(true)
    const [openSecurity, setOpenSecurity] = useState(false)

    const navigate = useNavigate()

    let auth = localStorage.getItem('token')

    useEffect(() => {
        getInfo()
    }, [])

    let showImg = (event) => {
        if (event.target.files.length !== 0) {

            setSelectedImg(URL.createObjectURL(event.target.files[0]));
            console.log(selectedImg)
        }

    }

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
                setData(response.data);
                setUsername(response.data.username);
                setName(response.data.name);
                setEmail(response.data.email);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const updateInfo = () => {
        const FormData = require('form-data');
        let data = new FormData();
        data.append('name', name);
        data.append('email', email);

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/auth/update',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + auth
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert('Cap nhat thanh cong');
                reloadPage()
            })
            .catch((error) => {
                console.log(data);
            });

    }

    let reloadPage = () => {
        window.location.reload()
    }


    let onChange = (event) => {
        if (event.target.name == 'name') {
            setName(event.target.value)
        }
        if (event.target.name == 'email') {
            setEmail(event.target.value)
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    let openModalInfo = () => {
        setOpenInfo(true)
        setOpenSecurity(false)
    }

    let openModalSecurity = () => {
        setOpenInfo(false)
        setOpenSecurity(true)
    }

    return (<>
        <Navbar></Navbar>
        <Container sx={{ marginTop: '50px' }}>
            <Grid container columns={16}>
                <Grid item xs={4}>
                    <List>
                        <ListItem>
                            <ListItemButton>
                                <HomeIcon sx={{ marginRight: '10px' }} />
                                <Typography fontWeight='bold'>Trang chủ</Typography>

                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={openModalInfo}>
                                <PersonIcon sx={{ marginRight: '10px' }} />
                                Thông tin cá nhân
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={openModalSecurity}>
                                <VpnKeyIcon sx={{ marginRight: '10px' }} />
                                Bảo mật
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>

                {openInfo && <Grid item xs={12}>
                    <Box>
                        <Typography variant="h5">Thông tin cá nhân</Typography>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <Avatar sx={{ width: '100px', height: '100px', margin: "20px auto" }} src={selectedImg}>
                            </Avatar>
                            <IconButton aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={showImg} />
                                <Typography fontWeight='bold' color='blue' sx={{ marginRight: '10px' }}>Thay đổi ảnh đại diện</Typography>
                                <PhotoCamera />

                            </IconButton>

                        </div>

                        <div style={{ padding: '20px 0' }}>
                            <Typography>Tên tài khoản</Typography>
                            <TextField sx={{ backgroundColor: '#dee2e6' }} size="small" fullWidth value={username} id="filled-disabled" disabled></TextField>
                        </div>

                        <div style={{ padding: '20px 0' }}>
                            <Typography>Tên hiển thị</Typography>
                            <TextField name="name" size="small" fullWidth value={name} onChange={onChange}></TextField>                        </div>

                        <div style={{ padding: '20px 0' }}>
                            <Typography>Email đăng ký</Typography>
                            <TextField name="email" size="small" fullWidth value={email} onChange={onChange}></TextField>
                        </div>

                        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={reloadPage}>Hủy bỏ</Button>
                            <Button variant="contained" onClick={updateInfo}>Cập nhật</Button>
                        </div>
                    </Box>
                </Grid>
                }

                {openSecurity && <Grid item xs={12}>
                    <Box>
                        <div><Typography variant="h5">Đổi mật khẩu</Typography></div>

                        <div style={{margin:'20px 0'}}>
                            <Typography>
                                Mật khẩu hiện tại
                            </Typography>
                            <TextField type='password' size="small" variant="outlined" ></TextField>
                        </div>

                        <div style={{margin:'20px 0'}}>
                            <Typography>
                                Mật khẩu mới
                            </Typography>
                            <TextField type='password' size="small" variant="outlined" ></TextField>
                        </div>

                        <div style={{margin:'20px 0'}}>
                            <Typography>
                                Nhập lại mật khẩu mới
                            </Typography>
                            <TextField type='password' size="small" variant="outlined" ></TextField>
                        </div>
                    </Box>
                </Grid>
                }
            </Grid>
        </Container>
    </>)
}