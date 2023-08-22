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

const UserAddEditProfileInformation = ({
    formikProps,
    departmentList,
    positionList,
    employeeTypeList,
    getDepartments,
    getPositions,
    getEmployeeTypes
}) => {

    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Darbinieka profils
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4} xl={4}>
                    <TextField
                        label="Vārds"
                        name="first_name"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        value={formikProps.values.first_name}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        helperText={<ErrorMessage name="first_name" />}
                        error={formikProps.errors.first_name && formikProps.touched.first_name}
                    />
                </Grid>
                <Grid item xs={12} lg={4} xl={4}>
                    <TextField
                        label="Uzvārds"
                        name="last_name"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        value={formikProps.values.last_name}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        helperText={<ErrorMessage name="last_name" />}
                        error={formikProps.errors.last_name && formikProps.touched.last_name}
                    />
                </Grid>
                <Grid item xs={12} lg={4} xl={4}>
                    <TextField
                        label="Telefona numurs"
                        name="phone"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        value={formikProps.values.phone}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        helperText={<ErrorMessage name="phone" />}
                        error={formikProps.errors.phone && formikProps.touched.phone}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl error={!!formikProps.errors.cost_rate} variant="standard" fullWidth>
                        <InputLabel htmlFor="user-cost_rate">Stundas likme (Izdevumi)</InputLabel>
                        <Input
                            id="user-cost_rate"
                            aria-describedby="user-cost_rate-text"
                            name={"cost_rate"}
                            startAdornment={<InputAdornment position="start">&euro;</InputAdornment>}
                            value={formikProps.values.cost_rate}
                            onChange={formikProps.handleChange}
                        />
                        {formikProps.errors.cost_rate && (
                            <FormHelperText id="user-cost_rate-text">{formikProps.errors.cost_rate}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl error={!!formikProps.errors.bill_rate} variant="standard" fullWidth>
                        <InputLabel htmlFor="user-cost_rate">Stundas likme (Peļņa)</InputLabel>
                        <Input
                            id="user-bill_rate"
                            aria-describedby="user-bill_rate-text"
                            name={"bill_rate"}
                            startAdornment={<InputAdornment position="start">&euro;</InputAdornment>}
                            value={formikProps.values.bill_rate}
                            onChange={formikProps.handleChange}
                        />
                        {formikProps.errors.bill_rate && (
                            <FormHelperText id="user-bill_rate-text">{formikProps.errors.bill_rate}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl error={!!formikProps.errors.utilization_target} variant="standard" fullWidth>
                        <InputLabel htmlFor="user-utilization_target">Slodze (%)</InputLabel>
                        <Input
                            id="user-utilization_target"
                            aria-describedby="user-utilization_target-text"
                            name={"utilization_target"}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                            value={formikProps.values.utilization_target}
                            onChange={formikProps.handleChange}
                        />
                        {formikProps.errors.utilization_target && (
                            <FormHelperText id="user-utilization_target-text">{formikProps.errors.utilization_target}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl fullWidth margin={"dense"}>
                        <AsyncSelect
                            dataSource={getEmployeeTypes}
                            dataList={employeeTypeList}
                            title={"Darbinieka tips"}
                            name={"employee_type"}
                            variant={"standard"}
                            setFieldValue={formikProps.setFieldValue}
                            inputValue={formikProps.values.employee_type}
                        />
                        <ErrorMessage name={"employee_type"} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl fullWidth margin={"dense"}>
                        <AsyncSelect
                            dataSource={getDepartments}
                            dataList={departmentList}
                            title={"Departaments"}
                            name={"department"}
                            variant={"standard"}
                            setFieldValue={formikProps.setFieldValue}
                            inputValue={formikProps.values.department}
                            displayFieldValueName={"name_full"}
                        />
                        <ErrorMessage name={"department"} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4} xl={4}>
                    <FormControl fullWidth margin={"dense"}>
                        <AsyncSelect
                            dataSource={getPositions}
                            dataList={positionList}
                            title={"Pozīcija"}
                            name={"position"}
                            variant={"standard"}
                            setFieldValue={formikProps.setFieldValue}
                            inputValue={formikProps.values.position}
                            displayFieldValueName={"name_full"}
                        />
                        <ErrorMessage name={"position"} />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6} xl={6}>
                    <DatePicker
                        sx={{ mt: 3 }}
                        label={"Pirmā darba diena"}
                        onChange={(value) => formikProps.setFieldValue("first_day_of_work", value, false)}
                        value={formikProps.values.first_day_of_work}
                        format={"YYYY-MM-DD"}
                    />
                    {formikProps.errors.first_day_of_work && (
                        <FormHelperText error id="user-first_day_of_work-text">{formikProps.errors.first_day_of_work}</FormHelperText>
                    )}
                </Grid>
            </Grid>
        </>
    )
};

export default UserAddEditProfileInformation;
