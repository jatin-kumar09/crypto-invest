import { Avatar, Drawer, makeStyles, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { numberWithCommas } from '../Banner/Carousel';
import { AiFillDelete } from "react-icons/ai";
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#eebc1d",
        marginTop: 20,
    },
    picture: {
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundColor: "#eebc1d",
        objectFit: "contain",
    },
    watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    },
    coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eebc1d",
        boxShadow: "0 0 3px black"
    },
});

function UserSidebar() {
    const classes = useStyles();
    const [state, setState] = useState({
        right: false,
    });

    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    console.log(watchlist, coins);

    const toggleDrawer = (anchor, open) => (event) => {
        if (!event) return;
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    const logOut = () => {
        console.log("trying to logout...");
        signOut(auth).then(() => {
            console.log("sign out success");
            setAlert({
                open: true,
                type: "success",
                message: "Logout Successful",
            });
            
            toggleDrawer();
            window.location.reload();
        }).catch(err => console.log(err));
    };

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist.filter((wish) => wish !== coin?.id) },
                { merge: true }
            );

            setAlert({
                open: true,
                message: `${coin.name} Removed from the Watchlist !`,
                type: "success",
            });
        }
        catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };


    return (
        <div>
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            marginLeft: 15,
                            cursor: "pointer",
                            backgroundColor: "#eebc1d",

                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                        Watchlist
                                    </span>
                                    {coins?.map((coin) => {
                                        if (watchlist.includes(coin.id))
                                            return (
                                                <div className={classes.coin}>
                                                    <span>{coin.name}</span>
                                                    <span style={{ display: "flex", gap: 8 }}>
                                                        {symbol}{" "}
                                                        {numberWithCommas(coin.current_price.toFixed(2))}
                                                        <AiFillDelete
                                                            style={{ cursor: "pointer" }}
                                                            fontSize="16"
                                                            onClick={() => removeFromWatchlist(coin)}
                                                        />
                                                    </span>
                                                </div>
                                            );
                                        else return <></>;
                                    })}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                className={classes.logout}
                                onClick={logOut}
                            >Log Out</Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};

export default UserSidebar;