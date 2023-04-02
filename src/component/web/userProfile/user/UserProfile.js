import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Avatar, Box, Button, Container, Grid, List, ListItem, ListItemButton, Modal, Paper, Snackbar, Stack, styled, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
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
    const [selectedImg, setSelectedImg] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)

    const [username, setUsername] = useState('')
    const [openInfo, setOpenInfo] = useState(true)
    const [openSecurity, setOpenSecurity] = useState(false)

    // variable const

    const navigate = useNavigate()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down("md"))
    let auth = localStorage.getItem('token')

    //update pass
    const { success, fail, result, updatePass, handleFail, handleSuccess } = usePassword(auth)
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
            setAvatar(event.target.files[0])
            console.log(avatar)
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
                setSelectedImg(response.data.avatar)
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
        data.append('file', avatar);

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
                setIsUpdate(true);
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

    const handleCloses = () => {
        setIsUpdate(false);
        window.location.reload()
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


    const onClose = () => {
        setIsUpdate(false);
        window.location.reload();
    }

    return (<>
        {/* <Navbar></Navbar> */}
        <Container sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
            {/* {isUpdate && <div style={{ position: 'absolute', zIndex: '2000', top: '0px' }}>
                <Stack sx={{ width: '600px' }} spacing={2}>
                    <Alert severity="success" onClose={onClose}>
                        <AlertTitle><strong>Success</strong> </AlertTitle>
                        Cập nhật thông tin thành công!
                    </Alert>
                </Stack>
            </div>} */}
            {/* {success && <div style={{ position: 'absolute', zIndex: '2000', top: '0px' }}>
                <Stack sx={{ width: '600px' }} spacing={2}>
                    <Alert severity="success" onClose={handleSuccess}>
                        <AlertTitle><strong>Success</strong> </AlertTitle>
                        Cập nhật mật khẩu thành công!
                    </Alert>
                </Stack>
            </div>} */}

            {/* {(result.message && fail) &&
                <div style={{ position: 'absolute', zIndex: '2000', top: '0px' }}>
                    <Stack sx={{ width: '600px' }} spacing={2}>
                        <Alert severity="error" onClose={handleFail}>
                            <AlertTitle><strong>Lỗi xảy ra:</strong></AlertTitle>
                            {result.message}
                            </Alert>
                    </Stack>
                </div>} */}
            <Snackbar open={isUpdate} autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={onClose}>
                <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                        <AlertTitle><strong>Success</strong> </AlertTitle>
                        Cập nhật thông tin thành công!

                </Alert>
            </Snackbar>

            <Snackbar open={success} autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleSuccess}>
                <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%' }}>
                    <AlertTitle><strong>Success</strong> </AlertTitle>
                    Cập nhật mật khẩu thành công!
                </Alert>
            </Snackbar>

            <Snackbar open={fail} autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleFail}>
                <Alert onClose={handleFail} severity="error" sx={{ width: '100%' }}>
                    <AlertTitle><strong>Lỗi xảy ra:</strong></AlertTitle>
                    {result.message}
                </Alert>
            </Snackbar>



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
                            {/* <Modal
                                open={isUpdate}
                                // onClose={handleCloses}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={styleBox}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Cập nhật thông tin thành công!
                                    </Typography>
                                    {result.message && <Typography id="modal-modal-description" sx={{ mt: 2, color: 'green' }}>
                                        {result.message}
                                    </Typography>}
                                    <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="contained" onClick={handleClose}>Close</Button>
                                    </div>
                                </Box>
                            </Modal> */}
                        </div>
                    </Box>
                </Grid>
                }

                {openSecurity && <Grid item xs={12}>
                    <Box>
                        <div><Typography sx={{ color: "blue !important" }} variant="h5">Đổi mật khẩu</Typography></div>

                        <div style={{ marginTop: '30px' }}>
                            <Typography>
                                <span style={{ paddingRight: '5px', color: 'red' }}>*</span>
                                Mật khẩu hiện tại
                            </Typography>
                            <TextField name="currentPass" size="small" variant="outlined" onChange={onChange}></TextField>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <Typography>
                                <span style={{ paddingRight: '5px', color: 'red' }}>*</span>
                                Mật khẩu mới
                            </Typography>
                            <TextField name="newPass" size="small" variant="outlined" onChange={onChange}></TextField>
                        </div>
                        {result.newPassword &&
                            <div><Typography color='red' fontSize='12px'>{result.newPassword}</Typography></div>
                        }

                        <div style={{ marginTop: '30px' }}>
                            <Typography>
                                <span style={{ paddingRight: '5px', color: 'red' }}>*</span>
                                Nhập lại mật khẩu mới
                            </Typography>
                            <TextField name="confirmPass" size="small" variant="outlined" onChange={onChange}></TextField>
                        </div>
                        {result.confirmPassword &&
                            <div><Typography color='red' fontSize='12px'>{result.confirmPassword}</Typography></div>
                        }



                        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-start' }}>
                            <Button sx={{ textTransform: 'initial' }} onClick={reloadPage}>Hủy bỏ</Button>
                            <Button variant="contained" sx={{ textTransform: 'initial' }} onClick={() => { updatePass(currentPass, newPass, confirmPass) }}>Đổi mật khẩu</Button>
                            {/* <Modal
                                open={success}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={styleBox}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Cập nhật tài khoản
                                    </Typography>
                                    {result.message && <Typography id="modal-modal-description" sx={{ mt: 2, color: 'green' }}>
                                        {result.message}
                                    </Typography>}
                                    <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="contained" onClick={handleCloses}>Close</Button>
                                    </div>
                                </Box>
                            </Modal> */}
                        </div>
                        {/* <div>
                            {(result.message && !success) &&
                                <Typography color='red' fontSize='14px' sx={{ paddingTop: '50px' }}>{result.message}</Typography>
                            }
                        </div> */}
                    </Box>
                </Grid>
                }
            </Grid>
        </Container>
    </>)
}