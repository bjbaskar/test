import React from "react";
import MembersList from "../../module1/components/MembersList";
import EventsList from "../../module1/components/EventsList";
const routes = [
  {
    path: "/",
    exact: true,
    title: "Members",
    icon: "person",
    component: () => <MembersList></MembersList>
  },
  {
    path: "/eventlist",
    title: "Events",
    icon: "layers",
    component: () => <EventsList></EventsList>
  }
];

export default routes;
