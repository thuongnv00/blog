import '../signup/Test.css'
import React from "react";
import { red } from "@mui/material/colors";
import { Avatar, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Input, InputLabel, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CheckBox } from '@mui/icons-material';
import Navbar from '../../web/header/Navbar';
export default function LoginForm() {

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


    return (<>
        <Navbar></Navbar>
        <Container>
            <Grid sx={{ backgroundColor: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={3} style={paperStyle} >
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign in</h2>
                    </Grid>
                    <TextField required variant="standard" label="Username" placeholder='Enter the username' fullWidth />
                    <TextField required variant="standard" type='password' label="Password" placeholder='Enter the password' fullWidth />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                    </FormGroup>
                    <Button type='submit' style={{ margin: "10px 0" }} fullWidth variant="contained" >Sign in</Button>
                    <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Typography style={{ fontSize: "14px" }}>
                            <Link href='/'>Forgot password</Link>
                        </Typography></Grid>
                    <Typography style={{ display: "flex", justifyContent: "flex-end", fontSize: "14px" }}>
                        <Link href='/signup'>Don't have an account yet? Let's signup</Link>
                    </Typography>
                    <br />
                </Paper>
            </Grid>
        </Container>
    </>)
}