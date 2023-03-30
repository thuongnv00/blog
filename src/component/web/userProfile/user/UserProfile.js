import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Container, Grid, List, ListItem, ListItemButton, Modal, Paper, styled, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from '../../header/Navbar'
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../user/userProfile.css'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HomeIcon from '@mui/icons-material/Home';
import { usePassword } from "../password/usePassword";


export default function UserProfile() {

    // --profile--
    const [data, setData] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedImg, setSelectedImg] = useState('https://thumbs.dreamstime.com/z/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg')

    const [username, setUsername] = useState('')
    const [openInfo, setOpenInfo] = useState(true)
    const [openSecurity, setOpenSecurity] = useState(false)

    // variable const

    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down("md"))
    let auth = localStorage.getItem('token')

    //update pass
    const { success, result, updatePass, handleClose } = usePassword(auth)
    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    //effect
    useEffect(() => {
        getInfo();
        if (!auth || auth === 'undefinded') {
            navigate("/")
        }
    }, [])


    //image
    let showImg = (event) => {
        if (event.target.files.length !== 0) {
            setSelectedImg(URL.createObjectURL(event.target.files[0]));
            console.log(selectedImg)
        }

    }

    //function
    let reloadPage = () => {
        window.location.reload()
    }
    //get info
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

    //update info
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

    //onChange
    let onChange = (event) => {
        if (event.target.name == 'name') {
            setName(event.target.value)
        }
        if (event.target.name == 'email') {
            setEmail(event.target.value)
        }
        if (event.target.name == 'currentPass') {
            setCurrentPass(event.target.value)
        }
        if (event.target.name == 'newPass') {
            setNewPass(event.target.value)
        }
        if (event.target.name == 'confirmPass') {
            setConfirmPass(event.target.value)
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    //modal
    let openModalInfo = () => {
        setOpenInfo(true)
        setOpenSecurity(false)
    }

    let openModalSecurity = () => {
        setOpenInfo(false)
        setOpenSecurity(true)
    }

    //style

    const styleBox = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (<>
        {/* <Navbar></Navbar> */}
        <Container sx={{ marginTop: '50px' }}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={4}>
                    <List>
                        <ListItem>
                            <ListItemButton href="/">
                                <HomeIcon sx={{ marginRight: '10px' }} />
                                {!isMatch && <Typography fontWeight='bold'>Trang chủ</Typography>}
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={openModalInfo}>
                                <PersonIcon sx={{ marginRight: '10px' }} />
                                {!isMatch && 'Thông tin cá nhân'}
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={openModalSecurity}>
                                <VpnKeyIcon sx={{ marginRight: '10px' }} />
                                {!isMatch && 'Bảo mật'}
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
                        <div><Typography sx={{ color: "blue !important" }} variant="h5">Đổi mật khẩu</Typography></div>

                        <div style={{ margin: '20px 0' }}>
                            <Typography>
                                Mật khẩu hiện tại
                            </Typography>
                            <TextField name="currentPass" size="small" variant="outlined" onChange={onChange}></TextField>
                        </div>

                        <div style={{ margin: '20px 0' }}>
                            <Typography>
                                Mật khẩu mới
                            </Typography>
                            <TextField name="newPass" size="small" variant="outlined" onChange={onChange}></TextField>
                        </div>
                        {result.newPassword &&
                            <div><Typography color='red' fontSize='14px'>{result.newPassword}</Typography></div>
                        }

                        <div style={{ margin: '20px 0' }}>
                            <Typography>
                                Nhập lại mật khẩu mới
                            </Typography>
                            <TextField name="confirmPass" size="small" variant="outlined" onChange={onChange}></TextField>
                        </div>

                        {result.confirmPassword &&
                            <div><Typography color='red' fontSize='14px'>{result.confirmPassword}</Typography></div>
                        }

                        {result.message &&
                            <div><Typography color='red' fontSize='14px'>{result.message}</Typography></div>
                        }

                        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-start' }}>
                            <Button onClick={reloadPage}>Hủy bỏ</Button>
                            <Button variant="contained" onClick={() => { updatePass(currentPass, newPass, confirmPass) }}>Cập nhật</Button>

                            <Modal
                                open={success}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={styleBox}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Cập nhật mật khẩu
                                    </Typography>
                                    {result.message && <Typography id="modal-modal-description" sx={{ mt: 2, color: 'green' }}>
                                        {result.message}
                                    </Typography>}
                                    <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="contained" onClick={handleClose}>Close</Button>
                                    </div>
                                </Box>
                            </Modal>

                        </div>
                    </Box>
                </Grid>
                }
            </Grid>
        </Container>
    </>)
}