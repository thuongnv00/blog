import React, { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle, Box, Button, Container, LinearProgress, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { event } from "jquery";
export default function FormResetPass() {

    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const[success,setSuccess] = useState(false)
    const [fail,setFail] = useState(false)
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState('')

    const onChange = (event) => {
        if (event.target.name === 'newPass') {
            setNewPass(event.target.value)
        }
        if (event.target.name === 'confirmPass') {
            setConfirmPass(event.target.value)
        }
    }

    const onSuccess = ()=> {
        setSuccess(false)
    }
    const onFail = ()=> {
        setFail(false)
    }


    const resetPass = () => {
        setLoading(true);
        setFail(false);
        setSuccess(false);
        let data = JSON.stringify({
            "newPassword": newPass,
            "confirmPassword": confirmPass
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://blog-dev-23.herokuapp.com/resetPassword/user/changePassword/token=' + localStorage.getItem('passwordToken'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setSuccess(true);
                setLoading(false);
                console.log(JSON.stringify(response.data));
                setData(response.data.message)
            })
            .catch((error) => {
                setFail(true);
                setLoading(false)
                console.log(error);
                setData(error.response.data.message)
            });
    }
    return (<>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Snackbar open={success} autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={onSuccess}>
                <Alert onClose={onSuccess} severity="success" sx={{ width: '100%' }}>
                    <AlertTitle><strong>Success</strong> </AlertTitle>
                    Cập nhật mật khẩu thành công!

                </Alert>
            </Snackbar>

            <Snackbar open={fail} autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={onFail}>
                <Alert onClose={onFail} severity="error" sx={{ width: '100%' }}>
                    <AlertTitle><strong>Lỗi xảy ra!</strong> </AlertTitle>
                    {data}

                </Alert>
            </Snackbar>

            <Box sx={{ width: '500px', height: '50vh' }}>
                <Paper align='center' sx={{ boxShadow: 'none' }}>
                    <Link to="/">
                        <MenuBookOutlinedIcon sx={{ width: '50px', height: '50px', color: 'black' }} />
                    </Link>
                </Paper>


                <Paper sx={{ padding: '30px 20px', margin: '30px 0' }}>
                    <Typography variant="h5" sx={{ margin: '20px 0' }}>Đặt lại mật khẩu</Typography>
                    <p style={{ fontSize: '13px' }}>Gần xong, thay đổi mật khẩu của bạn để hoàn thành.
                        Bạn nên chọn một mật khẩu mạnh để ngăn truy cập trái phép vào tài khoản của mình
                    </p>

                    <div>
                        <div style={{ fontSize: '14px', paddingBottom: '5px' }}>
                            <span style={{ paddingRight: '5px', color: 'red' }}>*</span>
                            Mật khẩu mới
                        </div>
                        <div><TextField name="newPass" variant="outlined" size="small" placeholder="" onChange={onChange} fullWidth></TextField></div>
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <div style={{ fontSize: '14px', paddingBottom: '5px' }}>
                            <span style={{ paddingRight: '5px', color: 'red' }}>*</span>
                            Xác nhận mật khẩu mới
                        </div>
                        <div><TextField name="confirmPass" variant="outlined" size="small" placeholder="" onChange={onChange} fullWidth></TextField></div>
                    </div>

                    {/* {!isValidate && <div style={{ fontSize: '11px', color: 'red' }}>{err}</div>} */}
                    <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="small" variant="contained" sx={{ textTransform: 'initial' }} onClick={resetPass}>Thay đổi mật khẩu</Button>
                    </div>

                    {(loading) && <Box>
                        <LinearProgress />
                        <div><p style={{ marginTop: '5px', fontSize: '12px' }}>Sending...</p></div>
                    </Box>
                    }


                </Paper>

            </Box>
        </Container>

    </>)
}