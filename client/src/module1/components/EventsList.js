import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "./CalendarView";
import * as ActionsEvents from "../store/actions/members.action";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    textAlign: "left",
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

export default function EventsList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dataEvents = useSelector(
    ({ reducer }) => reducer.membersReducer.eventsdata
  );

  useEffect(() => {
    dispatch(ActionsEvents.getEvents());
  }, []);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          fontWeight: 800
        }}
      >
        Events List
      </Typography>
      {dataEvents &&
        dataEvents.map((d, idx) => (
          <ExpansionPanel defaultExpanded={idx == 0} key={d._id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div>
                <Typography className={classes.heading}>{d.company}</Typography>
                <br />
                <Chip label={`Capacity: ${d.capacity}`} />
              </div>
              <div className={classes.column}>Duration: {d.duration}</div>
              <div className={clsx(classes.column, classes.helper)}>
                <Typography variant="caption">
                  Scheduled At: <b>{d.scheduled_at}</b>
                  <br />
                  <a
                    href="#secondary-heading-and-columns"
                    className={classes.link}
                  >
                    Learn more
                  </a>
                </Typography>
              </div>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.details}>
              <div style={{ textAlign: "left" }}>
                <h5>About Events: </h5> <br />
                {d.about}
              </div>
              <CalendarView data={d.scheduled_at} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  );
}
