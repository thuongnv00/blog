import React from "react";
import axios from "axios";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { Link } from "react-router-dom";
export default function ResetPassword() {

    const sendEmail = () => {

    }
    return (<>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '400px', height: '50vh' }}>
                <Paper align='center'sx={{boxShadow:'none'}}>
                    <Link to="/">
                        <MenuBookOutlinedIcon sx={{ width: '50px', height: '50px', color: 'black' }} />
                    </Link>
                </Paper>


                <Paper sx={{ padding: '30px 20px', margin: '30px 0' }}>
                    <Typography variant="h5" sx={{ margin: '20px 0' }}>Quên mật khẩu</Typography>
                    <p>Bạn đã quên mật khẩu? Để đặt lại mật khẩu cho tài khoản của bạn
                        hãy điền thông tin email mà bạn đã sử dụng để đăng ký tài khoản.
                        Chúng tôi sẽ gửi một liên kết qua email này để tiến hành đặt lại mật khẩu!
                    </p>

                    <div>
                        <span style={{ paddingRight: '5px', color: 'red' }}>*</span>
                        Địa chỉ email của bạn
                    </div>
                    <TextField variant="outlined" size="small" fullWidth placeholder=""></TextField>
                </Paper>

            </Box>
        </Container>
    </>)
}