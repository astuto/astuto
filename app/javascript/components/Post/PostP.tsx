import * as React from 'react';
import ReactMarkdown from 'react-markdown';

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
import Sidebar from '../common/Sidebar';

import { LikesState } from '../../reducers/likesReducer';
import { CommentsState } from '../../reducers/commentsReducer';
import { PostStatusChangesState } from '../../reducers/postStatusChangesReducer';

import { fromRailsStringToJavascriptDate } from '../../helpers/datetime';
import PostFooter from './PostFooter';

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
  currentUserFullName: string;
  currentUserEmail: string;
  authenticityToken: string;

  requestPost(postId: number): void;
  requestLikes(postId: number): void;
  requestFollow(postId: number): void;
  requestPostStatusChanges(postId: number): void;

  deletePost(postId: number, authenticityToken: string): Promise<any>;

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
  constructor(props: Props) {
    super(props);

    this._handleDeletePost = this._handleDeletePost.bind(this);
  }

  componentDidMount() {
    const { postId } = this.props;

    this.props.requestPost(postId);
    this.props.requestLikes(postId);
    this.props.requestFollow(postId);
    this.props.requestPostStatusChanges(postId);
  }

  _handleDeletePost() {
    this.props.deletePost(
      this.props.postId,
      this.props.authenticityToken
    ).then(() => window.location.href = '/');
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
      currentUserFullName,
      currentUserEmail,
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
      fromRailsStringToJavascriptDate(a.createdAt) < fromRailsStringToJavascriptDate(b.createdAt) ? 1 : -1
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
                liked={likes.items.find(like => like.email === currentUserEmail) ? 1 : 0}
                isLoggedIn={isLoggedIn}
                authenticityToken={authenticityToken}
              />

              <h3>{post.title}</h3>
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
                        changePostStatus(post.id, newPostStatusId, currentUserFullName, currentUserEmail, authenticityToken)
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
            

            <PostFooter
              createdAt={post.createdAt}
              handleDeletePost={this._handleDeletePost}

              isPowerUser={isPowerUser}
              authorEmail={post.userEmail}
              authorFullName={post.userFullName}
              currentUserEmail={currentUserEmail}
            />
          </>

          <Comments
            postId={this.props.postId}
            isLoggedIn={isLoggedIn}
            isPowerUser={isPowerUser}
            userEmail={currentUserEmail}
            authenticityToken={authenticityToken}
          />
        </div>
      </div>
    );
  }
}

export default PostP;