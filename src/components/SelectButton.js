import React from 'react'
import classNames from "classnames";
import { makeStyles } from '@material-ui/core';

const useStyles= makeStyles(theme => ({
    selectButton:{
        border:"1px solid gold",
        borderRadius:5,
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        fontFamily:"Montserrat",
        cursor:"pointer",
        backgroundColor: "",
        color: "",
        fontWeight: 500,
        "&:hover":{
            backgroundColor:"gold",
            color:"black",
        },
        width:"22%",
    },
    selected: {
        backgroundColor: "gold",
        color: "black",
        fontWeight: 700
    }
}));

const SelectButton = ({children,selected,onClick}) => {

    const classes= useStyles();
  return (
    <span onClick={onClick}
    className={classNames(classes.selectButton, {
        [classes.selected]: selected
    })}
    >{children}</span>
  )
}

export default SelectButton;