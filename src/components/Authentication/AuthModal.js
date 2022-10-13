import { Button, makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";
import { Tab, Tabs, AppBar, Box } from "@material-ui/core";
import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase-config";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        color: "white",
        borderRadius: 10,
    },
    google: {
        padding: 24,
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 20,
        fontSize: 20,
    },
}));

export default function AuthModal() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const { setAlert, setUser } = CryptoState();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((res) => {
            setAlert({
                open: true,
                message: `Sign up Successful. Welcome ${res.user.email}`,
                type: "success",
            });
            console.log("success:", res)

            setUser(res.user)

            handleClose();
        })
            .catch((error) => {
                console.log("error:", error);
                setAlert({
                    open: true,
                    message: error.message,
                    type: "error",
                });
                return;
            });
    };

    return (
        <div>
            <Button
                variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    marginLeft: 15,
                    backgroundColor: "#eebc1d",
                }}
                onClick={handleOpen}
            >Login</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <AppBar
                            position="static"
                            style={{
                                backgroundColor: "transparent",
                                color: "white",
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                style={{ borderRadius: 10 }}
                            >
                                <Tab label="Login" />
                                <Tab label="Sign Up" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <Signup handleClose={handleClose} />}
                        <Box className={classes.google}>
                            <span>OR</span>
                            <GoogleButton style={{ width: "100%", outline: "none" }}
                                onClick={signInWithGoogle} />
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}