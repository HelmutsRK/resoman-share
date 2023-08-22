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
import {formatDate} from "../../../helpers/customHelper";
import {useNavigate} from "react-router-dom";
import FormFieldErrors from "../../../components/Common/FormFieldErrors";
import dayjs from "dayjs";
import UserAddEditBasicInformation from "./UserAddEditBasicInformation";
import UserAddEditProfileInformation from "./UserAddEditProfileInformation";
import UserAddEditSkills from "./UserAddEditSkills";


const UserAddEditForm = ({ userData  }) => {
    const navigate = useNavigate();
    const [formError, setFormError] = useState(null);
    const [formInitialValues, setFormInitialValues] = useState({
        email: userData && userData.email ? userData.email : "",
        first_name: userData && userData.profile?.first_name ? userData.profile.first_name : "",
        last_name: userData && userData.profile?.last_name ? userData.profile.last_name : "",
        first_day_of_work: userData && userData.profile?.first_day_of_work ? dayjs(userData.profile?.first_day_of_work) : null,
        phone: userData && userData.profile?.phone ? userData.profile?.phone : "",
        bill_rate: userData && userData.profile?.bill_rate ? userData.profile?.bill_rate : "",
        cost_rate: userData && userData.profile?.cost_rate ? userData.profile?.cost_rate : "",
        utilization_target: userData && userData.profile?.utilization_target ? userData.profile?.utilization_target : "",
        department: userData && userData.profile?.department ? userData.profile?.department : null,
        position: userData && userData.profile?.position ? userData.profile?.position : null,
        employee_type: userData && userData.profile?.employee_type ? userData.profile?.employee_type : null,
        password: "",
        password_repeat: "",
        allow_login: userData && userData.allow_login ? userData.allow_login : false
    })
    const [allowLogin, setAllowLogin] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const [positionList, setPositionList] = useState([]);
    const [employeeTypeList, setEmployeeTypeList] = useState([]);
    const [skillValues, setSkillValues] = useState([]);

    useEffect(() => {
        if (userData) {
            if (userData.allow_login) {
                setAllowLogin(true)
            }
        }
    }, [userData])

    const handleSubmit = async(values, props) => {
        const endpoint = userData ? `/users/update/${userData.id}` : '/users/create'
        const method = userData ? 'PUT' : 'POST'

        await api({
            method: method,
            endpoint: endpoint,
            data: {
                email: values.email ?? null,
                allow_login: allowLogin ?? false,
                password: values.password ?? null,
                profile: {
                    first_name: values.first_name ?? null,
                    last_name: values.last_name ?? null,
                    first_day_of_work: formatDate(values.first_day_of_work) ?? null,
                    phone: values.phone ?? null,
                    bill_rate: values.bill_rate ?? null,
                    cost_rate: values.cost_rate ?? null,
                    utilization_target: values.utilization_target ?? null,
                    department_id: values.department?.id ?? null,
                    position_id: values.position?.id ?? null,
                    employee_type_id: values.employee_type?.id ?? null,
                },
                skills: skillValues
            },
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    navigate(`/users`);
                }
            },
            failureCallback: (err) => {
                if (err.response.data.errors && Object.keys(err.response.data.errors).length > 0) {
                    setFormError(err.response.data.errors)
                }
            }
        })
    }

    const getDepartments = async () => {
        await api({
            method: 'GET',
            endpoint: `/classifiers/departments`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.length > 0) {
                    setDepartmentList(response.data.data);
                }
            },
            failureCallback: (err) => {
                console.error(err.message)
            }
        })
    }

    const getPositions = async () => {
        await api({
            method: 'GET',
            endpoint: `/classifiers/positions`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.length > 0) {
                    setPositionList(response.data.data);
                }
            },
            failureCallback: (err) => {
                console.error(err.message)
            }
        })
    }

    const getEmployeeTypes = async () => {
        await api({
            method: 'GET',
            endpoint: `/classifiers/employeetypes`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.length > 0) {
                    setEmployeeTypeList(response.data.data);
                }
            },
            failureCallback: (err) => {
                console.error(err.message)
            }
        })
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Nekorekts e-pasts').required('Obligāts lauks'),
        first_name: Yup.string().nullable(),
        last_name: Yup.string().nullable(),
        phone: Yup.number().nullable().typeError('Ievadiet skaitli'),
        bill_rate: Yup.number().nullable().typeError('Ievadiet skaitli'),
        cost_rate: Yup.number().nullable().typeError('Ievadiet skaitli'),
        utilization_target: Yup.number().nullable().typeError('Ievadiet skaitli'),
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
                    <UserAddEditBasicInformation
                        formikProps={props}
                        setAllowLogin={setAllowLogin}
                        allowLogin={allowLogin}
                    />
                    <UserAddEditProfileInformation
                        formikProps={props}
                        userData={userData}
                        positionList={positionList}
                        departmentList={departmentList}
                        employeeTypeList={employeeTypeList}
                        getDepartments={getDepartments}
                        getPositions={getPositions}
                        getEmployeeTypes={getEmployeeTypes}
                    />
                    <UserAddEditSkills
                        userData={userData}
                        skillValues={skillValues}
                        setSkillValues={setSkillValues}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        fullWidth
                        sx={{ mt: 5 }}
                    >
                        {userData ? 'Atjaunot' : 'Pievienot'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
};

export default UserAddEditForm;
