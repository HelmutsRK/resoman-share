import * as React from "react";
import {Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";


const NotFound = ({ requestedTerm }) => {
    return (
        <Grid item xs={12}>
            <Paper sx={{ p:3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Pieprasītais resurss ar ID <b>{requestedTerm}</b> netika atrasts!
                </Typography>
            </Paper>
        </Grid>
    )

};

export default NotFound;
