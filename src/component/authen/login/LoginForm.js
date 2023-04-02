
import React, { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { Avatar, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Input, InputLabel, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CheckBox } from '@mui/icons-material';
import Navbar from '../../web/header/Navbar';
import axios from 'axios';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router';

export default function LoginForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isToken, setIsToken] = useState(localStorage.getItem('token') ? true : false)
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

  
    useEffect(()=> {
        let auth = localStorage.getItem('token');
        if(auth && auth !== 'undefinded' ) {
            navigate("/")
        }
    },[])


    const pages = [
        {
            badge: 'Bài viết',
            navigate: 'following'
        },
        {
            badge: 'Hỏi đáp',
            navigate: 'question'
        },
        {
            badge: 'Thảo luận',
            navigate: 'discusion'
        }
    ];


    const paperStyle = { width: 350, padding: '40px' }
    const avatarStyle = { backgroundColor: "green" }

    let fieldStyle = { paddingBottom: "20px" }

    let onChange = (event) => {
        if (event.target.name === 'username') {
            setUsername(event.target.value)
        }

        if (event.target.name === 'password') {
            setPassword(event.target.value)
        }

    }

    let login = () => {
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://blog-dev-23.herokuapp.com/api/auth/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token)
                    console.log(JSON.stringify(response.data));
                    navigate("/")
                }
                else {
                    throw new Error()
                }

            })
            .catch((error) => {
                setErr(true)
                localStorage.removeItem('token')
                console.log(error);
            });
    }


    return (<>
        <Navbar></Navbar>
        <Container>
            <Grid sx={{ backgroundColor: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={3} style={paperStyle} >
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign in</h2>
                    </Grid>
                    <TextField onChange={onChange} name='username' style={fieldStyle} required variant="standard" label="Username" placeholder='Enter the username' fullWidth />
                    <TextField onChange={onChange} name='password' style={fieldStyle} required variant="standard" type='password' label="Password" placeholder='Enter the password' fullWidth />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                    </FormGroup>
                    <Button type='submit' style={{ margin: "10px 0" }} fullWidth variant="contained" onClick={login}>Sign in</Button>
                    <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Typography style={{ fontSize: "14px" }}>
                            <Link href='/resetPassword'>Forgot password</Link>
                        </Typography></Grid>
                    <Typography style={{ display: "flex", justifyContent: "flex-end", fontSize: "14px" }}>
                        <Link href='/signup'>Don't have an account yet? Let's signup</Link>
                    </Typography>

                    { err && <Typography style={{ display: "flex", justifyContent: "flex-end", fontSize: "14px",color:'red',paddingTop:20}}>
                        <ErrorIcon sx={{marginRight:'10px'}}></ErrorIcon>  Đăng nhập thất bại: Tên đăng nhập hoặc mật khẩu không chính xác!
                    </Typography>}
                    <br />
                </Paper>
            </Grid>
        </Container>
    </>)
}