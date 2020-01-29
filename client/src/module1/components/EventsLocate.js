import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function EventsLocate(props) {
  const classes = useStyles();
  const renderData = props.data.data.events;

  return (
    <List className={classes.root}>
      {renderData.map((d, idx) => (
        <ListItem alignItems="flex-start" key={idx}>
          <ListItemText
            primary={d.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Scheduled At: {d.scheduled_at}
                </Typography>
                <br />
                Capacity: {d.capacity}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
