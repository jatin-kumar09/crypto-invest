import React from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import {
    AppBar, Container,
    Toolbar, Typography,
    Select, MenuItem, makeStyles, createTheme, ThemeProvider, Button
} from "@material-ui/core";
import Login from '../Pages/Login';
import UserSidebar from './Authentication/UserSidebar';
import AuthModal from './Authentication/AuthModal';

const useStyles = makeStyles(theme => ({
    title: {
        flex: 1,
        color: '#FFFF33',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
}));

const Header = () => {

    const classes = useStyles();
    const history = useNavigate();

    const { currency, setCurrency,user } = CryptoState();

    console.log(currency);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={
                            () => history('/')}
                            className={classes.title}>Crypto Invest
                        </Typography>

                        <Select variant="outlined" style={{
                            width: 100,
                            height: 40,
                            marginLeft: 15,
                        }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>

                        {/* <Button onClick={<Login />}>Login</Button> */}
                        {/* <Login /> */}
                        {user ? <UserSidebar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header