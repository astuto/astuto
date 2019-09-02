import * as React from 'react';

import PostListItem from './PostListItem';
import Spinner from '../shared/Spinner';

import IBoard from '../../interfaces/IBoard';
import IPost from '../../interfaces/IPost';

interface Props {
  board: IBoard;
}

interface State {
  posts: Array<IPost>;
  isLoading: boolean;
  error: string;
}

class PostList extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: true,
      error: '',
    };
  }

  async componentDidMount() {
    const boardId = this.props.board.id;

    try {
      let res = await fetch(`http://localhost:3000/posts?board_id=${boardId}`);
      let data = await res.json();
      this.setState({isLoading: false});

      this.setState({
        posts: data.map(post => ({
          title: post.title,
          description: post.description,
          postStatus: {
            name: post.post_status_name,
            color: post.post_status_color,
          },
        })),
      });
    } catch (e) {
      this.setState({
        error: 'An unknown error occurred, try again.'
      });
    }
  }

  render() {
    const { posts, isLoading, error } = this.state;

    return (
      <div className="postList">
        { isLoading ? <Spinner /> : null }
        { error ? <span className="error">{error}</span> : null }
        {
          posts.map((post, i) => (
            <PostListItem
              title={post.title}
              description={post.description}
              postStatus={post.postStatus}

              key={i}
            />
          ))
        }
      </div>
    );
  }
}

export default PostList;