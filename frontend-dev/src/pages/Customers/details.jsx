import * as React from "react";
import {Chip, Grid, IconButton, ListItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Stack} from "@mui/material";
import {api} from "../../helpers/api";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../components/Common/Loader";
import NotFound from "../../components/Common/NotFound";
import VerticalTable from "../../components/DataTable/VerticalTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";


const CustomerDetailsPage = () => {
    const [customerData, setCustomerData] = useState(null);
    const [notFound, setNotFound] = useState(false);

    let { customerId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await api({
            method: 'GET',
            endpoint: `/customers/get/${customerId}`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    setCustomerData(response.data.data);
                }
            },
            failureCallback: (err) => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            }
        })
    }

    const columnList = [
        { id: 1, displayName: "Nosaukums", fieldName: "name" },
        { id: 2, displayName: "Telefona numurs", fieldName: "phone" },
        { id: 3, displayName: "Reģistrācijas numurs", fieldName: "reg_number" },
    ]

    if (notFound) {
        return (
            <NotFound requestedTerm={customerId} />
        )
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box
                    sx={{
                        marginBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/customers/edit/${customerId}`)}
                    >
                        Veikt labojumus
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} lg={10} xl={10}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {!customerData && !notFound && (
                        <Loader />
                    )}
                    {customerData && (
                        <VerticalTable
                            data={customerData}
                            columns={columnList}
                        />
                    )}
                </Paper>
            </Grid>
        </Grid>
    )

};

export default CustomerDetailsPage;
