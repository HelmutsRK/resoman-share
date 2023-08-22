import * as React from "react";
import {
    Alert,
    Checkbox,
    FormControl, FormHelperText,
    Grid, Input,
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


const ProjectAddEditBasicInformation = ({ formikProps, customerList, getCustomers }) => {

    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Projekta pamatinformācija
            </Typography>
            <TextField
                label="Nosaukums"
                name="name"
                fullWidth
                variant="standard"
                margin="dense"
                value={formikProps.values.name}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                helperText={<ErrorMessage name="name" />}
                error={formikProps.errors.name && formikProps.touched.name}
            />
            <TextField
                label="Numurs"
                name="number"
                fullWidth
                variant="standard"
                margin="dense"
                value={formikProps.values.number}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                helperText={<ErrorMessage name="number" />}
                error={formikProps.errors.number && formikProps.touched.number}
            />
            <FormControl fullWidth margin={"dense"}>
                <AsyncSelect
                    dataSource={getCustomers}
                    dataList={customerList}
                    title={"Klients"}
                    name={"customer"}
                    variant={"standard"}
                    setFieldValue={formikProps.setFieldValue}
                    inputValue={formikProps.values.customer}
                />
                <ErrorMessage name={"customer"} />
            </FormControl>
            <Grid container spacing={2} sx={{ mb: 4, mt: 2 }}>
                <Grid item xs={12} lg={6} xl={6}>
                    <DatePicker
                        sx={{ width: "100%" }}
                        label={"Uzsākšanas datums"}
                        onChange={(value) => formikProps.setFieldValue("start_date", value, false)}
                        value={formikProps.values.start_date}
                        format={"YYYY-MM-DD"}
                    />
                    {formikProps.errors.start_date && (
                        <FormHelperText error id="project-start_date-text">{formikProps.errors.start_date}</FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} lg={6} xl={6}>
                    <DatePicker
                        sx={{ width: "100%" }}
                        label={"Noslēgšanās datums"}
                        onChange={(value) => formikProps.setFieldValue("end_date", value, false)}
                        value={formikProps.values.end_date}
                        format={"YYYY-MM-DD"}
                    />
                    {formikProps.errors.end_date && (
                        <FormHelperText error id="project-end_date-text">{formikProps.errors.end_date}</FormHelperText>
                    )}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl error={!!formikProps.errors.budget} variant="standard">
                        <InputLabel htmlFor="project-budget">Budžets</InputLabel>
                        <Input
                            id="project-budget"
                            aria-describedby="project-budget-text"
                            name={"budget"}
                            startAdornment={<InputAdornment position="start">&euro;</InputAdornment>}
                            value={formikProps.values.budget}
                            onChange={formikProps.handleChange}
                        />
                        {formikProps.errors.budget && (
                            <FormHelperText id="project-budget-text">{formikProps.errors.budget}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl error={!!formikProps.errors.profit_target} variant="standard">
                        <InputLabel htmlFor="project-budget">Peļņas mērķis</InputLabel>
                        <Input
                            id="project-profit_target"
                            aria-describedby="project-profit_target-text"
                            name={"profit_target"}
                            startAdornment={<InputAdornment position="start">&euro;</InputAdornment>}
                            value={formikProps.values.profit_target}
                            onChange={formikProps.handleChange}
                        />
                        {formikProps.errors.profit_target && (
                            <FormHelperText id="project-profit_target-text">{formikProps.errors.profit_target}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl error={!!formikProps.errors.profit_target} variant="standard">
                        <InputLabel htmlFor="project-hours">Stundas</InputLabel>
                        <Input
                            id="project-hours"
                            aria-describedby="project-hours-text"
                            name={"hours"}
                            startAdornment={<InputAdornment position="start"><QueryBuilderIcon fontSize={"small"} /></InputAdornment>}
                            value={formikProps.values.hours}
                            onChange={formikProps.handleChange}
                        />
                        {formikProps.errors.hours && (
                            <FormHelperText id="project-hours-text">{formikProps.errors.hours}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
};

export default ProjectAddEditBasicInformation;
