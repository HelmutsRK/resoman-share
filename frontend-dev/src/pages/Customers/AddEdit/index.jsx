import * as React from "react";
import {
    Grid,
    Paper
} from "@mui/material";
import {useState, useEffect} from "react";
import {api} from "../../../helpers/api";
import {useParams} from "react-router-dom";
import Loader from "../../../components/Common/Loader";
import CustomerAddEditForm from "./CustomerAddEditForm";


const CustomerAddEditPage = () => {
    const [notFound, setNotFound] = useState(false);
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);

    let { customerId } = useParams();

    useEffect(() => {
        if (customerId) {
            getCustomer();
        } else {
            setLoading(false)
        }
    }, [customerId])

    const getCustomer = async () => {
        await api({
            method: 'GET',
            endpoint: `/customers/get/${customerId}`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    setCustomerData(response.data.data);
                    setLoading(false)
                }
            },
            failureCallback: (err) => {
                console.error(err.message)
                setLoading(false)
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
                        <CustomerAddEditForm
                            customerData={customerData}
                        />
                    )}
                </Paper>
            </Grid>
        </Grid>
    )
};

export default CustomerAddEditPage;
