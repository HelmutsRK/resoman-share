import * as React from "react";
import {
    Alert,
} from "@mui/material";
import {useState} from "react";


const FormFieldErrors = ({ fieldErrors }) => {
    return (
        <Alert severity="error" sx={{ mb: 2 }}>
            {Object.keys(fieldErrors).map((error, i) => (
                <div key={i}>{fieldErrors[error]}</div>
            ))}
        </Alert>
    )
};

export default FormFieldErrors;
