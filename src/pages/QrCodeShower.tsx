import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../store";
import MyQrCode from "../components/MyQrCode";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    content: {
      flex: 1,
      display: "flex",
    },
  })
);

  const QrCodeShower = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { buckets } = useAppState();

  useEffect(() => {
    if (buckets.some((b) => b.status === "sharing")) {
      navigate("/inbox");
    }
  }, [buckets, navigate]);

  return (
    <Container maxWidth="sm" className={classes.container}>
      <MyQrCode />
      <Box pt={4} pb={2}>
        <Typography align="center" variant="h5">
          Ask you Classmate to scan this QR Code to receive your Notes
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" pb={2}>
        <Button variant="outlined" color="primary" component={Link} to="/">
          Share files
        </Button>
      </Box>
    </Container>
  );
};

export default QrCodeShower;
