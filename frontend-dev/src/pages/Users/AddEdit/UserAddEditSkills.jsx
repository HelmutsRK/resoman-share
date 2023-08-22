import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useState, useEffect} from "react";
import Loader from "../../../components/Common/Loader";
import {api} from "../../../helpers/api";

const UserAddEditSkills = ({
    userData,
    skillValues,
    setSkillValues
}) => {
    const [skillList, setSkillList] = useState([]);
    const [userSkills, setUserSkills] = useState([]);
    const [skillValuesSet, setSkillValuesSet] = useState(false);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (skillList.length < 1) {
            getSkills();
        }
    }, [skillList])

    useEffect(() => {
        if (userData) {
            if (userData.skills.length > 0) {
                setUserSkills(userData.skills)
            }
        }
    }, [userData])

    useEffect(() => {
        if (skillList.length > 0 && !skillValuesSet) {
            skillList.map(s => {
                const skillValue = userSkills.find(us => us.skill_id === s.id)
                setSkillValues(values => [...values, {
                    skill_id: s.id,
                    rating: skillValue ? skillValue.rating : ""
                }])
            })
            setSkillValuesSet(true)
        }
    }, [userSkills, skillList])

    useEffect(() => {
        if (skillValuesSet) {
            setLoading(false);
        }
    }, [skillValuesSet])

    const handleChange = (e, skill_id) => {
        const value = e.target.value

        if ((Number(value) && value > 0 && value <= 10) || value === '') {
            const skill = skillValues.findIndex(x => x.skill_id === skill_id);
            let skillValuesClone = [...skillValues];
            skillValuesClone[skill].rating = e.target.value;
            setSkillValues(skillValuesClone);
        }
    }

    const getSkillValue = (skill_id) => {
        const skill = skillValues.findIndex(x => x.skill_id === skill_id);
        return skillValues[skill].rating;
    }

    if (loading) {
        return <Loader/>;
    }
    
    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ mt: 2, mb: 2 }}>
                Darbinieka kompetenču novērtējumi
            </Typography>
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
                                    <TextField
                                        id={`user-skill-${i}`}
                                        variant="standard"
                                        value={getSkillValue(row.id)}
                                        inputProps={{
                                            sx: { textAlign: "center" }
                                        }}
                                        onInput={e => handleChange(e, row.id)}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </>
    )
};

export default UserAddEditSkills;
