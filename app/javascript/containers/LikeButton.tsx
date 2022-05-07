import { connect } from 'react-redux';

import LikeButtonP from '../components/LikeButton/LikeButtonP';

import { submitLike } from '../actions/Like/submitLike';

const mapDispatchToProps = dispatch => ({
  handleLikeSubmit(postId: number, isLike: boolean, authenticityToken: string) {
    dispatch(submitLike(postId, isLike, authenticityToken));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(LikeButtonP);