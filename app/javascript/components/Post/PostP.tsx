import * as React from 'react';

import IPost from '../../interfaces/IPost';
import IPostStatus from '../../interfaces/IPostStatus';
import IBoard from '../../interfaces/IBoard';

import LikeList from './LikeList';
import LikeButton from '../../containers/LikeButton';
import PostBoardSelect from './PostBoardSelect';
import PostStatusSelect from './PostStatusSelect';
import PostBoardLabel from '../shared/PostBoardLabel';
import PostStatusLabel from '../shared/PostStatusLabel';
import Comments from '../../containers/Comments';
import { MutedText } from '../shared/CustomTexts';

import friendlyDate from '../../helpers/friendlyDate';
import { LikesState } from '../../reducers/likesReducer';

interface Props {
  postId: number;
  post: IPost;
  likes: LikesState;
  boards: Array<IBoard>;
  postStatuses: Array<IPostStatus>;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  userEmail: string;
  authenticityToken: string;

  requestPost(postId: number): void;
  requestLikes(postId: number): void;
  changePostBoard(
    postId: number,
    newBoardId: number,
    authenticityToken: string,
  ): void;
  changePostStatus(
    postId: number,
    newPostStatusId: number,
    authenticityToken: string,
  ): void;
}

class PostP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestPost(this.props.postId);
    this.props.requestLikes(this.props.postId);
  }

  render() {
    const {
      post,
      likes,
      boards,
      postStatuses,

      isLoggedIn,
      isPowerUser,
      userEmail,
      authenticityToken,

      changePostBoard,
      changePostStatus,
    } = this.props;

    return (
      <div className="pageContainer">
        <div className="sidebar">
          <LikeList
            likes={likes.items}
            areLoading={likes.areLoading}
            error={likes.error}
          />
        </div>

        <div className="postAndCommentsContainer">
          <div className="postContainer">
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
                  <a href={`/admin/posts/${post.id}`} data-turbolinks="false">Edit</a> : null
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
                      newPostStatusId => changePostStatus(post.id, newPostStatusId, authenticityToken)
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
            <p className="postDescription">{post.description}</p>
            <MutedText>{friendlyDate(post.createdAt)}</MutedText>
          </div>

          <Comments
            postId={this.props.postId}
            isLoggedIn={isLoggedIn}
            isPowerUser={isPowerUser}
            authenticityToken={authenticityToken}
          />
        </div>
      </div>
    );
  }
}

export default PostP;