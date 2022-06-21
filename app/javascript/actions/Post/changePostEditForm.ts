export const POST_CHANGE_EDIT_FORM_TITLE = 'POST_CHANGE_EDIT_FORM_TITLE';

interface PostChangeEditFormTitle {
  type: typeof POST_CHANGE_EDIT_FORM_TITLE,
  title: string,
}

export const changePostEditFormTitle = (
  title: string
): PostChangeEditFormTitle => ({
  type: POST_CHANGE_EDIT_FORM_TITLE,
  title,
});

export const POST_CHANGE_EDIT_FORM_DESCRIPTION = 'POST_CHANGE_EDIT_FORM_DESCRIPTION';

interface PostChangeEditFormDescription {
  type: typeof POST_CHANGE_EDIT_FORM_DESCRIPTION,
  description: string,
}

export const changePostEditFormDescription = (
  description: string
): PostChangeEditFormDescription => ({
  type: POST_CHANGE_EDIT_FORM_DESCRIPTION,
  description,
});

export const POST_CHANGE_EDIT_FORM_BOARD = 'POST_CHANGE_EDIT_FORM_BOARD';

interface PostChangeEditFormBoard {
  type: typeof POST_CHANGE_EDIT_FORM_BOARD,
  boardId: number,
}

export const changePostEditFormBoard = (
  boardId: number
): PostChangeEditFormBoard => ({
  type: POST_CHANGE_EDIT_FORM_BOARD,
  boardId,
});

export const POST_CHANGE_EDIT_FORM_POST_STATUS = 'POST_CHANGE_EDIT_FORM_POST_STATUS';

interface PostChangeEditFormPostStatus {
  type: typeof POST_CHANGE_EDIT_FORM_POST_STATUS,
  postStatusId: number,
}

export const changePostEditFormPostStatus = (
  postStatusId: number
): PostChangeEditFormPostStatus => ({
  type: POST_CHANGE_EDIT_FORM_POST_STATUS,
  postStatusId,
});

export type ChangePostEditFormActionTypes = 
  PostChangeEditFormTitle |
  PostChangeEditFormDescription |
  PostChangeEditFormBoard |
  PostChangeEditFormPostStatus;