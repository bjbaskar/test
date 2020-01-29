export const OPEN_NAV = "[NAV] OPEN";
export const CLOSE_NAV = "[NAV] CLOSE";
export const SET_SUBJECTS_SEARCH_TEXT = "[NAV] SET_SUBJECTS_SEARCH_TEXT";

export function closeNAV() {
  return {
    type: CLOSE_NAV
  };
}

export function openNAV() {
  return {
    type: OPEN_NAV
  };
}

export function setSearchText(event) {
  return {
    type: SET_SUBJECTS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
