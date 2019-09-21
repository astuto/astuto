import * as React from 'react';

import IPost from '../../interfaces/IPost';
import IPostStatus from '../../interfaces/IPostStatus';
import IBoard from '../../interfaces/IBoard';

import PostBoardSelect from './PostBoardSelect';
import PostStatusSelect from './PostStatusSelect';
import PostBoardLabel from '../shared/PostBoardLabel';
import PostStatusLabel from '../shared/PostStatusLabel';
import Comments from '../../containers/Comments';
import { MutedText } from '../shared/CustomTexts';

import friendlyDate from '../../helpers/friendlyDate';

interface Props {
  postId: number;
  post: IPost;
  boards: Array<IBoard>;
  postStatuses: Array<IPostStatus>;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  authenticityToken: string;

  requestPost(postId: number): void;

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
  }

  render() {
    const {
      post,
      boards,
      postStatuses,

      isLoggedIn,
      isPowerUser,
      authenticityToken,

      changePostBoard,
      changePostStatus,
    } = this.props;

    return (
      <div className="pageContainer">
        <div className="sidebar">
          <div className="sidebarCard"></div>
          <div className="sidebarCard"></div>
          <div className="sidebarCard"></div>
        </div>

        <div className="postAndCommentsContainer">
          <div className="postContainer">
            <h2>{post.title}</h2>
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
            authenticityToken={authenticityToken}
          />
        </div>
      </div>
    );
  }
}

export default PostP;