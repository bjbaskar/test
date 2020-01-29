export const OPEN_DIALOG = "[DIALOG] OPEN";
export const CLOSE_DIALOG = "[DIALOG] CLOSE";
export const OPEN_EDIT_DIALOG = "[DIALOG] OPEN EDIT DIALOG";
export const CLOSE_EDIT_DIALOG = "[DIALOG] CLOSE EDIT DIALOG";

export const OPEN_DEL_DIALOG = "[DIALOG] OPEN DEL DIALOG";
export const CLOSE_DEL_DIALOG = "[DIALOG] CLOSE DEL DIALOG";

export function closeDialog(data) {
  return {
    type: CLOSE_DIALOG,
    data
  };
}

export function openDialog(data) {
  return {
    type: OPEN_DIALOG,
    data
  };
}

export function openEditDialog(data, mode) {
  return {
    type: OPEN_EDIT_DIALOG,
    data,
    mode: mode
  };
}

export function closeEditDialog() {
  return {
    type: CLOSE_EDIT_DIALOG
  };
}

export function openDeleteDialog(data) {
  return {
    type: OPEN_DEL_DIALOG,
    data
  };
}

export function closeDeleteDialog(data, mode) {
  return {
    type: CLOSE_DEL_DIALOG,
    data,
    mode
  };
}
