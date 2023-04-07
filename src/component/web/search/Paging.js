import { Box, Button, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Paging() {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [text, setText] = useState('')
    const [total,setTotal] = useState(0)
    const handleChange = (event, value) => {
        console.log(event, value)
        setPage(value);
    };

    const onClick = () => {
        getInfo();
    }

    useEffect(()=> {
        getInfo();
    },[page])

    const getInfo = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/blog/search/?text=' + text + '&page=' + page,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                // setData(JSON.stringify(response.data.data))
                console.log(response.data.data);
                // setTotal(response.data.data.totalElements);
                setData(response.data.data.content);
                setTotal(response.data.data.totalElements)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (<>
        <TextField onChange={(event) => { setText(event.target.value) }}></TextField>
        <Button onClick={getInfo}>click</Button>
        <div>
            {data.map((item) =>{
                return <p key={item.id}>{item.title}</p>
            })}
        </div>
        <div className="">
            <Pagination count={Math.ceil(total/5)} onChange={handleChange} onClick={onClick}></Pagination>
        </div>
    </>)

    

    // const [total,setTotal] = useState(0)

    // const {search} = useLocation()

    // const params = new URLSearchParams(search)

    // console.log(search.pathname)



    // useEffect(() => {
    //     getInfo();
    // }, [page])

    // const getInfo = () => {
    //     let config = {
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: 'http://localhost:8080/blog/search/?text=se&page=' + page,
    //         headers: {}
    //     };

    //     axios.request(config)
    //         .then((response) => {
    //             // setData(JSON.stringify(response.data.data))
    //             console.log(response.data.data);
    //             setTotal(response.data.data.totalElements);
    //             setData(response.data.data.content);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    // return (
    //     <div className="App">
    //         <div
    //             className="head"
    //             style={{
    //                 width: "fit-content",
    //                 margin: "auto",
    //             }}
    //         >
    //             <h1
    //                 style={{
    //                     color: "green",
    //                 }}
    //             >
    //                 GeeksforGeeks
    //             </h1>
    //             <strong>React MUI Pagination API</strong>
    //         </div>
    //         <br />
    //         <Box
    //             sx={{
    //                 margin: "auto",
    //                 width: "fit-content",
    //                 alignItems: "center",
    //             }}
    //         >   
    //         {data.map((item) => {
    //             return <Typography key={item.id} fontSize={32} align="center">
    //                 Page: {item.title}
    //             </Typography>
    //         })}
    //             <Typography fontSize={32} align="center">
    //                 Page: {page}
    //             </Typography>
    //             <Pagination count={Math.ceil(total/6)} page={page}
    //                 onChange={handleChange} />
    //         </Box>
    //     </div>
    // );
}