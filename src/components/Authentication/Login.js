import { Button,Box, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import {auth} from "../../firebase-config";
import {signInWithEmailAndPassword} from "firebase/auth"
import { CryptoState } from '../../CryptoContext';

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAlert } = CryptoState();

    const handleSubmit = async () => {
        if (!email || !password) {
            setAlert({
                open: true,
                message: "Please fill all details",
                type: "error",
            });
            return;
        }

        try {
            const result=await signInWithEmailAndPassword(auth,email,password);
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`,
                type: "success",
            });

            handleClose();
        }
        catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
            return;
        }
    };

    return (
        <Box p={3} style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
        }}>
            <TextField
                variant="outlined"
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />

            <TextField
                variant="outlined"
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />

            <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                style={{ backgroundColor: "gold" }}
            >Login</Button>
        </Box>
    );
};

export default Login;