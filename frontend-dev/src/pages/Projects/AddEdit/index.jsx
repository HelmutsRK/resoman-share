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
import {useState, useEffect} from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ProjectAddEditForm from "./ProjectAddEditForm";
import {api} from "../../../helpers/api";
import {useParams} from "react-router-dom";
import Loader from "../../../components/Common/Loader";


const ProjectAddEditPage = () => {
    const [customerList, setCustomerList] = useState([]);
    const [skillList, setSkillList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [notFound, setNotFound] = useState(false);
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);

    let { projectId } = useParams();

    useEffect(() => {
        if (projectId) {
            getProject();
        } else {
            setLoading(false)
        }
    }, [projectId])

    const getProject = async () => {
        await api({
            method: 'GET',
            endpoint: `/projects/get/${projectId}`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    setProjectData(response.data.data);
                    setLoading(false)
                }
            },
            failureCallback: (err) => {
                console.error(err.message)
                setLoading(false)
            }
        })
    }

    const getCustomers = async () => {
        await api({
            method: 'GET',
            endpoint: `/classifiers/customers`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.length > 0) {
                    setCustomerList(response.data.data);
                }
            },
            failureCallback: (err) => {
                console.error(err.message)
            }
        })
    }

    const getSkills = async () => {
        await api({
            method: 'GET',
            endpoint: `/classifiers/skills`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.length > 0) {
                    setSkillList(response.data.data);
                }
            },
            failureCallback: (err) => {
                console.error(err.message)
            }
        })
    }

    const getUsers = async () => {
        await api({
            method: 'GET',
            endpoint: `/users/all`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.length > 0) {
                    setUserList(response.data.data);
                }
            },
            failureCallback: (err) => {
                console.error(err.message)
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={5} xl={5}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {loading && (
                        <Loader />
                    )}
                    {!loading && (
                        <ProjectAddEditForm
                            customerList={customerList}
                            getCustomers={getCustomers}
                            getSkills={getSkills}
                            skillList={skillList}
                            projectData={projectData}
                            getUsers={getUsers}
                            userList={userList}
                        />
                    )}
                </Paper>
            </Grid>
        </Grid>
    )
};

export default ProjectAddEditPage;
