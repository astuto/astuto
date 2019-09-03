import * as React from 'react';

import NewPost from './NewPost';
import PostStatusFilter from './PostStatusFilter';
import PostList from './PostList';

import IBoard from '../../interfaces/IBoard';
import IPost from '../../interfaces/IPost';
import IPostStatus from '../../interfaces/IPostStatus';

import '../../stylesheets/components/Board.scss';

interface Props {
  board: IBoard;
  isLoggedIn: boolean;
  authenticityToken: string;
}

interface State {
  filters: {
    byPostStatus: number;
  };
  posts: {
    items: Array<IPost>;
    areLoading: boolean;
    error: string;
  };
  postStatuses: {
    items: Array<IPostStatus>;
    areLoading: boolean;
    error: string;
  };
}

class Board extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        byPostStatus: 0,
      },
      posts: {
        items: [],
        areLoading: true,
        error: '',
      },
      postStatuses: {
        items: [],
        areLoading: true,
        error: '',
      }
    };

    this.requestPosts = this.requestPosts.bind(this);
    this.requestPostStatuses = this.requestPostStatuses.bind(this);
    this.setPostStatusFilter = this.setPostStatusFilter.bind(this);
  }

  componentDidMount() {
    this.requestPosts();
    this.requestPostStatuses();
  }

  async requestPosts() {
    this.setState({
      posts: { ...this.state.posts, areLoading: true },
    });

    const boardId = this.props.board.id;
    const { byPostStatus } = this.state.filters;

    let params = '';
    if (byPostStatus) params += `&post_status_id=${byPostStatus}`;

    try {
      let res = await fetch(`http://localhost:3000/posts?board_id=${boardId}${params}`);
      let data = await res.json();

      this.setState({
        posts: {
          items: data.map(post => ({
            title: post.title,
            description: post.description,
            postStatus: {
              name: post.post_status_name,
              color: post.post_status_color,
            },
          })),
          areLoading: false,
          error: '',
        }
      });
    } catch (e) {
      this.setState({
        posts: { ...this.state.posts, error: 'An unknown error occurred, try again.' },
      });
    }
  }

  setPostStatusFilter(postStatusId: number) {
    this.setState({
      filters: { byPostStatus: postStatusId },
    }, this.requestPosts);
  }

  async requestPostStatuses() {
    this.setState({
      postStatuses: { ...this.state.postStatuses, areLoading: true },
    });

    try {
      let res = await fetch('http://localhost:3000/post_statuses');
      let data = await res.json();

      this.setState({
        postStatuses: {
          items: data.map(postStatus => ({
            id: postStatus.id,
            name: postStatus.name,
            color: postStatus.color,
          })),
          areLoading: false,
          error: '',
        },
      });
    } catch (e) {
      this.setState({
        postStatuses: { ...this.state.postStatuses, error: 'An unknown error occurred, try again.' },
      });
    }
  }

  render() {
    const { board, isLoggedIn, authenticityToken } = this.props;
    const { posts, postStatuses } = this.state;

    return (
      <div className="boardContainer">
        <div className="sidebar">
          <NewPost
            board={board}
            isLoggedIn={isLoggedIn}
            authenticityToken={authenticityToken}
          />
          <PostStatusFilter
            postStatuses={postStatuses.items}
            areLoading={postStatuses.areLoading}
            error={postStatuses.error}

            handleFilterClick={this.setPostStatusFilter}
            currentFilter={this.state.filters.byPostStatus}
          />
        </div>
        <PostList
          posts={posts.items}
          areLoading={posts.areLoading}
          error={posts.error}
        />
      </div>
    );
  }
}

export default Board;