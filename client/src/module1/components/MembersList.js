import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { IconButton, Tooltip } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Event";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import Table from "../../core/components/Table";
import * as Actions from "../store/actions/members.action";
import * as ActionsDialog from "../store/actions/dialog";
import MembersDialog from "./MembersDialog";

function MembersList() {
  const dispatch = useDispatch();
  const dataMembers = useSelector(({ reducer }) => reducer.membersReducer.data);
  const dataSetEvents = useSelector(
    ({ reducer }) => reducer.membersReducer.setevents
  );
  const dialogProps = useSelector(
    ({ reducer }) => reducer.dialogReducer.dialogProps
  );
  const searchText = useSelector(
    ({ coreReducer }) => coreReducer.NavOpenReducer.searchText
  );

  const [membersData, setMembersData] = useState([]);
  const [mode, setMode] = useState(true);
  // const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(Actions.getMembers());
    setMode(true);
  }, []);

  useEffect(() => {
    if (mode) {
      setMembersData(dataMembers);
    }
  }, [dataMembers]);

  useEffect(() => {
    if (dialogProps.props.open === false && dialogProps.type === "new") {
      const members = dialogProps.data;
      const eventsMembers = dataSetEvents;
      membersData &&
        membersData.map(d => {
          if (d._id === members._id) {
            eventsMembers.map(e => d.events.push(e));
            setMode(false);
          }
        });
      dispatch(Actions.setEvents([]));
    } else if (dialogProps.props.open === false && dialogProps.type === "del") {
      const membersDel = dialogProps.data;
      var index = membersData.indexOf(membersDel);
      if (index !== -1) {
        membersData.splice(index, 1);
        setMode(false);
      }
      setMembersData(d => [...d, ...membersData]);
    }
  }, [dialogProps.props.open, dialogProps.type]);

  const columns = React.useMemo(
    () => [
      {
        id: "selection",
        Header: "",
        accessor: "",
        defaultCanSort: false,
        disableSortBy: true,
        Cell: row => (
          <div
            style={{
              padding: "4px 8px 4px 8px",
              display: "flex",
              flexDirection: "row"
            }}
          >
            <Tooltip title="Add an Event">
              <IconButton
                size="small"
                aria-label="Add an Event"
                onClick={ev => {
                  ev.stopPropagation();
                  dispatch(ActionsDialog.openDialog(row.row.original));
                }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Locate on Calendar”">
              <IconButton
                size="small"
                aria-label="Locate on Calendar"
                onClick={ev => {
                  ev.stopPropagation();
                  dispatch(
                    ActionsDialog.openEditDialog(row.row.original, "edit")
                  );
                }}
              >
                <NavigationIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Member">
              <IconButton
                size="small"
                aria-label="Delete"
                onClick={ev => {
                  ev.stopPropagation();
                  dispatch(
                    ActionsDialog.openDeleteDialog(row.row.original, "delete")
                  );
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
        )
      },
      {
        Header: "Name",
        accessor: d => `${d.name.first} ${d.name.last}`,
        disableSortBy: false,
        Cell: row =>
          row.row.original.name
            ? row.row.original.name.first + " " + row.row.original.name.last
            : ""
      },
      {
        Header: "Events",
        accessor: "events",
        disableSortBy: true,
        Cell: row => (
          <div
            style={{
              display: "flex",
              padding: "4px",
              borderRadius: ".4rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              backgroundColor: "#d3d3d3",
              minWidth: "42px",
              width: "42px",
              justifyContent: "center",
              fontWeight: 800
            }}
          >
            {row.row.original.events && row.row.original.events.length}
          </div>
        )
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Phone",
        accessor: "phone",
        disableSortBy: true
      },
      {
        Header: "Email",
        accessor: "email",
        disableSortBy: true
      },
      {
        Header: "Company",
        accessor: "company",
        disableSortBy: true
      }
    ],
    []
  );

  const getFilteredArray = (data, searchText) => {
    if (searchText.length === 0) {
      return data;
    }
    if (data) {
      return data.filter(e =>
        e.name.first.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return data;
  };
  const objData = getFilteredArray(membersData, searchText.trim());

  return (
    <Fragment>
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
        Members List
      </Typography>
      <Table columns={columns} data={objData ? objData : []} />
      <MembersDialog></MembersDialog>
    </Fragment>
  );
}

export default MembersList;
