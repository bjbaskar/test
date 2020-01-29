import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { Paper, Input, Icon } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    // flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
}));

function TopBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const getNav = useSelector(
    ({ coreReducer }) => coreReducer.NavOpenReducer.open
  );
  const searchText = useSelector(
    ({ coreReducer }) => coreReducer.NavOpenReducer.searchText
  );

  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    setOpen(getNav);
  }, [getNav]);

  const handleDrawerOpen = () => {
    dispatch(Actions.openNAV());
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>

        <div className={classes.row}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Spectrum Global - Interview Assignment
          </Typography>

          <Paper
            // className="flex p-4 items-center w-full max-w-512 px-8 py-4"
            style={{
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              alignItems: " center"
            }}
            elevation={1}
          >
            <SearchIcon />
            <Input
              placeholder="Search Member name"
              className="flex flex-1"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                "aria-label": "Search"
              }}
              onChange={ev => dispatch(Actions.setSearchText(ev))}
            />
          </Paper>

          <Button variant="outlined" color="primary">
            <div className="hidden md:flex flex-col ml-12 items-start">
              <Typography
                component="span"
                style={{
                  display: "flex",
                  textTransform: "none",
                  fontWeight: 400,
                  color: "#FFFFFF"
                }}
              >
                Baskaran Balaganesan
              </Typography>
            </div>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
