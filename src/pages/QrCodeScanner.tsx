import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import { QrReader } from 'react-qr-reader'
import QrReader from 'react-web-qr-reader'
import React from "react";
//import { QrReader } from "react-qr-reader";
import ReactResizeDetector from "react-resize-detector";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    content: {
      display: "flex",
      flex: 1,
    },
    qrCode: {
      margin: "auto",
    },
  })
);


const QrCodeScanner: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setReceiverId } = useAppState();
  const delay = 500;
  const handleScan = async (result: any) => {
    if (result) {
      setReceiverId(result.data);
      navigate("/sharing");
    }
  };
  const handleError = (error: any) => {
    console.log(error);
  };

  return (

    
    <Container maxWidth="sm" className={classes.container}>
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }: any) => {
          const minValue = Math.min(width, height);
          const size = minValue || 100;
          return (
            <div className={classes.content}>
              <QrReader
                delay={delay}
                style={{ width: size, height: size }}
                onError={handleError}
                onScan={handleScan}
              />
            </div>
          );
        }}
      </ReactResizeDetector>
      <Box pt={4} pb={2}>
        <Typography align="center" variant="h5">
          Scan your Classmate's QR Code to receive the Notes
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate("/fileschooser");
           // setFiles([]);
          }}
        >
          Share more notes
        </Button>
      </Box>
    </Container>
  );
};

export default QrCodeScanner;
