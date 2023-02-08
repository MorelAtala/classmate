import  { useState } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Link, useNavigate } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import { Auth } from "../config/Firebase";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import CropFreeIcon from "@material-ui/icons/CropFree";
import InboxIcon from "@material-ui/icons/Inbox";
import LoginDialog from "../components/LoginDialog";
import { useAuth } from "../utils/Firebase";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "calc(100vh - 64px)",
        },
        icon: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

export default function Layout({ children }: any) {
    const auth = useAuth();
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const navigate = useNavigate();
    return <div className={classes.root}>
        <AppBar position="static" classes={{ positionStatic: "no-print" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="icon"
                    className={classes.icon}
                    onClick={() => setDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Classmate
                </Typography>
               
                {!auth?.isAnonymous && (
                    <Button
                        onClick={() => {Auth.signInAnonymously();
                        navigate("/")}}
                        color="inherit"
                    >
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
        >
            <List style={{ width: 250 }}>
                {[
                    {
                        shouldRender: true,
                        icon: InboxIcon,
                        title: "Inbox",
                        path: "/inbox",
                    },
                    {
                        shouldRender: true,
                        icon: SendIcon,
                        title: "Share",
                        path: "/fileschooser",
                    },

                    {
                        shouldRender: true,
                        icon: CallReceivedIcon,
                        title: "Receive",
                        path: "/receive",
                    },
                    {
                        shouldRender: !auth?.isAnonymous,
                        icon: CropFreeIcon,
                        title: "Print My Code",
                        path: "/print-code",
                    },
                ]
                    .filter((option) => option.shouldRender)
                    .map(({ title, icon: Icon, path }) => (
                        <ListItem
                            key={title}
                            button
                            onClick={() => setDrawerOpen(false)}
                            component={Link}
                            to={path}
                        >
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
            </List>
        </Drawer>
        {children}
        <LoginDialog
            visible={loginDialogOpen}
            onClose={() => setLoginDialogOpen(false)}
        />
    </div>
}