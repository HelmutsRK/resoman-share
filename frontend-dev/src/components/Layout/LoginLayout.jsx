import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {
    Avatar,
    Badge, Container,
    createTheme,
    CssBaseline, Divider, FormControlLabel,
    Grid,
    IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, styled,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    deleteUserAuthDataInLocalStorage,
    saveUserAuthDataInLocalStorage,
    validateUserAuth
} from "../../helpers/authHelper";
import {api} from "../../helpers/api";
import {useEffect, useState} from "react";
import Loader from "../Common/Loader";

const mdTheme = createTheme();


const LoginLayout = ({ children, pageTitle, ...props }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let authStatus = validateUserAuth()

        if (authStatus) {
            return navigate('/projects')
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <Loader />
    }

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Visas tiesības paturētas © '}
                    RESOMAN {new Date().getFullYear()}
            </Typography>
        );
    }

    return (
      <ThemeProvider theme={mdTheme}>
          <Container component="main" maxWidth="lg">
              <CssBaseline />
              <Box
                  sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                  }}
              >
                  <Typography variant="h3" gutterBottom color={"secondary.main"}>
                      RESOMAN
                  </Typography>
              </Box>
          </Container>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                  sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                  }}
              >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                  </Avatar>

                  {children}
              </Box>
          </Container>
          <Copyright />
      </ThemeProvider>
    );
};

export default LoginLayout;
