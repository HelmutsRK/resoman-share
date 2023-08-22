import * as React from "react";
import {
    Alert,
    Checkbox,
    FormControl,
    Grid,
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
import ProjectAddEditBasicInformation from "./ProjectAddEditBasicInformation";
import {formatDate} from "../../../helpers/customHelper";
import {useNavigate} from "react-router-dom";
import FormFieldErrors from "../../../components/Common/FormFieldErrors";
import dayjs from "dayjs";
import ProjectAddEditNeededSkills from "./ProjectAddEditNeededSkills";
import ProjectAddEditMembers from "./ProjectAddEditMembers";


const ProjectAddEditForm = ({ customerList, getCustomers, getSkills, skillList, projectData, userList, getUsers }) => {
    const navigate = useNavigate();
    const [formError, setFormError] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [formInitialValues, setFormInitialValues] = useState({
        name: projectData && projectData.name ? projectData.name : "",
        number: projectData && projectData.number ? projectData.number : "",
        customer: projectData && projectData.customer ? projectData.customer : null,
        budget: projectData && projectData.budget ? projectData.budget : "",
        start_date: projectData && projectData.start_date ? dayjs(projectData.start_date) : null,
        end_date: projectData && projectData.end_date ? dayjs(projectData.end_date) : null,
        hours: projectData && projectData.hours ? projectData.hours : "",
        profit_target: projectData && projectData.profit_target ? projectData.profit_target : "",
        skills: projectData && projectData.skills ? projectData.skills : [],
    })

    useEffect(() => {
        if (projectData) {
            if (projectData.members.length > 0) {
                setSelectedMembers(projectData.members)
            }
        }
    }, [projectData])

    const handleSubmit = async(values, props) => {
        const endpoint = projectData ? `/projects/update/${projectData.id}` : '/projects/create'
        const method = projectData ? 'PUT' : 'POST'

        await api({
            method: method,
            endpoint: endpoint,
            data: {
                name: values.name ?? null,
                number: values.number ?? null,
                customer_id: values.customer?.id ?? null,
                budget: values.budget ?? null,
                start_date: values.start_date ? formatDate(values.start_date) : null,
                end_date: values.end_date ? formatDate(values.end_date) : null,
                hours: values.hours ?? null,
                profit_target: values.profit_target ?? null,
                skills: values.skills ?? [],
                members: selectedMembers
            },
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    const alteredProject = response.data.data;
                    navigate(`/projects`);
                }
            },
            failureCallback: (err) => {
                if (err.response.data.errors && Object.keys(err.response.data.errors).length > 0) {
                    setFormError(err.response.data.errors)
                }
            }
        })
    }

    const handleMemberSelection = (row, include) => {
        if (include) {
            setSelectedMembers(oldValues => [...oldValues, row]);
        } else {
            let listWithRemovedRow = selectedMembers.filter(user => user.id !== row.id)
            setSelectedMembers(listWithRemovedRow)
        }
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Obligāts lauks'),
        number: Yup.string().required('Obligāts lauks'),
        budget: Yup.number().nullable().typeError('Ievadiet skaitli'),
        start_date: Yup.date().nullable().typeError('Ievadiet datumu'),
        end_date: Yup.date().nullable().typeError('Ievadiet datumu'),
        hours: Yup.number().nullable().typeError('Ievadiet skaitli'),
        profit_target: Yup.number().nullable().typeError('Ievadiet skaitli')
    });

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            enableReinitialize={true}
        >
            {(props) => (
                <Form>
                    {formError && (
                        <FormFieldErrors fieldErrors={formError} />
                    )}
                    <ProjectAddEditBasicInformation
                        formikProps={props}
                        getCustomers={getCustomers}
                        customerList={customerList}
                    />
                    <ProjectAddEditNeededSkills
                        formikProps={props}
                        getSkills={getSkills}
                        skillList={skillList}
                    />
                    <ProjectAddEditMembers
                        formikProps={props}
                        userList={userList}
                        getUsers={getUsers}
                        handleMemberSelection={handleMemberSelection}
                        selectedMembers={selectedMembers}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        fullWidth
                        sx={{ mt: 5 }}
                    >
                        {projectData ? 'Atjaunot' : 'Pievienot'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
};

export default ProjectAddEditForm;
