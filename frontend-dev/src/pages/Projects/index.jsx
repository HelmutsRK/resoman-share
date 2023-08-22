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


const ProjectsPage = () => {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [selectedProjectForDeletion, setSelectedProjectForDeletion] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (!openDeleteDialog) {
            setSelectedProjectForDeletion(null);
        }
    }, [openDeleteDialog])

    const onDeleteClick = (projectData) => {
        setSelectedProjectForDeletion(projectData);
        setOpenDeleteDialog(true);
    }

    const onDeleteConfirm = async() => {
        await api({
            method: 'DELETE',
            endpoint: `/projects/delete/${selectedProjectForDeletion}`,
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
        navigate(`/projects/${id}`);
    }

    const onEditClick = (id) => {
        navigate(`/projects/edit/${id}`);
    }

    const getData = async () => {
        await api({
            method: 'GET',
            endpoint: '/projects/all',
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
        { id: 2, displayName: "Numurs", fieldName: "number" },
        { id: 3, displayName: "Klients", fieldName: "customer.name" },
        { id: 4, displayName: "Budžets", fieldName: "budget" },
        { id: 5, displayName: "Stundas", fieldName: "hours" },
        { id: 6, displayName: "Uzsākšanas datums", fieldName: "start_date" },
        { id: 7, displayName: "Beigu datums", fieldName: "end_date" },
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
                        onClick={() => navigate('/projects/add')}
                    >
                        Pievienot jaunu projektu
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
                title={"Projekta dzēšana"}
                question={`Vai tiešām vēlaties dzēst projektu ${selectedProjectForDeletion?.name}?`}
                setIsOpened={setOpenDeleteDialog}
                isOpened={openDeleteDialog}
                noText={"Nē, nevēlos"}
                yesText={"Jā, izdzēst"}
                onSuccess={onDeleteConfirm}
            />
        </>
    )

};

export default ProjectsPage;
