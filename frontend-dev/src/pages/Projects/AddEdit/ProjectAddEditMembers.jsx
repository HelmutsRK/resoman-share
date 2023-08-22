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
import HorizontalTable from "../../../components/DataTable/HorizontalTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../../components/Common/Loader";

const ProjectAddEditMembers = ({ formikProps, userList, getUsers, selectedMembers, handleMemberSelection }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        if (userList.length > 0) {
            setLoading(false)
        }
    }, [userList]);

    const columnList = [
        { id: 1, displayName: "Vārds", fieldName: "profile.first_name" },
        { id: 2, displayName: "Uzvārds", fieldName: "profile.last_name" },
        { id: 3, displayName: "Tips", fieldName: "profile.employee_type.name" },
        { id: 4, displayName: "Pozīcija", fieldName: "profile.position.name_full" },
        { id: 5, displayName: "Departaments", fieldName: "profile.department.name_full" },
    ]

    return (
        <>
            <Typography sx={{ mt: 4, mb: 2 }} component="h2" variant="h6" color="primary" gutterBottom>
                Darbinieki, kuri piedalās projektā
            </Typography>
            {loading && (
                <Loader />
            )}
            {userList.length > 0 && (
                <HorizontalTable
                    data={userList}
                    columns={columnList}
                    showActions={false}
                    tableSize={"small"}
                    showSelect={true}
                    handleSelection={handleMemberSelection}
                    selectedData={selectedMembers}
                />
            )}
        </>
    )
};

export default ProjectAddEditMembers;
