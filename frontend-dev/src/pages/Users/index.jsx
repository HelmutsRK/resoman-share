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


const UsersPage = () => {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [selectedUserForDeletion, setSelectedUserForDeletion] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (!openDeleteDialog) {
            setSelectedUserForDeletion(null);
        }
    }, [openDeleteDialog])

    const onDeleteClick = (userData) => {
        setSelectedUserForDeletion(userData);
        setOpenDeleteDialog(true);
    }

    const onDeleteConfirm = async() => {
        await api({
            method: 'DELETE',
            endpoint: `/users/delete/${selectedUserForDeletion}`,
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
        navigate(`/users/${id}`);
    }

    const onEditClick = (id) => {
        navigate(`/users/edit/${id}`);
    }

    const getData = async () => {
        await api({
            method: 'GET',
            endpoint: '/users/all',
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
        { id: 1, displayName: "Vārds", fieldName: "profile.first_name" },
        { id: 2, displayName: "Uzvārds", fieldName: "profile.last_name" },
        { id: 3, displayName: "Tips", fieldName: "profile.employee_type.name" },
        { id: 4, displayName: "Pozīcija", fieldName: "profile.position.name_full" },
        { id: 5, displayName: "Departaments", fieldName: "profile.department.name_full" },
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
                        onClick={() => navigate('/users/add')}
                    >
                        Pievienot jaunu lietotāju (darbinieku)
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
                title={"Lietotāja dzēšana"}
                question={`Vai tiešām vēlaties dzēst lietotāju ${selectedUserForDeletion?.name}?`}
                setIsOpened={setOpenDeleteDialog}
                isOpened={openDeleteDialog}
                noText={"Nē, nevēlos"}
                yesText={"Jā, izdzēst"}
                onSuccess={onDeleteConfirm}
            />
        </>
    )

};

export default UsersPage;
