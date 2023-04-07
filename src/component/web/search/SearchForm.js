import { Avatar, Box, Button, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, PaginationItem, Paper, Stack, styled, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from '../header/Navbar'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import usePagination from "@mui/material/usePagination/usePagination";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";

export default function SearchForm() {

    const [name, setName] = useState("")
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [isSuccess, setIsSuccess] = useState(false)
    const navigate = useNavigate();

    const recordsPerPage = 5;
    const lastIndex = page * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    console.log(data)
    const numOfPages = Math.ceil(data.length / recordsPerPage);


    // useEffect(() => {
    //     onSearch();
    // }, [page])


    console.log('page=>>>>>>>>>', page)

    let onChangeParam = (event) => {
        if (event.target.name === "param") {
            setName(event.target.value)
        }
    }
    let onSearch = () => {
        setIsSuccess(false);
        setPage(page);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/blog/search?text=' + name,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.data);
                setData(response.data.data);
                // navigate('/search?q='+ name + '&page=' + page);
                setIsSuccess(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        elevation: 0
    }));
    return (<>
        <Navbar></Navbar>
        <Container>
            <div className="col-md-12" style={{ marginTop: 20, textAlign: 'center' }}>
                <TextField size="small" placeholder="search..." ariant="outlined" name='param' onChange={onChangeParam} ></TextField>
                <Button onClick={onSearch} variant="contained" sx={{ boxShadow: 'none', alignItems: 'center', backgroundColor: 'none !important' }}>
                    <SearchIcon></SearchIcon>
                </Button>

            </div>
            {records.map(item => (
                <div className="col-md-9" style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                    <div className="col-md-1">
                        <Avatar style={{ marginLeft: 20 }} alt="Remy Sharp" src="https://media.istockphoto.com/id/1317323736/vi/anh/m%E1%BB%99t-c%C3%A1i-nh%C3%ACn-l%C3%AAn-b%E1%BA%A7u-tr%E1%BB%9Di-h%C6%B0%E1%BB%9Bng-c%C3%A2y.jpg?s=612x612&w=is&k=20&c=uxc5NtDelj444cHZBOy2pAm2U7Wj4RakFqaeeWsFYbY=" />
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}} className="col-md-8">
                        <div>{item.title}</div>
                       <div>{item.content.length>0 && item.content.slice(0,200)}...</div> 
                    </div>
                </div>
            ))}
            {isSuccess && <div style={{ marginTop: '20px' }}><Pagination page={numOfPages} setCurrentButton={setPage} /></div>}


            {/* <Box sx={{ flexGrow: 1 }}>
                <Paper elevation={0}>
                    <Grid container spacing={2} columns={12}>
                        {records.map((items) => {
                            return <>
                                <Grid xs={1}>
                                    <Avatar style={{ marginLeft: 20 }} alt="Remy Sharp" src="https://media.istockphoto.com/id/1317323736/vi/anh/m%E1%BB%99t-c%C3%A1i-nh%C3%ACn-l%C3%AAn-b%E1%BA%A7u-tr%E1%BB%9Di-h%C6%B0%E1%BB%9Bng-c%C3%A2y.jpg?s=612x612&w=is&k=20&c=uxc5NtDelj444cHZBOy2pAm2U7Wj4RakFqaeeWsFYbY=" />                                  
                                </Grid>
                                <Grid xs={11}>
                                    <div>{items.title}</div>
                                </Grid>

                            </>
                        })}
                    </Grid>
                    {isSuccess && <div style={{ marginTop: '20px' }}><Pagination page={numOfPages} setCurrentButton={setPage} /></div>}
                </Paper>
            </Box> */}
        </Container>



    </>)
}