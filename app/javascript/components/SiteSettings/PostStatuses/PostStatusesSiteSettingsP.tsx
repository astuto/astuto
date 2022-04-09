import * as React from 'react';

import { PostStatusesState } from "../../../reducers/postStatusesReducer";
import PostStatusEditable from './PostStatusEditable';

interface Props {
  authenticityToken: string;
  postStatuses: PostStatusesState;

  requestPostStatuses(): void;
}

class PostStatusesSiteSettingsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestPostStatuses();
  }

  render() {
    const { postStatuses } = this.props;
    
    return (
      postStatuses.items.map((postStatus, i) => (
        <PostStatusEditable
          id={postStatus.id}
          name={postStatus.name}
          color={postStatus.color}
          key={i}
        />
      ))
    );
  }
}

export default PostStatusesSiteSettingsP;