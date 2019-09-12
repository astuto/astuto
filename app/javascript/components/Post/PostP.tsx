import * as React from 'react';

import IPost from '../../interfaces/IPost';
import IPostStatus from '../../interfaces/IPostStatus';

import PostStatusSelect from './PostStatusSelect';

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
      <div>
        <h1>{post.title}</h1>
        {
          isPowerUser ?
            <PostStatusSelect
              postStatuses={postStatuses}
              selectedPostStatusId={post.postStatusId}
              handleChange={
                newPostStatusId => changePostStatus(post.id, newPostStatusId, authenticityToken)
              }
            />
          :
            <span>LLL</span>
        }

        <p>{post.description}</p>
      </div>
    );
  }
}

export default PostP;