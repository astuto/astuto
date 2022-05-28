import IPostStatusChange from "../../interfaces/IPostStatusChange";

export const POST_STATUS_CHANGE_SUBMITTED = 'POST_STATUS_CHANGE_SUBMITTED';
export interface PostStatusChangeSubmitted {
  type: typeof POST_STATUS_CHANGE_SUBMITTED;
  postStatusChange: IPostStatusChange;
}

export const postStatusChangeSubmitted = (
  postStatusChange: IPostStatusChange
): PostStatusChangeSubmitted => ({
  type: POST_STATUS_CHANGE_SUBMITTED,
  postStatusChange,
});