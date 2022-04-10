import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import buildRequestHeaders from "../helpers/buildRequestHeaders";
import IPostStatus from "../interfaces/IPostStatus";
import { State } from "../reducers/rootReducer";

export const POSTSTATUS_ORDER_UPDATE_START = 'POSTSTATUS_ORDER_UPDATE_START';
interface PostStatusOrderUpdateStartAction {
  type: typeof POSTSTATUS_ORDER_UPDATE_START;
  newOrder: Array<IPostStatus>;
}

export const POSTSTATUS_ORDER_UPDATE_SUCCESS = 'POSTSTATUS_ORDER_UPDATE_SUCCESS';
interface PostStatusOrderUpdateSuccessAction {
  type: typeof POSTSTATUS_ORDER_UPDATE_SUCCESS;
}

export const POSTSTATUS_ORDER_UPDATE_FAILURE = 'POSTSTATUS_ORDER_UPDATE_FAILURE';
interface PostStatusOrderUpdateFailureAction {
  type: typeof POSTSTATUS_ORDER_UPDATE_FAILURE;
  error: string;
}

export type PostStatusOrderUpdateActionTypes =
  PostStatusOrderUpdateStartAction |
  PostStatusOrderUpdateSuccessAction |
  PostStatusOrderUpdateFailureAction;

const postStatusOrderUpdateStart = (
  newOrder: Array<IPostStatus>
): PostStatusOrderUpdateStartAction => ({
  type: POSTSTATUS_ORDER_UPDATE_START,
  newOrder,
});

const postStatusOrderUpdateSuccess = (): PostStatusOrderUpdateSuccessAction => ({
  type: POSTSTATUS_ORDER_UPDATE_SUCCESS,
});

const postStatusOrderUpdateFailure = (
  error: string
): PostStatusOrderUpdateFailureAction => ({
  type: POSTSTATUS_ORDER_UPDATE_FAILURE,
  error,
});

export const updatePostStatusOrder = (
  id: number,
  postStatuses: Array<IPostStatus>,
  sourceIndex: number,
  destinationIndex: number,

  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  let newOrder = createNewOrder(postStatuses, sourceIndex, destinationIndex);

  dispatch(postStatusOrderUpdateStart(newOrder));

  try {
    const res = await fetch(`/post_statuses/update_order`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        post_status: {
          id: id,
          src_index: sourceIndex,
          dst_index: destinationIndex,
        },
      }),
    });
    const json = await res.json();

    if (res.status === 200) {
      dispatch(postStatusOrderUpdateSuccess());
    } else {
      dispatch(postStatusOrderUpdateFailure(json.error));
    }
  } catch (e) {
    dispatch(postStatusOrderUpdateFailure(e));
  }
};

function createNewOrder(
  oldOrder: Array<IPostStatus>,
  sourceIndex: number,
  destinationIndex: number
) {
  let newOrder = JSON.parse(JSON.stringify(oldOrder));

  const [reorderedItem] = newOrder.splice(sourceIndex, 1);
  newOrder.splice(destinationIndex, 0, reorderedItem);

  return newOrder;
}