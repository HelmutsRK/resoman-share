import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Link,
    ThemeProvider,
    Typography,
    createTheme, Alert,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {
    deleteUserAuthDataInLocalStorage,
    saveUserAuthDataInLocalStorage,
    validateUserAuth
} from "../../helpers/authHelper";
import React, {useEffect, useState} from "react";
import {api} from "../../helpers/api";

// Error paziņojums, kas parādās, ja ir kāda kļūda ar autorizēšanos

function FieldErrorMessage(msg) {
    return (
        <span style={{ color: "red", fontSize: 12 }}>{msg}</span>
    )
}

// Autorizācijas lapa
const LoginPage = () => {
    //Pārvirzišana uz citu, lapu
    const navigate = useNavigate();
    //Formas errora piešķiršana
    const [formError, setFormError] = useState(null);

    //Noklikšķinot uz formas pogu "IELOGOTIES" tiek izsaukta šī funkcija, kas nodod ievadītos datus uz backend daļu.
    const onSubmit = async(values) => {
        // Veic asinhronu pieprasījumu api metodi POST uz /auth/login
        await api({
            method: 'POST',
            endpoint: '/auth/login',
            data: {
                email: values.email,
                password: values.password
            },
            successCallback: (response) => {
                // Atbilstoši veiksmīgam atbildes rezultātam iegūst 'token' un 'user' no atbildes datiem
                const token = response.data.data.token;
                const user = response.data.data.user;

                // Ja ir 'token', saglabā lietotāja autentifikācijas datus vietējā krātuvē un pārvirza uz '/projects'
                if (token) {
                    saveUserAuthDataInLocalStorage(token, user);
                    return navigate('/projects')
                }
            },
            // Ja pieprasījums neizdodas ar kļūdas statusu 401, iestata formas kļūdu paziņojumu
            failureCallback: (err) => {
                if (err.response.status === 401) {
                    setFormError('Lietotājs ar šādu epastu un/vai paroli netika atrasts!')
                }
            }
        })
    }

    const LoginSchema = Yup.object().shape({
        // Validācijas shēma 'LoginSchema' definē prasības laukam 'password'
        password: Yup.string().required('Obligāts lauks'),
        // Validācijas shēma 'LoginSchema' definē prasības laukam 'email'
        email: Yup.string().email('Nekorekts e-pasts').required('Obligāts lauks'),
    });

    // Sākotnējās vērtības formas laukiem
    const initialValues = {
        email: "",
        password: ""
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => onSubmit(values)}
        >
            {({ isSubmitting }) => (
                <Form>
                    {/* Parāda formas kļūdu paziņojumu, ja tāda ir */}
                    {formError && (
                        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{formError}</Alert>
                    )}

                    {/* Lietotāja ievades lauks 'email' */}
                    <Field
                        as = {TextField}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="E-pasts"
                        type="text"
                        name="email"
                        autoFocus
                    />
                    {/* Parāda kļūdu paziņojumu, ja ir kļūda 'email' laukā */}
                    <ErrorMessage name="email" render={(msg) => FieldErrorMessage(msg)} />
                    
                    {/* Lietotāja ievades lauks 'password' */}
                    <Field
                        as = {TextField}
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Parole"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/* Parāda kļūdu paziņojumu, ja ir kļūda 'password' laukā */}
                    <ErrorMessage name="password" render={(msg) => FieldErrorMessage(msg)} />
                    
                    {/* Ielogoties poga */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Ielogoties
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
// Eksportē 'LoginPage' komponenti, lai tā būtu pieejama citos failos
export default LoginPage;
