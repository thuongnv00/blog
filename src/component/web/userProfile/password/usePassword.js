import React, { useState } from "react"
import axios from "axios"
export function usePassword(token) {

    const[success,setSuccess] = useState(false)
    const[fail,setFail] = useState(false)
    const[result,setResult] = useState('')

    const handleFail=()=> {
        setFail(false);
        // window.location.reload()
    }

    const handleSuccess=()=> {
        setSuccess(false);
        window.location.reload()
    }

    let updatePass = (currentPass,newPass,confirmPass) => {
        setSuccess(false);
        setFail(false);
        let data = JSON.stringify({
            "oldPassword": currentPass,
            "newPassword": newPass,
            "confirmPassword": confirmPass
        });

        console.log('data ==========>',data)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://blog-dev-23.herokuapp.com/resetPassword/user/updatePassword',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if(response.data.status ===200) {
                    setSuccess(true);
                    setFail(false)
                    setResult(response.data);
                }
            })
            .catch((error) => {
                console.log(error.response.status);
                setResult(error.response.data);
                setFail(true)
                setSuccess(false);
            });

    }

    return {success,fail,result,updatePass,handleFail,handleSuccess}
}

