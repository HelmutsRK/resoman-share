import * as React from "react";
import {
    Chip,
    Grid,
    IconButton,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Stack,
    Typography
} from "@mui/material";
import {api} from "../../helpers/api";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../components/Common/Loader";
import NotFound from "../../components/Common/NotFound";
import VerticalTable from "../../components/DataTable/VerticalTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import HorizontalTable from "../../components/DataTable/HorizontalTable";
import TextField from "@mui/material/TextField";


const UserDetailsPage = () => {
    const [userData, setUserData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [skillList, setSkillList] = useState([]);

    let { userId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getData();
        getSkills();
    }, [])

    const getData = async () => {
        await api({
            method: 'GET',
            endpoint: `/users/get/${userId}`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    setUserData(response.data.data);
                }
            },
            failureCallback: (err) => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            }
        })
    }

    const getSkills = async () => {
        await api({
            method: 'GET',
            endpoint: `/classifiers/skills`,
            data: {},
            successCallback: (response) => {
                if (response.data.data) {
                    setSkillList(response.data.data);
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
        { id: 1, displayName: "Vārds", fieldName: "profile.first_name" },
        { id: 2, displayName: "Uzvārds", fieldName: "profile.last_name" },
        { id: 3, displayName: "E-pasts", fieldName: "email" },
        { id: 4, displayName: "Telefona Nr.", fieldName: "profile.phone" },
        { id: 5, displayName: "Darbinieka tips", fieldName: "profile.employee_type.name" },
        { id: 6, displayName: "Departaments (Pilnais)", fieldName: "profile.department.name_full" },
        { id: 7, displayName: "Departaments (Īsais)", fieldName: "profile.department.name_short" },
        { id: 8, displayName: "Pozīcija (Pilnais)", fieldName: "profile.position.name_full" },
        { id: 9, displayName: "Pozīcija (Īsais)", fieldName: "profile.position.name_short" },
        { id: 10, displayName: "Pirmā darba diena", fieldName: "profile.first_day_of_work" },
        { id: 11, displayName: "Stundas likme €", fieldName: "profile.bill_rate" },
        { id: 12, displayName: "Resursa utilizācija %", fieldName: "profile.utilization_target" },
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
            <NotFound requestedTerm={userId} />
        )
    }

    const findSkill = (skillId) => {
        const foundSkill = userData?.skills.find(x => x.skill_id === skillId)
        return foundSkill?.rating ?? ""
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
                        onClick={() => navigate(`/users/edit/${userId}`)}
                    >
                        Veikt labojumus
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} lg={10} xl={10}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Darbinieka pamatinformācija
                    </Typography>
                    {!userData && !notFound && (
                        <Loader />
                    )}
                    {userData && (
                        <VerticalTable
                            data={userData}
                            columns={columnList}
                            multiValueComponent={multiValueComponent}
                        />
                    )}
                </Paper>
                <Paper sx={{ mt: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Kompetences un to novērtējumi
                    </Typography>
                    {skillList.length < 1 && !notFound && (
                        <Loader />
                    )}
                    {skillList.length > 0 && (
                        <Box sx={{ overflow: "auto" }}>
                            <Table size={"small"} sx={{ mb: 2 }}>
                                <TableHead>
                                    <TableRow>
                                        {skillList.map(skill => (
                                            <TableCell
                                                key={skill.id}
                                                sx={{fontWeight: "bold", minWidth: "100px", textAlign: "center"}}
                                            >
                                                {skill.name}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={"ratings"}>
                                        {skillList.map((row, i) => (
                                            <TableCell key={`${i}-rating`} sx={{ mb: 2, textAlign: "center" }}>
                                                {findSkill(row.id)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Grid>
    )

};

export default UserDetailsPage;
