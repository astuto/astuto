import * as React from 'react';

import PostListByPostStatus from './PostListByPostStatus';
import MultiSelect, { MultiSelectOption } from '../common/MultiSelect';

import IPostStatus from '../../interfaces/IPostStatus';
import IPostJSON from '../../interfaces/json/IPost';
import IBoard from '../../interfaces/IBoard';

interface Props {
  postStatuses: Array<IPostStatus>;
  posts: Array<IPostJSON>;
  boards: Array<IBoard>;
}

interface State {
  selectedBoards: Array<MultiSelectOption>;
  selectedPostStatuses: Array<MultiSelectOption>;
}

class Roadmap extends React.Component<Props, State> {
  private showBoardFilter: boolean;
  private showPostStatusFilter: boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedBoards: props.boards.map(board => ({ value: board.id, label: board.name })),
      selectedPostStatuses: props.postStatuses.map(postStatus => ({ value: postStatus.id, label: postStatus.name, color: postStatus.color })),
    };

    // read query params
    const queryParams = new URLSearchParams(window.location.search);
    this.showBoardFilter = queryParams.get('show_board_filter') !== 'false';
    this.showPostStatusFilter = queryParams.get('show_post_status_filter') !== 'false';

    this.setSelectedBoards = this.setSelectedBoards.bind(this);
    this.setSelectedPostStatuses = this.setSelectedPostStatuses.bind(this);
  }

  setSelectedBoards(selectedBoards: Array<MultiSelectOption>) {
    this.setState({
      ...this.state,
      selectedBoards,
    });
  }

  setSelectedPostStatuses(selectedPostStatuses: Array<MultiSelectOption>) {
    this.setState({
      ...this.state,
      selectedPostStatuses,
    });
  }

  render() {
    const { postStatuses, posts, boards } = this.props;
    const { selectedBoards, selectedPostStatuses } = this.state;

    const boardSelectOptions = boards.map(board => ({ value: board.id, label: board.name }));
    const postStatusSelectOptions = postStatuses.map(postStatus => ({ value: postStatus.id, label: postStatus.name, color: postStatus.color }));

    // Filter by board
    const filteredPosts = posts.filter(post =>
      selectedBoards.some(selectedBoard => selectedBoard.value === post.board_id)
    );

    // Filter by post status
    const filteredPostStatuses = postStatuses.filter(postStatus => 
      selectedPostStatuses.some(selectedPostStatus => selectedPostStatus.value === postStatus.id)
    );

    return (
      <div className="roadmap">
        <div className="filters">
          {
            this.showBoardFilter &&
              <MultiSelect
                options={boardSelectOptions}
                defaultValue={selectedBoards}
                onChange={this.setSelectedBoards}
                className="boardSelect"
              />
          }

          {
            this.showPostStatusFilter &&
              <MultiSelect
                options={postStatusSelectOptions}
                defaultValue={selectedPostStatuses}
                onChange={this.setSelectedPostStatuses}
                className="postStatusSelect"
              />
          }
        </div>

        <div className="roadmapColumns">
          {filteredPostStatuses.map((postStatus, i) => (
            <PostListByPostStatus
              postStatus={postStatus}
              posts={filteredPosts.filter(post => post.post_status_id === postStatus.id)}
              boards={boards}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Roadmap;