import * as React from "react";
import {
    Alert,
    Checkbox, FilledInput,
    FormControl, FormControlLabel, FormGroup, FormHelperText,
    Grid, IconButton, Input,
    InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {api} from "../../../helpers/api";
import {useState, useEffect} from "react";
import AsyncSelect from "../../../components/Inputs/AsyncSelect";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import {Visibility, VisibilityOff} from "@mui/icons-material";

const UserAddEditBasicInformation = ({ formikProps, allowLogin, setAllowLogin }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => { event.preventDefault() };
    const handleClickShowPasswordRepeat = () => setShowPasswordRepeat((show) => !show);
    const handleMouseDownPasswordRepeat = (event) => { event.preventDefault() };

    return (
        <>

            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Darbinieka lietotāja dati
            </Typography>
            <TextField
                label="E-pasts"
                name="email"
                fullWidth
                variant="standard"
                margin="dense"
                value={formikProps.values.email}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                helperText={<ErrorMessage name="email" />}
                error={formikProps.errors.email && formikProps.touched.email}
            />

            <Grid item xs={12} lg={4} xl={4}>
                <FormGroup sx={{ mt: 2, mb: 2 }} >
                    <FormControlLabel control={
                        <Checkbox
                            checked={allowLogin}
                            onChange={(event) => setAllowLogin(event.target.checked)}
                        />
                    } label="Piešķirt piekļuvi sistēmai" />
                </FormGroup>
            </Grid>

            {allowLogin && (
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6} xl={6}>
                        <FormControl sx={{ mb: 2 }} fullWidth variant="standard">
                            <InputLabel htmlFor="user-password">Parole</InputLabel>
                            <Input
                                id="user-password"
                                type={showPassword ? 'text' : 'password'}
                                name={"password"}
                                error={formikProps.errors.password && formikProps.touched.password}
                                onChange={formikProps.handleChange}
                                onBlur={formikProps.handleBlur}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6} xl={6}>
                        <FormControl sx={{ mb: 2 }} fullWidth variant="standard">
                            <InputLabel htmlFor="user-password-repeat">Parole atkārtoti</InputLabel>
                            <Input
                                id="user-password-repeat"
                                type={showPasswordRepeat ? 'text' : 'password'}
                                name={"password_repeat"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordRepeat}
                                            onMouseDown={handleMouseDownPasswordRepeat}
                                        >
                                            {showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            )}
        </>
    )
};

export default UserAddEditBasicInformation;
