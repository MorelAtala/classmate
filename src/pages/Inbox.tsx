import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ImageIcon from "@material-ui/icons/Image";
import Collapse from "@material-ui/core/Collapse";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { useAppState } from "../store";
import { isImageFile, isPdfFile } from "../config/Print";

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
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      flex: 1,
    },
    list: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const Inbox: React.FC = () => {
  const { buckets } = useAppState();
  const classes = useStyles();
  const [open, setOpen] = useState<any>({});
 



  useEffect(() => {
    console.log({buckets});
  }, [buckets])
  return (
    <Container maxWidth="sm" className={classes.container}>
      <List
        subheader={<ListSubheader component="div">Notes</ListSubheader>}
        className={classes.list}
      >
        {buckets.map(({ id, files, name, status }) => (
          <React.Fragment key={id}>
            <ListItem button onClick={() => setOpen({ [id]: !open[id] })}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText
                primary={status === "sharing" ? `${name} (receiving...)` : name}
              />
              {status === "done" && (
                <React.Fragment>
                  {open[id] ? <ExpandLess /> : <ExpandMore />}
                </React.Fragment>
              )}
            </ListItem>
            {status === "done" && (
              <Collapse in={open[id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {files.map((file) => (
                    <ListItem button className={classes.nested} key={file.url}>
                      <ListItemIcon>
                        {(isPdfFile(file.name) && <PictureAsPdfIcon />) ||
                          (isImageFile(file.name) && <ImageIcon />) || (
                            <InsertDriveFileIcon />
                          )}
                      </ListItemIcon>
                      <ListItemText primary={file.name} />
                      <ListItemSecondaryAction>
                    
                        <IconButton
                          className="download-link"
                          edge="end"
                          aria-label="download"
                          title="Download"
                          href={file.url}
                          download={file.name}
                        >
                          <CloudDownloadIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
   
    </Container>
  );
};

export default Inbox;
