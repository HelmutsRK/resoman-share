import * as React from "react";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {api} from "../../../helpers/api";
import {useState} from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {useNavigate} from "react-router-dom";
import FormFieldErrors from "../../../components/Common/FormFieldErrors";


const CustomerAddEditForm = ({ customerData }) => {
    const navigate = useNavigate();
    const [formError, setFormError] = useState(null);

    const [formInitialValues, setFormInitialValues] = useState({
        name: customerData && customerData.name ? customerData.name : "",
        phone: customerData && customerData.phone ? customerData.phone : "",
        reg_number: customerData && customerData.reg_number ? customerData.reg_number : ""
    })

    const handleSubmit = async(values, props) => {
        const endpoint = customerData ? `/customers/update/${customerData.id}` : '/customers/create'
        const method = customerData ? 'PUT' : 'POST'

        await api({
            method: method,
            endpoint: endpoint,
            data: {
                name: values.name ?? null,
                phone: values.phone ?? null,
                reg_number: values.reg_number ?? null
            },
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    navigate(`/customers`);
                }
            },
            failureCallback: (err) => {
                if (err.response.data.errors && Object.keys(err.response.data.errors).length > 0) {
                    setFormError(err.response.data.errors)
                }
            }
        })
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Obligāts lauks'),
        phone: Yup.number()
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
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Klienta informācija
                    </Typography>
                    <TextField
                        label="Nosaukums"
                        name="name"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={<ErrorMessage name="name" />}
                        error={props.errors.name && props.touched.name}
                    />
                    <TextField
                        label="Telefons"
                        name="phone"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        value={props.values.phone}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={<ErrorMessage name="phone" />}
                        error={props.errors.phone && props.touched.phone}
                    />
                    <TextField
                        label="Reģistrācijas numurs"
                        name="reg_number"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        value={props.values.reg_number}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={<ErrorMessage name="reg_number" />}
                        error={props.errors.reg_number && props.touched.reg_number}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        fullWidth
                        sx={{ mt: 5 }}
                    >
                        {customerData ? 'Atjaunot' : 'Pievienot'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
};

export default CustomerAddEditForm;
