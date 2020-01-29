import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PeopleIcon from "@material-ui/icons/People";

import routes from "./SideNavigationConfig";

function MainListItems() {
  const allRoutes = routes.map((route, index) => {
    return (
      <div key={index}>
        <ListItem button component="a" href={route.path} role="button">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText className="list-item-text" primary={route.title} />
        </ListItem>
      </div>
    );
  });
  return allRoutes;
}

export default MainListItems;
