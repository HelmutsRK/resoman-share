import * as React from "react";
import {
    Alert,
    Checkbox, Chip,
    FormControl, FormHelperText,
    Grid, Input,
    InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Typography, useTheme
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

const ProjectAddEditNeededSkills = ({ formikProps, skillList, getSkills }) => {

    return (
        <>
            <Typography sx={{ mt: 4, mb: 2 }} component="h2" variant="h6" color="primary" gutterBottom>
                Nepieciešamās kompetences
            </Typography>
            <FormControl fullWidth margin={"dense"}>
                <AsyncSelect
                    dataSource={getSkills}
                    dataList={skillList}
                    title={"Kompetenču saraksts"}
                    name={"skills"}
                    variant={"standard"}
                    setFieldValue={formikProps.setFieldValue}
                    inputValue={formikProps.values.skills}
                    multiple={true}
                    disableCloseOnSelect={true}
                />
                <ErrorMessage name={"skills"} />
            </FormControl>
        </>
    )
};

export default ProjectAddEditNeededSkills;
