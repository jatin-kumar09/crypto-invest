import { Snackbar } from "@material-ui/core";
// import { Alert } from "@material-ui/lab";
import { CryptoState } from "../CryptoContext";

const Alert=()=>{
    const {alert,setAlert}=CryptoState();

    const handleCloseAlert=(event,reason)=>{
        if(reason==="clickaway"){
            return;
        }

        setAlert({open:false});
    };

    return(
        <Snackbar 
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        >
            <Alert
            onClose={handleCloseAlert}
            elevation={10}
            variant="filled"
            severity={alert.type}
            >{alert.message}</Alert>

        </Snackbar>
    );
};

export default Alert;
