
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
export default function SignupForm() {

    const [fullname,setFullname] = useState("")
    const [email,setEmail] = useState("");
    const [city,setCity] = useState("");

    const [error,setError] = useState("");
    const [isvalid,setIsvalid] = useState(true);
    



    let handleInput =(event) => {
        if(event.target.name==="fullname") {
            setFullname(event.target.value)
            if(event.target.value.length < 1){
                setError("fullname required")
                setIsvalid(false)
            }
        }

        if(event.target.name==="email") {
            setEmail(event.target.value)
        }

        if(event.target.name==="city") {
            setCity(event.target.value)
        }
    }


    return (<>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    value={fullname}
                    id="outlined"
                    label="Fullname"
                    onChange={(event)=> {
                        setFullname(event.target.value)                      
                    }}
                    name="fullname"
                />
            {fullname.length < 1 && "requried"}
            </div>
            <div>
                <TextField
                    value={email}
                    id="filled"
                    label="email"
                    variant="filled"
                    // onChange={handleInput}
                    name = "email"
                />
                
            </div>
            <div>
                <TextField
                    value={city}
                    id="standard"
                    label="city"
                    variant="standard"
                    // onChange={handleInput}
                    name = "city"
                />
            </div>
        </Box>
    </>)
}