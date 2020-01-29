import axios from "axios";

export const GET_MEMBERS = "[MEMBERS-LIST] GET MEMBERS";
export const GET_EVENTS = "[MEMBERS-LIST] GET EVENTS";
export const SET_EVENTS = "[MEMBERS-LIST] SET EVENTS";

export function getMembers() {
  const request = axios.get(
    "https://next.json-generator.com/api/json/get/V1S9C4QW_"
  );

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_MEMBERS,
        payload: response.data
      })
    );
}

export function getEvents() {
  const request = axios.get(
    "https://next.json-generator.com/api/json/get/Vk7OTypQ8"
  );

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_EVENTS,
        payload: response.data
      })
    );
}

export function setEvents(value) {
  return {
    type: SET_EVENTS,
    payload: value
  };
}
