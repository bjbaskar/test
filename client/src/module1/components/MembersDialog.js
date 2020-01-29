import React, { useEffect, useState, useCallback } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions/dialog";
import * as ActionsEvents from "../store/actions/members.action";
import Table from "../../core/components/Table";
import EventsLocate from "./EventsLocate";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function MembersDialog() {
  const dispatch = useDispatch();
  const dialogProps = useSelector(
    ({ reducer }) => reducer.dialogReducer.dialogProps
  );
  const dataEvents = useSelector(
    ({ reducer }) => reducer.membersReducer.eventsdata
  );
  // const dataSetEvents = useSelector(
  //   ({ reducer }) => reducer.membersReducer.setevents
  // );

  const [dialogData, setDialogData] = useState([]);
  const [dialogType, setDialogType] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (dialogProps.props.open) {
      initDialog();
      getEventsData();
    }
  }, [dialogProps.props.open]);

  useEffect(() => {
    dispatch(ActionsEvents.setEvents(checked));
  }, [checked]);

  const initDialog = useCallback(() => {
    setDialogData(dialogProps.data);
    setDialogType(dialogProps.type);
  }, [dialogProps.data, dialogProps.type]);

  const handleClose = () => {
    if (dialogProps.type === "new") {
      dispatch(Actions.closeDialog(dialogProps.data));
      setChecked([]);
    } else if (dialogProps.type === "del") {
      dispatch(Actions.closeDeleteDialog(dialogProps.data, false));
    } else if (dialogProps.type === "edit") {
      dispatch(Actions.closeEditDialog());
    }
  };

  const getEventsData = () => {
    if (dialogProps.type === "new") {
      dispatch(ActionsEvents.getEvents());
    }
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(chk => [...chk, ...newChecked]);
  };

  const handleDelete = () => {
    dispatch(Actions.closeDeleteDialog(dialogData, true));
  };

  const columns = React.useMemo(
    () => [
      {
        id: "selection",
        Header: "",
        accessor: "",
        defaultCanSort: false,
        disableSortBy: true,
        Cell: row => (
          <Checkbox
            tabIndex={-1}
            disableRipple
            onClick={handleToggle(row.row.original)}
          />
        )
      },
      {
        Header: "Name",
        accessor: d => `${d.organizer.first} ${d.organizer.last}`,
        disableSortBy: false,
        Cell: row =>
          row.row.original.organizer
            ? row.row.original.organizer.first +
              " " +
              row.row.original.organizer.last
            : ""
      },
      {
        Header: "Company",
        accessor: "company"
      },
      {
        Header: "Scheduled At",
        accessor: "scheduled_at",
        disableSortBy: true
      },
      {
        Header: "Capacity",
        accessor: "capacity",
        disableSortBy: true
      },
      {
        Header: "Duration",
        accessor: "duration",
        disableSortBy: true
      }
    ],
    []
  );

  return (
    <Dialog
      {...dialogProps.props}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {dialogData && dialogData.name && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" component="h1" gutterBottom>
              {dialogType === "new"
                ? `Add a new event to (${"  " +
                    dialogData.name.first +
                    " " +
                    dialogData.name.last})`
                : dialogType === "del"
                ? `Delete Member (${dialogData.name.first +
                    " " +
                    dialogData.name.last}) ?`
                : `Event registered to (${dialogData.name.first +
                    " " +
                    dialogData.name.last})`}
            </Typography>
          </div>
        )}
      </DialogTitle>

      <DialogContent dividers>
        {dialogProps.type === "new" && (
          <Table columns={columns} data={dataEvents ? dataEvents : []} />
        )}
        {dialogProps.type === "del" && (
          <table>
            <tr>
              <th>Name</th>
              <td>
                {dialogData &&
                  dialogData.name &&
                  dialogData.name.first + " " + dialogData.name.last}
              </td>
            </tr>
            <tr>
              <th>eMail</th>
              <td>{dialogData && dialogData.phone}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{dialogData && dialogData.email}</td>
            </tr>
            <tr>
              <th>Company</th>
              <td>{dialogData && dialogData.company}</td>
            </tr>
          </table>
        )}
        {dialogProps.type === "edit" && <EventsLocate data={dialogProps} />}
      </DialogContent>
      <DialogActions>
        {dialogProps.type === "new" && (
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            variant="contained"
          >
            Save changes
          </Button>
        )}
        {dialogProps.type === "del" && (
          <Button
            autoFocus
            onClick={handleDelete}
            color="secondary"
            variant="contained"
          >
            Delete Member
          </Button>
        )}
        {dialogProps.type === "edit" && (
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default MembersDialog;
