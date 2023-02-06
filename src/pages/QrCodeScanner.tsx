import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import { QrReader } from 'react-qr-reader'
import  QrReader from 'react-web-qr-reader'

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
        const { files, setFiles, setReceiverId } = useAppState();
        const delay = 500;
        const previewStyle = {
          height: 240,
          width: 320
        };

        const [result, setResult] = useState("No result");
        const handleScan = async (result: string | null) => {
          if (result) {
            setReceiverId(result);
            setResult(result);
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
                                      {files.length} files selected. Scan QR Code to share files
                                    </Typography>
                                  </Box>
                                  <Box display="flex" justifyContent="center" mb={2}>
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      onClick={() => {
                                        navigate("/");
                                        setFiles([]);
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </Box>
                                </Container>
                              );
                            };
                            
 export default QrCodeScanner;
                            