import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import IPostStatusJSON from "../../interfaces/json/IPostStatus";
import { State } from "../../reducers/rootReducer";

export const POSTSTATUS_UPDATE_START = 'POSTSTATUS_UPDATE_START';
interface PostStatusUpdateStartAction {
  type: typeof POSTSTATUS_UPDATE_START;
}

export const POSTSTATUS_UPDATE_SUCCESS = 'POSTSTATUS_UPDATE_SUCCESS';
interface PostStatusUpdateSuccessAction {
  type: typeof POSTSTATUS_UPDATE_SUCCESS;
  postStatus: IPostStatusJSON;
}

export const POSTSTATUS_UPDATE_FAILURE = 'POSTSTATUS_UPDATE_FAILURE';
interface PostStatusUpdateFailureAction {
  type: typeof POSTSTATUS_UPDATE_FAILURE;
  error: string;
}

export type PostStatusUpdateActionTypes =
  PostStatusUpdateStartAction |
  PostStatusUpdateSuccessAction |
  PostStatusUpdateFailureAction;

const postStatusUpdateStart = (): PostStatusUpdateStartAction => ({
  type: POSTSTATUS_UPDATE_START,
});

const postStatusUpdateSuccess = (
  postStatusJSON: IPostStatusJSON,
): PostStatusUpdateSuccessAction => ({
  type: POSTSTATUS_UPDATE_SUCCESS,
  postStatus: postStatusJSON,
});

const postStatusUpdateFailure = (error: string): PostStatusUpdateFailureAction => ({
  type: POSTSTATUS_UPDATE_FAILURE,
  error,
});

interface UpdatePostStatusParams {
  id: number;
  name?: string;
  color?: string;
  showInRoadmap?: boolean;
  authenticityToken: string;
}

export const updatePostStatus = ({
  id,
  name = null,
  color = null,
  showInRoadmap = null,
  authenticityToken,
}: UpdatePostStatusParams): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(postStatusUpdateStart());

  const post_status = Object.assign({},
    name !== null ? {name} : null,
    color !== null ? {color} : null,
    showInRoadmap !== null ? {show_in_roadmap: showInRoadmap} : null
  );

  try {
    const res = await fetch(`/post_statuses/${id}`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({post_status}),
    });
    const json = await res.json();

    if (res.status === HttpStatus.OK) {
      dispatch(postStatusUpdateSuccess(json));
    } else {
      dispatch(postStatusUpdateFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(postStatusUpdateFailure(e));
    
    return Promise.resolve(null);
  }
};