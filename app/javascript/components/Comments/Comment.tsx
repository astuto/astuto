import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import I18n from 'i18n-js';

import NewComment from './NewComment';

import { ReplyFormState } from '../../reducers/replyFormReducer';

import CommentEditForm from './CommentEditForm';
import CommentFooter from './CommentFooter';
import { StaffIcon } from '../common/Icons';
import Avatar from '../common/Avatar';
import CommentAttachments from './CommentAttachments';

interface Props {
  id: number;
  body: string;
  isPostUpdate: boolean;
  attachmentUrls?: string[];
  userFullName: string;
  userEmail: string;
  userAvatar?: string;
  userRole: number;
  createdAt: string;
  updatedAt: string;

  replyForm: ReplyFormState;
  handleToggleCommentReply(): void;
  handleCommentReplyBodyChange(e: React.FormEvent): void;

  handleSubmitComment(body: string, parentId: number, isPostUpdate: boolean, attachments: File[], onSuccess: Function): void;
  handleUpdateComment(commentId: number, body: string, isPostUpdate: boolean, onSuccess: Function): void;
  handleDeleteComment(id: number): void;

  isLoggedIn: boolean;
  isPowerUser: boolean;
  currentUserEmail: string;
  currentUserAvatar?: string;
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
      attachmentUrls,
      userFullName,
      userEmail,
      userAvatar,
      userRole,
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
      currentUserAvatar,
    } = this.props;

    return (
      <div className="comment">
        <div className="commentHeader">
          <Avatar avatarUrl={userAvatar} email={userEmail} size={28} />
          <span className="commentAuthor">{userFullName}</span>
          
          { userRole > 0 && <StaffIcon /> }

          {
            isPostUpdate &&
              <span className="postUpdateBadge">
                {I18n.t('post.comments.post_update_badge')}
              </span>
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

              {
                attachmentUrls && attachmentUrls.length > 0 &&
                  <CommentAttachments attachmentUrls={attachmentUrls} />
              }

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
              userAvatar={currentUserAvatar}
            />
            :
            null
        }
      </div>
    );
  }
}

export default Comment;