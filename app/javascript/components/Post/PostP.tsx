import * as React from 'react';

import IPost from '../../interfaces/IPost';
import IPostStatus from '../../interfaces/IPostStatus';

import PostStatusSelect from './PostStatusSelect';
import PostStatusLabel from '../shared/PostStatusLabel';
import Comments from '../../containers/Comments';
import { MutedText } from '../shared/CustomTexts';

import friendlyDate from '../../helpers/friendlyDate';

interface Props {
  postId: number;
  post: IPost;
  postStatuses: Array<IPostStatus>;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  authenticityToken: string;

  requestPost(postId: number): void;
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
      postStatuses,

      isPowerUser,
      authenticityToken,

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
                <PostStatusSelect
                  postStatuses={postStatuses}
                  selectedPostStatusId={post.postStatusId}
                  handleChange={
                    newPostStatusId => changePostStatus(post.id, newPostStatusId, authenticityToken)
                  }
                />
              :
                <PostStatusLabel
                  {...postStatuses.find(postStatus => postStatus.id === post.postStatusId)}
                />
            }
            <p className="postDescription">{post.description}</p>
            <MutedText>{friendlyDate(post.createdAt)}</MutedText>
          </div>

          <Comments
            postId={this.props.postId}
            authenticityToken={authenticityToken}
          />
        </div>
      </div>
    );
  }
}

export default PostP;