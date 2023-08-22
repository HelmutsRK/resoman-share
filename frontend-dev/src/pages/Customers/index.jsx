import * as React from "react";
import {Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {api} from "../../helpers/api";
import {deleteUserAuthDataInLocalStorage, saveUserAuthDataInLocalStorage} from "../../helpers/authHelper";
import {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from "../../components/Common/Loader";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from "@mui/material/Button";
import ConfirmDialog from "../../components/Common/ConfirmDialog";
import {useNavigate} from "react-router-dom";
import HorizontalTable from "../../components/DataTable/HorizontalTable";


const CustomersPage = () => {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [selectedCustomerForDeletion, setSelectedCustomerForDeletion] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (!openDeleteDialog) {
            setSelectedCustomerForDeletion(null);
        }
    }, [openDeleteDialog])

    const onDeleteClick = (customerData) => {
        setSelectedCustomerForDeletion(customerData);
        setOpenDeleteDialog(true);
    }

    const onDeleteConfirm = async() => {
        await api({
            method: 'DELETE',
            endpoint: `/customers/delete/${selectedCustomerForDeletion}`,
            successCallback: (response) => {
                if (response.status === 200) {
                    setDataList([]);
                    getData();
                }
            },
            failureCallback: (err) => {
                console.error(err.response.message);
            }
        })
        setOpenDeleteDialog(false);
    }

    const onViewClick = (id) => {
        navigate(`/customers/${id}`);
    }

    const onEditClick = (id) => {
        navigate(`/customers/edit/${id}`);
    }

    const getData = async () => {
        await api({
            method: 'GET',
            endpoint: '/customers/all',
            successCallback: (response) => {
                if (response.data.data && response.data.data.length > 0) {
                    setDataList(response.data.data);
                }
            },
            failureCallback: (err) => {
                console.error(err.response.message);
            }
        })
    }

    const columnList = [
        { id: 1, displayName: "Nosaukums", fieldName: "name" },
        { id: 2, displayName: "Telefona numurs", fieldName: "phone" },
        { id: 3, displayName: "Reģistrācijas numurs", fieldName: "reg_number" },
    ]

    return (
        <>
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
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/customers/add')}
                    >
                        Pievienot jaunu klientu
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    {dataList.length < 1 && (
                        <Loader />
                    )}
                    {dataList.length > 0 && (
                        <HorizontalTable
                            data={dataList}
                            columns={columnList}
                            showActions={true}
                            actionItems={[
                                {
                                    title: "Apskatīt",
                                    icon: <VisibilityIcon fontSize={"small"} />,
                                    actionCallback: onViewClick
                                },
                                {
                                    title: "Labot",
                                    icon: <EditIcon fontSize={"small"} />,
                                    actionCallback: onEditClick
                                },
                                {
                                    title: "Dzēst",
                                    icon: <DeleteIcon fontSize={"small"} />,
                                    actionCallback: onDeleteClick
                                }
                            ]}
                        />
                    )}
                </Paper>
            </Grid>
            <ConfirmDialog
                title={"Klienta dzēšana"}
                question={`Vai tiešām vēlaties dzēst klientu ${setSelectedCustomerForDeletion?.name}?`}
                setIsOpened={setOpenDeleteDialog}
                isOpened={openDeleteDialog}
                noText={"Nē, nevēlos"}
                yesText={"Jā, izdzēst"}
                onSuccess={onDeleteConfirm}
            />
        </>
    )

};

export default CustomersPage;
