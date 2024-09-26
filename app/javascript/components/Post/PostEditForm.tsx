import * as React from 'react';
import I18n from 'i18n-js';

import PostBoardSelect from './PostBoardSelect';
import PostStatusSelect from './PostStatusSelect';

import IPostStatus from '../../interfaces/IPostStatus';
import IBoard from '../../interfaces/IBoard';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import ActionLink from '../common/ActionLink';
import { CancelIcon } from '../common/Icons';

interface Props {
  title: string;
  description?: string;
  boardId: number;
  postStatusId?: number;

  isUpdating: boolean;
  error: string;

  handleChangeTitle(title: string): void;
  handleChangeDescription(description: string): void;
  handleChangeBoard(boardId: number): void;
  handleChangePostStatus(postStatusId: number): void;

  isPowerUser: boolean;
  boards: Array<IBoard>;
  postStatuses: Array<IPostStatus>;

  toggleEditMode(): void;
  handleUpdatePost(
    title: string,
    description: string,
    boardId: number,
    postStatusId: number,
  ): void;
}

const PostEditForm = ({
  title,
  description,
  boardId,
  postStatusId,

  isUpdating,
  error,

  handleChangeTitle,
  handleChangeDescription,
  handleChangeBoard,
  handleChangePostStatus,

  isPowerUser,
  boards,
  postStatuses,

  toggleEditMode,
  handleUpdatePost,
}: Props) => (
  <div className="postEditForm">
    <div className="postHeader">
      <input
        type="text"
        value={title}
        onChange={e => handleChangeTitle(e.target.value)}
        autoFocus
        className="postTitle form-control"
      />
    </div>

    {
      isPowerUser ?
        <div className="postSettings">
          <PostBoardSelect
            boards={boards}
            selectedBoardId={boardId}
            handleChange={newBoardId => handleChangeBoard(newBoardId)}
          />
          <PostStatusSelect
            postStatuses={postStatuses}
            selectedPostStatusId={postStatusId}
            handleChange={newPostStatusId => handleChangePostStatus(newPostStatusId)}
          />
        </div>
      :
        null
    }

    <textarea
      value={description}
      onChange={e => handleChangeDescription(e.target.value)}
      rows={5}
      className="postDescription form-control"
    />

    <div className="postEditFormButtons">
      <ActionLink onClick={toggleEditMode} icon={<CancelIcon />}>
        {I18n.t('common.buttons.cancel')}
      </ActionLink>
      &nbsp;
      <Button onClick={() => handleUpdatePost(title, description, boardId, postStatusId)}>
        { isUpdating ? <Spinner /> : I18n.t('common.buttons.update') }
      </Button>
    </div>
  </div>
);

export default PostEditForm;