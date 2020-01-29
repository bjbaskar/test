export const REQUEST_START = "REQUEST_START";
export const REQUEST_END = "REQUEST_END";
export const REQUEST_ERROR = "REQUEST_ERROR";

export function onStart(label) {
  return {
    type: REQUEST_START,
    payload: label
  };
}

export function onSuccess(data) {
  return {
    type: REQUEST_END,
    payload: data
  };
}

export function onError(error) {
  return {
    type: REQUEST_ERROR,
    error: error
  };
}
