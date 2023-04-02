
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Grid, LinearProgress, Link, Modal, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { fontSize } from '@mui/system';
import { redirect, useNavigate } from 'react-router-dom';
import Navbar from '../../web/header/Navbar';
import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from '@mui/icons-material';


export default function SignupForm() {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedImg, setSelectedImg] = useState('')
    const [avatar, setAvatar] = useState('')
    const [existUserOrMail,setExistUserOrMail] = useState(false)
    const [success, setSuccess] = useState(false)


    const [error, setError] = useState("");
    const [isvalid, setIsvalid] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [progress, setProgress] = useState(false);

    const navigate = useNavigate()
    const style = {
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        // width: 400,
        // bgcolor: 'white',
        // boxShadow: 24,
        // p: 4,
        margin: '20px auto',
        width: 450,
        paddingBottom: 5

    };

    useEffect(() => {
        let auth = localStorage.getItem('token');
        if (auth && auth !== 'undefined') {
            navigate("/")
        }
    }, [])



    let handleInput = (event) => {
        if (event.target.name === "name") {
            setName(event.target.value)
        }

        if (event.target.name === "username") {
            setUsername(event.target.value)
        }

        if (event.target.name === "email") {
            setEmail(event.target.value)
        }

        if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }

    let paperStyle = { width: "350px", height: "80vh", padding: "20px" }
    let avatarStyle = { backgroundColor: "#9c27b0", marginBottom: "10px" }
    let fieldStyle = { paddingBottom: "20px" }

    let signUp = () => {
        setExistUserOrMail(false)
        setProgress(true);
        const FormData = require('form-data');
        let data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('name', name);
        data.append('email', email);
        data.append('file', avatar);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://blog-dev-23.herokuapp.com/api/auth/signup',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.message === 'yes') {
                    setSuccess(true);
                    setOpen(true);
                    setExistUserOrMail(false);
                    setProgress(false)
                }
                // alert(JSON.stringify(response.data))
                if (response.data.message === 'nouser' || response.data.message === 'noemail') {
                    setExistUserOrMail(true);
                    setOpen(true);
                    setSuccess(false);
                }
            })
            .catch((error) => {
                console.log(error);
                console.log("dataa=>>>>>>>>",)
            });
    }


    let showImg = (event) => {
        if (event.target.files.length !== 0) {
            setSelectedImg(URL.createObjectURL(event.target.files[0]));
            setAvatar(event.target.files[0]);
            console.log(selectedImg);
            console.log(avatar);
        }

    }


    {
        if (success) {
            return (<>
                <Paper align="center" sx={style}>
                    <Grid style={{ backgroundColor: "white !important" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Đăng ký tài khoản!
                        </Typography>
                        <Typography style={{ color: "#67c23a", fontSize: "13px" }} id="modal-modal-description" sx={{ m: 2 }}>
                            Đăng ký tài khoản thành công. Bây giờ bạn có thể đăng nhập tài khoản!
                        </Typography>
                        <Button size="small" href='/login' variant="contained" >Đăng nhập</Button>
                        <Button size="small" href='/'>Trở về trang chủ</Button>
                    </Grid>
                </Paper>

            </>)
        }
    }


    if (!success) {
        return (<>
            <Navbar></Navbar>
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Paper style={paperStyle} elevation={3}  >
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon></LockOutlinedIcon></Avatar>
                        <h2>Sign up</h2>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column",marginTop:'20px' }}>
                            <Avatar sx={{ width: '50px', height: '50px', margin: "20px auto" }} src={selectedImg}>
                            </Avatar>
                            <IconButton aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={showImg} />
                                <Typography fontWeight='bold' color='blue' fontSize='12px' sx={{ marginRight: '10px' }}>Chọn ảnh đại diện</Typography>
                                <PhotoCamera />
                            </IconButton>

                        </div>
                        <TextField name="name" required style={fieldStyle} label="Name" variant="standard" placeholder='Enter name...' fullWidth onChange={handleInput} />
                        <TextField name="username" required style={fieldStyle} label="Username" variant="standard" placeholder='Enter username...' fullWidth onChange={handleInput} />
                        <TextField name="email" required style={fieldStyle} label="Email" variant="standard" placeholder='Enter email...' fullWidth onChange={handleInput} />
                        <TextField name="password" required style={fieldStyle} type="password" label="Password" variant="standard" placeholder='Enter password...' fullWidth onChange={handleInput} />
                    </Grid>
                    <Button onClick={signUp} style={{ margin: "20px 0px" }} variant="contained" fullWidth>Sign up</Button>
                    {(progress && !existUserOrMail) && <Box>
                        <LinearProgress />
                        <div><p style={{ marginTop: '5px', fontSize: '12px' }}>Sending...</p></div>
                    </Box>
                    }
                    {existUserOrMail && <p style={{ fontSize: "11px", color: "red" }}>Đăng ký thất bại: username hoặc email bạn nhập đã tồn tại!</p>}


                    <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Link href="/login"><Typography style={{ fontSize: "14px" }}>Already have an account? Signin</Typography></Link>
                    </Grid><br></br>

                    <Grid></Grid>

                </Paper>
            </Grid>
            {/* {(success) && <Popup handleClose={handleClose} open={open} style={style} success={success} ></Popup>} */}
        </>)
    }
}


// function Popup(props) {
//     return <div>
//         <Modal
//             open={props.open}
//             onClose={props.handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box sx={props.style}>
//                 <Typography style={{color:"green"}} id="modal-modal-title" variant="h6" component="h2">
//                     Đăng ký thành công !
//                 </Typography>
//                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                     {props.success && 'Tạo tài khoản thành công. Quay lại trang đăng nhập!'}
//                 </Typography>
//                 <Button href='https://translate.google.com/?hl=vi'>quay lai signin</Button>
//             </Box>
//         </Modal>
//     </div>
// }

