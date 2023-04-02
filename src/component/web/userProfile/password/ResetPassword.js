import React, { useState } from "react";
import axios from "axios";
import { Alert, Box, Button, Container, LinearProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { Link } from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';

export default function ResetPassword() {

    const [passToken, setPassToken] = useState('')
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');
    const [isValidate, setIsValidate] = useState(false);
    const [errColor, setErrColor] = useState('#409eff');
    const [message, setMessage] = useState('');
    const [isFail, setIsFail] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [progress, setProgress] = useState(false);

    const sendEmail = () => {
        setProgress(true);
        setIsFail(false);
        setIsSuccess(false);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://blog-dev-23.herokuapp.com/resetPassword?email=' + email,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                if (response.data.status === 200) {
                    localStorage.setItem('passwordToken', response.data.message);
                    setMessage("Gửi email thành công: một liên kết đã được gửi đến email của bạn. Hãy kiểm tra hộp thư thoại (có thể lưu trong mục 'Thư rác')");
                    setProgress(false);
                    setIsSuccess(true);
                    setIsFail(false);
                }
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setMessage(error.response.data.message);
                setIsFail(true);
                setIsSuccess(false);
            });

    }

    let onChange = (event) => {
        setEmail(event.target.value);
        if (!event.target.value) {
            setErr('Email là bắt buộc.');
            setIsValidate(false);
            setErrColor('red')
        }
        else if (!/^(.+)@(\S+)$/i.test(email)) {
            setErr('Vui lòng nhập địa chỉ email chính xác.');
            setIsValidate(false);
            setErrColor('red')
        } else {
            setErr('');
            setErrColor('#409eff');
            setIsValidate(true)
        }
    }
    const style = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: errColor
            }
        }
    }

    const onClose = () => {
        setIsSuccess(false);
        window.location.reload();
    }
    return (<>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {isSuccess && <div style={{ position: 'absolute', zIndex: '2000', top: '0px' }}>
                <Stack sx={{ width: '600px' }} spacing={2}>
                    <Alert onClose={onClose}>Gửi email thành công: một liên kết đã được gửi đến email của bạn. Hãy kiểm tra hộp thư thoại (có thể lưu trong mục <strong>Thư rác</strong>)</Alert>
                </Stack>
            </div>}
            <Box sx={{ width: '500px', height: '50vh' }}>

                <Paper align='center' sx={{ boxShadow: 'none' }}>
                    <Link to="/">
                        <MenuBookOutlinedIcon sx={{ width: '50px', height: '50px', color: 'black' }} />
                    </Link>
                </Paper>


                <Paper sx={{ padding: '30px 20px', margin: '30px 0' }}>
                    <Typography variant="h5" sx={{ margin: '20px 0' }}>Quên mật khẩu</Typography>
                    <p style={{ fontSize: '13px' }}>Bạn đã quên mật khẩu? Để đặt lại mật khẩu cho tài khoản của bạn
                        hãy điền thông tin email mà bạn đã sử dụng để đăng ký tài khoản.
                        Chúng tôi sẽ gửi một liên kết qua email này để tiến hành đặt lại mật khẩu!
                    </p>

                    <div>
                        <span style={{ paddingRight: '5px', color: 'red' }}>*</span>
                        Địa chỉ email của bạn
                    </div>
                    <TextField variant="outlined" size="small" fullWidth placeholder="" onChange={onChange} sx={style}></TextField>
                    {!isValidate && <div style={{ fontSize: '11px', color: 'red' }}>{err}</div>}
                    <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="small" variant="contained" sx={{ textTransform: 'initial' }} onClick={sendEmail} disabled={!isValidate}>Gửi mail cho tôi</Button>
                    </div>

                    {(progress && !isFail) && <Box>
                        <LinearProgress />
                        <div><p style={{ marginTop: '5px', fontSize: '12px' }}>Sending...</p></div>
                    </Box>
                    }

                    {isFail && <Typography color='red' sx={{ display: "flex", justifyContent: "flex-start", fontSize: "14px", alignItems: 'center' }}>
                        <ErrorIcon sx={{ marginRight: '5px' }} />
                        Email này chưa được đăng ký!
                    </Typography>
                    }

                </Paper>

            </Box>
        </Container>
    </>)
}