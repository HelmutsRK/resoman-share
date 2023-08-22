import * as React from "react";
import {
    Grid,
    Paper
} from "@mui/material";
import {api} from "../../../helpers/api";
import {useEffect, useState} from "react";
import Loader from "../../../components/Common/Loader";
import UserAddEditForm from "./UserAddEditForm";
import {useParams} from "react-router-dom";


const UserAddEditPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    let { userId } = useParams();

    useEffect(() => {
        if (userId) {
            getUser();
        } else {
            setLoading(false)
        }
    }, [userId])

    const getUser = async () => {
        await api({
            method: 'GET',
            endpoint: `/users/get/${userId}`,
            data: {},
            successCallback: (response) => {
                if (response.data.data && response.data.data.hasOwnProperty("id")) {
                    setUserData(response.data.data);
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
                        <UserAddEditForm
                            userData={userData}
                        />
                    )}
                </Paper>
            </Grid>
        </Grid>
    )
};

export default UserAddEditPage;
