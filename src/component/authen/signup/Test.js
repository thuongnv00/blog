import '../signup/Test.css'
import React from "react";
import { red } from "@mui/material/colors";
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Input, InputLabel, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CheckBox } from '@mui/icons-material';
export default function Test() {

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


    const paperStyle = { width: 350, height: '75vh', margin: "20px auto", padding: "20px" }
    const avatarStyle = { backgroundColor: "green" }


    return (<>
        <Grid>
            <Paper elevation={10} style={paperStyle} >
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sigin</h2>
                </Grid>
                <TextField required variant="standard" label="username" placeholder='enter the username' fullWidth />
                <TextField required variant="standard" type='password' label="password" placeholder='enter the password' fullWidth />
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                </FormGroup>
                <Button type='submit' style={{ margin: "10px 0" }} fullWidth variant="contained" >Sign in</Button>
                <Typography>
                    <Link href='/'>Forgot password</Link>
                </Typography><br />
                <Typography> Don't have a account. Let's
                    <Link href='/'> signup</Link>
                </Typography>

                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>

            </Paper>
        </Grid>
    </>)
}