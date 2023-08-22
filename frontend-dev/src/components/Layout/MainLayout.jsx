import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {
    Badge, Container,
    createTheme,
    CssBaseline, Divider,
    Grid,
    IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, styled,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {ROUTES} from "../../router";
import {api} from "../../helpers/api";
import {deleteUserAuthDataInLocalStorage} from "../../helpers/authHelper";

const mdTheme = createTheme();
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const MainLayout = ({ children, pageTitle, ...props }) => {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const onLogoutClick = async () => {
        await api({
            method: 'POST',
            endpoint: '/auth/logout',
            successCallback: (response) => {
                deleteUserAuthDataInLocalStorage();
                return navigate('/');
            },
            failureCallback: (err) => {
                console.error(err)
            }
        })
    };

    function Copyright(props) {
        return (
            <Typography variant="body2" color="#9e9d9d" align="center" {...props}>
                {'Visas tiesības paturētas © '}
                RESOMAN {new Date().getFullYear()}
            </Typography>
        );
    }

  return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
            >
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
              >
                  {pageTitle}
              </Typography>
              <IconButton color="inherit" onClick={onLogoutClick}>
                <Badge color="secondary">
                  <LogoutIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {ROUTES.map((r) => r.showOnMenu && (
                    <ListItemButton key={r.key} LinkComponent={Link} to={r.path}>
                        <ListItemIcon>
                            {r.routeIcon}
                        </ListItemIcon>
                        <ListItemText primary={r.title} />
                    </ListItemButton>
                ))}
            </List>
          </Drawer>
          <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
          >
            <Toolbar />
            <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
                {children}
            </Container>
          </Box>
        </Box>
          <Box
              sx={{
                  background: "#403f3f",
                  color: "#707070",
                  pb: 3,
                  pt: 3
              }}
          >
              <Copyright />
          </Box>
      </ThemeProvider>
  );
};

export default MainLayout;
