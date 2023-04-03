import { Avatar, Box, Button, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Pagination, PaginationItem, Paper, Stack, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import Navbar from '../header/Navbar'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import usePagination from "@mui/material/usePagination/usePagination";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SearchForm() {

    const [name, setName] = useState("")
    const [data, setData] = useState([])

    const [page, setPage] = useState('')

    const per_page = 5;

    const count = Math.ceil(data.length / per_page);
    const _DATA = usePagination(data, per_page);

    // const handleChange = (e, p) => {
    //     setPage(p);
    //     _DATA.jump(p)
    // }

    const [pageApi, setPageApi] = useState(1);
    let onChangeParam = (event) => {
        if (event.target.name === "param") {
            setName(event.target.value)
        }

    }


    let onSearch = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/blog/search/?text=' + name,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                // setData(JSON.stringify(response.data.data))
                console.log(response.data.data);
                setData(response.data.data.content);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        elevation: 0
    }));

    return (<>
        <Navbar></Navbar>
        <Container>
            <Grid sx={{ marginTop: 20, textAlign: 'center' }}>
                <TextField size="small" placeholder="search..." ariant="outlined" name='param' onChange={onChangeParam} ></TextField>
                <Button onClick={onSearch} variant="contained" sx={{ boxShadow: 'none', alignItems: 'center', backgroundColor: 'none !important' }}>
                    <SearchIcon></SearchIcon>
                </Button>

            </Grid>
            <Box sx={{ flexGrow: 1 }}>
                <Paper elevation={0}>
                    <Grid container spacing={2} columns={12}>
                        {data.map((items) => {
                            return <>
                                <div key={items.id}>
                                    <Grid xs={1}>
                                        <Avatar style={{ marginLeft: 20 }} alt="Remy Sharp" src="https://media.istockphoto.com/id/1317323736/vi/anh/m%E1%BB%99t-c%C3%A1i-nh%C3%ACn-l%C3%AAn-b%E1%BA%A7u-tr%E1%BB%9Di-h%C6%B0%E1%BB%9Bng-c%C3%A2y.jpg?s=612x612&w=is&k=20&c=uxc5NtDelj444cHZBOy2pAm2U7Wj4RakFqaeeWsFYbY=" />
                                    </Grid>
                                    <Grid xs={11}>
                                        <div>{items.title}</div>
                                        {/* <div>{items.content}</div> */}
                                    </Grid>
                                </div>

                                
                            </>

                        })}
                    </Grid>
                    <Pagination count={10} page={pageApi} onChange={(e, value) => setPageApi(value)} />
                </Paper>
            </Box>
        </Container>



    </>)
}