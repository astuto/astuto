import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import Gravatar from 'react-gravatar';
import I18n from 'i18n-js';

import NewComment from './NewComment';
import Separator from '../common/Separator';
import { MutedText } from '../common/CustomTexts';

import { ReplyFormState } from '../../reducers/replyFormReducer';

import friendlyDate from '../../helpers/datetime';
import Button from '../common/Button';

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
  commentBody: string;
  commentIsPostUpdate: boolean;
}

class Comment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editMode: false,
      commentBody: '',
      commentIsPostUpdate: false,
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleCommentBodyChange = this.handleCommentBodyChange.bind(this);
    this.handleCommentIsPostUpdateChange = this.handleCommentIsPostUpdateChange.bind(this);
  }

  toggleEditMode() {
    if (this.state.editMode === false) {
      this.setState({
        commentBody: this.props.body,
        commentIsPostUpdate: this.props.isPostUpdate,
      });
    }
    this.setState({editMode: !this.state.editMode});
  }

  handleCommentBodyChange(newCommentBody: string) {
    this.setState({commentBody: newCommentBody});
  }

  handleCommentIsPostUpdateChange(newIsPostUpdate: boolean) {
    this.setState({commentIsPostUpdate: newIsPostUpdate});
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
      handleUpdateComment,
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
            <div className="editCommentForm">
              <textarea
                value={this.state.commentBody}
                onChange={e => this.handleCommentBodyChange(e.target.value)}
                className="commentForm"
              />

              <div>
                <div>
                  <input
                    id="isPostUpdateFlagUpdateForm"
                    type="checkbox"
                    onChange={e => this.handleCommentIsPostUpdateChange(e.target.checked)}
                    checked={this.state.commentIsPostUpdate || false}
                  />
                  &nbsp;
                  <label htmlFor="isPostUpdateFlagUpdateForm">{I18n.t('post.new_comment.is_post_update')}</label>
                </div>

                <div>
                  <a className="commentLink" onClick={this.toggleEditMode}>
                    { I18n.t('common.buttons.cancel') }
                  </a>
                  &nbsp;
                  <Button
                    onClick={() => handleUpdateComment(id, this.state.commentBody, this.state.commentIsPostUpdate, this.toggleEditMode)}
                  >
                    { I18n.t('common.buttons.update') }
                  </Button>
                </div>
              </div>
            </div>
          :
            <>
            <ReactMarkdown
              className="commentBody"
              disallowedTypes={['heading', 'image', 'html']}
              unwrapDisallowed
            >
              {body}
            </ReactMarkdown>

            <div className="commentFooter">
              <a className="commentReplyButton commentLink" onClick={handleToggleCommentReply}>
                {
                  replyForm.isOpen ?
                    I18n.t('common.buttons.cancel')
                  :
                    I18n.t('post.comments.reply_button')
                }
              </a>
              {
                isPowerUser || currentUserEmail === userEmail ?
                  <>
                    <Separator />
                    <a onClick={this.toggleEditMode} className="commentLink">
                      {I18n.t('common.buttons.edit')}
                    </a>

                    <Separator />
                    <a
                      onClick={() => confirm(I18n.t('common.confirmation')) && handleDeleteComment(id)}
                      className="commentLink">
                        {I18n.t('common.buttons.delete')}
                    </a>
                  </>
                :
                  null
              }
              <Separator />
              <MutedText>{friendlyDate(createdAt)}</MutedText>

              {
                createdAt !== updatedAt ?
                  <>
                    <Separator />
                    <MutedText>{ I18n.t('common.edited') }</MutedText>
                  </>
                :
                  null
              }
            </div>
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