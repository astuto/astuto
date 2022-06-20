import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import Gravatar from 'react-gravatar';
import I18n from 'i18n-js';

import NewComment from './NewComment';

import { ReplyFormState } from '../../reducers/replyFormReducer';

import CommentEditForm from './CommentEditForm';
import CommentFooter from './CommentFooter';

interface Props {
  id: number;
  body: string;
  isPostUpdate: boolean;
  userFullName: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;

  replyForm: ReplyFormState;
  handleToggleCommentReply(): void;
  handleCommentReplyBodyChange(e: React.FormEvent): void;

  handleSubmitComment(body: string, parentId: number, isPostUpdate: boolean): void;
  handleUpdateComment(commentId: number, body: string, isPostUpdate: boolean, onSuccess: Function): void;
  handleDeleteComment(id: number): void;

  isLoggedIn: boolean;
  isPowerUser: boolean;
  currentUserEmail: string;
}

interface State {
  editMode: boolean;
}

class Comment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this._handleUpdateComment = this._handleUpdateComment.bind(this);
  }

  toggleEditMode() {
    this.setState({editMode: !this.state.editMode});
  }

  _handleUpdateComment(body: string, isPostUpdate: boolean) {
    this.props.handleUpdateComment(
      this.props.id,
      body,
      isPostUpdate,
      this.toggleEditMode,
    );
  }

  render() {
    const {
      id,
      body,
      isPostUpdate,
      userFullName,
      userEmail,
      createdAt,
      updatedAt,
    
      replyForm,
      handleToggleCommentReply,
      handleCommentReplyBodyChange,
      
      handleSubmitComment,
      handleDeleteComment,
    
      isLoggedIn,
      isPowerUser,
      currentUserEmail,
    } = this.props;

    return (
      <div className="comment">
        <div className="commentHeader">
          <Gravatar email={userEmail} size={28} className="gravatar" />
          <span className="commentAuthor">{userFullName}</span>
          {
            isPostUpdate ?
              <span className="postUpdateBadge">
                {I18n.t('post.comments.post_update_badge')}
              </span>
            :
              null
          }
        </div>

        {
          this.state.editMode ?
            <CommentEditForm
              id={id}
              initialBody={body}
              initialIsPostUpdate={isPostUpdate}

              isPowerUser={isPowerUser}

              handleUpdateComment={this._handleUpdateComment}
              toggleEditMode={this.toggleEditMode}
            />
          :
            <>
              <ReactMarkdown
                className="commentBody"
                disallowedTypes={['heading', 'image', 'html']}
                unwrapDisallowed
              >
                {body}
              </ReactMarkdown>

              <CommentFooter
                id={id}
                createdAt={createdAt}
                updatedAt={updatedAt}
                replyForm={replyForm}
                isPowerUser={isPowerUser}
                currentUserEmail={currentUserEmail}
                commentAuthorEmail={userEmail}

                handleDeleteComment={handleDeleteComment}
                handleToggleCommentReply={handleToggleCommentReply}
                toggleEditMode={this.toggleEditMode}
              />
            </>
        }
        {
          replyForm.isOpen ?
            <NewComment
              body={replyForm.body}
              parentId={id}
              postUpdateFlagValue={replyForm.isPostUpdate}
              isSubmitting={replyForm.isSubmitting}
              error={replyForm.error}
              handleChange={handleCommentReplyBodyChange}
              handlePostUpdateFlag={() => null}
              handleSubmit={handleSubmitComment}

              isLoggedIn={isLoggedIn}
              isPowerUser={isPowerUser}
              userEmail={currentUserEmail}
            />
            :
            null
        }
      </div>
    );
  }
}

export default Comment;