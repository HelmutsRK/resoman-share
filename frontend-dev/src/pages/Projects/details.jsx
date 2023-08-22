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


const ProjectDetailsPage = () => {
    const [projectData, setProjectData] = useState(null);
    const [notFound, setNotFound] = useState(false);

    let { projectId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await api({
            method: 'GET',
            endpoint: `/projects/get/${projectId}`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    setProjectData(response.data.data);
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
        { id: 2, displayName: "Numurs", fieldName: "number" },
        { id: 3, displayName: "Klients", fieldName: "customer.name" },
        { id: 4, displayName: "Budžets", fieldName: "budget" },
        { id: 5, displayName: "Plānotā peļņa", fieldName: "profit_target" },
        { id: 6, displayName: "Stundas", fieldName: "hours" },
        { id: 7, displayName: "Uzsākšanas datums", fieldName: "start_date" },
        { id: 8, displayName: "Beigu datums", fieldName: "end_date" },
        { id: 9, displayName: "Nepieciešamās kompetences", fieldName: "skills" },
        { id: 10, displayName: "Piesaistītie dalībnieki", fieldName: "members" }

    ]

    function multiValueComponent(values) {
        return (
            <>
                {values && values.length > 0 && values.map((value, i) => (
                    <Chip key={i} sx={{ m: "2px" }} label={value.name} />
                ))}
            </>
        )
    }

    if (notFound) {
        return (
            <NotFound requestedTerm={projectId} />
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
                        onClick={() => navigate(`/projects/edit/${projectId}`)}
                    >
                        Veikt labojumus
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} lg={10} xl={10}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {!projectData && !notFound && (
                        <Loader />
                    )}
                    {projectData && (
                        <VerticalTable
                            data={projectData}
                            columns={columnList}
                            multiValueComponent={multiValueComponent}
                        />
                    )}
                </Paper>
            </Grid>
        </Grid>
    )

};

export default ProjectDetailsPage;
