import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import I18n from 'i18n-js';

import IPost from '../../interfaces/IPost';
import IPostStatus from '../../interfaces/IPostStatus';
import IBoard from '../../interfaces/IBoard';

import PostUpdateList from './PostUpdateList';
import LikeList from './LikeList';
import ActionBox from './ActionBox';
import LikeButton from '../../containers/LikeButton';
import PostBoardSelect from './PostBoardSelect';
import PostStatusSelect from './PostStatusSelect';
import PostBoardLabel from '../common/PostBoardLabel';
import PostStatusLabel from '../common/PostStatusLabel';
import Comments from '../../containers/Comments';
import { MutedText } from '../common/CustomTexts';
import Sidebar from '../common/Sidebar';

import { LikesState } from '../../reducers/likesReducer';
import { CommentsState } from '../../reducers/commentsReducer';
import { PostStatusChangesState } from '../../reducers/postStatusChangesReducer';

import friendlyDate, { fromRailsStringToJavascriptDate } from '../../helpers/datetime';

interface Props {
  postId: number;
  post: IPost;
  likes: LikesState;
  followed: boolean;
  comments: CommentsState;
  postStatusChanges: PostStatusChangesState;
  boards: Array<IBoard>;
  postStatuses: Array<IPostStatus>;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  userFullName: string;
  userEmail: string;
  authenticityToken: string;

  requestPost(postId: number): void;
  requestLikes(postId: number): void;
  requestFollow(postId: number): void;
  requestPostStatusChanges(postId: number): void;
  changePostBoard(
    postId: number,
    newBoardId: number,
    authenticityToken: string,
  ): void;
  changePostStatus(
    postId: number,
    newPostStatusId: number,
    userFullName: string,
    userEmail: string,
    authenticityToken: string,
  ): void;
  submitFollow(
    postId: number,
    isFollow: boolean,
    authenticityToken: string,
  ): void;
}

class PostP extends React.Component<Props> {
  componentDidMount() {
    const {postId} = this.props;

    this.props.requestPost(postId);
    this.props.requestLikes(postId);
    this.props.requestFollow(postId);
    this.props.requestPostStatusChanges(postId);
  }

  render() {
    const {
      post,
      likes,
      followed,
      comments,
      postStatusChanges,
      boards,
      postStatuses,

      isLoggedIn,
      isPowerUser,
      userFullName,
      userEmail,
      authenticityToken,

      changePostBoard,
      changePostStatus,
      submitFollow,
    } = this.props;

    const postUpdates = [
      ...comments.items.filter(comment => comment.isPostUpdate === true),
      ...postStatusChanges.items,
    ].sort(
      (a, b) =>
      fromRailsStringToJavascriptDate(a.updatedAt) < fromRailsStringToJavascriptDate(b.updatedAt) ? 1 : -1
    );

    return (
      <div className="postContainer">
        <Sidebar>
          <PostUpdateList
            postUpdates={postUpdates}
            postStatuses={postStatuses}
            areLoading={comments.areLoading}
            error={comments.error}
          />

          <LikeList
            likes={likes.items}
            areLoading={likes.areLoading}
            error={likes.error}
          />

          <ActionBox
            followed={followed}
            submitFollow={() => submitFollow(post.id, !followed, authenticityToken)}

            isLoggedIn={isLoggedIn}
          />
        </Sidebar>

        <div className="postAndCommentsContainer">
          <>
            <div className="postHeader">
            <LikeButton
              postId={post.id}
              likesCount={likes.items.length}
              liked={likes.items.find(like => like.email === userEmail) ? 1 : 0}
              isLoggedIn={isLoggedIn}
              authenticityToken={authenticityToken}
            />
              <h2>{post.title}</h2>
              {
                isPowerUser && post ?
                  <a href={`/admin/posts/${post.id}`} data-turbolinks="false">
                    {I18n.t('post.edit_button')}
                  </a>
                :
                  null
              }
            </div>
            {
              isPowerUser && post ?
                <div className="postSettings">
                  <PostBoardSelect
                    boards={boards}
                    selectedBoardId={post.boardId}
                    handleChange={
                      newBoardId => changePostBoard(post.id, newBoardId, authenticityToken)
                    }
                  />
                  <PostStatusSelect
                    postStatuses={postStatuses}
                    selectedPostStatusId={post.postStatusId}
                    handleChange={
                      newPostStatusId =>
                        changePostStatus(post.id, newPostStatusId, userFullName, userEmail, authenticityToken)
                    }
                  />
                </div>
              :
                <div className="postInfo">
                  <PostBoardLabel
                    {...boards.find(board => board.id === post.boardId)}
                  />
                  <PostStatusLabel
                    {...postStatuses.find(postStatus => postStatus.id === post.postStatusId)}
                  />
                </div>
            }
            
            <ReactMarkdown
              className="postDescription"
              disallowedTypes={['heading', 'image', 'html']}
              unwrapDisallowed
            >
              {post.description}
            </ReactMarkdown>
            
            <MutedText>{friendlyDate(post.createdAt)}</MutedText>
          </>

          <Comments
            postId={this.props.postId}
            isLoggedIn={isLoggedIn}
            isPowerUser={isPowerUser}
            userEmail={userEmail}
            authenticityToken={authenticityToken}
          />
        </div>
      </div>
    );
  }
}

export default PostP;