import {
  ReduxActionTypes,
  EvaluationReduxAction,
} from "constants/ReduxActionConstants";
import { JSAction } from "entities/JSAction";

export type FetchActionsPayload = {
  applicationId: string;
};

export const fetchJSActions = (
  applicationId: string,
): EvaluationReduxAction<unknown> => {
  return {
    type: ReduxActionTypes.FETCH_JS_ACTIONS_INIT,
    payload: { applicationId },
  };
};

export const createJSActionRequest = (payload: Partial<JSAction>) => {
  return {
    type: ReduxActionTypes.CREATE_JS_ACTION_INIT,
    payload,
  };
};

export const createJSActionSuccess = (payload: JSAction) => {
  return {
    type: ReduxActionTypes.CREATE_JS_ACTION_SUCCESS,
    payload,
  };
};

export const copyJSActionRequest = (payload: {
  id: string;
  destinationPageId: string;
  name: string;
}) => {
  return {
    type: ReduxActionTypes.COPY_JS_ACTION_INIT,
    payload,
  };
};

export const copyJSActionSuccess = (payload: JSAction) => {
  return {
    type: ReduxActionTypes.COPY_JS_ACTION_SUCCESS,
    payload,
  };
};

export const moveJSActionRequest = (payload: {
  id: string;
  destinationPageId: string;
  originalPageId: string;
  name: string;
}) => {
  return {
    type: ReduxActionTypes.MOVE_JS_ACTION_INIT,
    payload,
  };
};

export const moveJSActionSuccess = (payload: JSAction) => {
  return {
    type: ReduxActionTypes.MOVE_JS_ACTION_SUCCESS,
    payload,
  };
};

export const deleteJSAction = (payload: { id: string; name: string }) => {
  return {
    type: ReduxActionTypes.DELETE_JS_ACTION_INIT,
    payload,
  };
};

export const deleteJSActionSuccess = (payload: { id: string }) => {
  return {
    type: ReduxActionTypes.DELETE_JS_ACTION_SUCCESS,
    payload,
  };
};

export default {
  fetchJSActions,
  deleteJSAction,
  deleteJSActionSuccess,
};
