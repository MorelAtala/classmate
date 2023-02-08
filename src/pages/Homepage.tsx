import  { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoginDialog from "../components/LoginDialog";
import { Grid, Paper, Stack } from "@mui/material";
import { useAuth } from "../utils/Firebase";
import background from "../background.jpg";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    },
  })
);



const Homepage = () => {
const classes = useStyles();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const auth = useAuth();
  return (
    <Paper className={classes.container} >
    {/* Hero unit */}
      
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Classmate
        </Typography>
        <Typography variant="h5" align="center"  paragraph>
          Share your notes with your classmates instantly!
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
           {auth?.isAnonymous && (
                <Button variant="contained"
                  onClick={() => setLoginDialogOpen(true)}
                  color="inherit"
                >
                  Login
                </Button>
            )}
        </Stack>
        
     
   
   
        <LoginDialog
            visible={loginDialogOpen}
            onClose={() => setLoginDialogOpen(false)}
        />

    </Grid>
    </Paper>

  );
};


export default Homepage;
