import * as React from 'react';
import I18n from 'i18n-js';
import Button from '../common/Button';

interface Props {
  initialBody: string;
  initialIsPostUpdate: boolean;

  isPowerUser: boolean;

  handleUpdateComment(body: string, isPostUpdate: boolean): void;
  toggleEditMode(): void;
}

interface State {
  body: string;
  isPostUpdate: boolean;
}

class CommentEditForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      isPostUpdate: false,
    };

    this.handleCommentBodyChange = this.handleCommentBodyChange.bind(this);
    this.handleCommentIsPostUpdateChange = this.handleCommentIsPostUpdateChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      body: this.props.initialBody,
      isPostUpdate: this.props.initialIsPostUpdate,
    });
  }

  handleCommentBodyChange(newCommentBody: string) {
    this.setState({ body: newCommentBody });
  }

  handleCommentIsPostUpdateChange(newIsPostUpdate: boolean) {
    this.setState({ isPostUpdate: newIsPostUpdate });
  }

  render() {
    const { isPowerUser, handleUpdateComment, toggleEditMode } = this.props;
    const { body, isPostUpdate } = this.state;

    return (
      <div className="editCommentForm">
        <textarea
          value={body}
          onChange={e => this.handleCommentBodyChange(e.target.value)}
          className="commentForm"
        />

        <div>
          <div>
            {
              isPowerUser ?
                <>
                  <input
                    id="isPostUpdateFlagUpdateForm"
                    type="checkbox"
                    onChange={e => this.handleCommentIsPostUpdateChange(e.target.checked)}
                    checked={isPostUpdate || false}
                  />
                  &nbsp;
                  <label htmlFor="isPostUpdateFlagUpdateForm">{I18n.t('post.new_comment.is_post_update')}</label>
                </>
              :
                null
            }
            
          </div>

          <div>
            <a className="commentLink" onClick={toggleEditMode}>
              { I18n.t('common.buttons.cancel') }
            </a>
            &nbsp;
            <Button
              onClick={() => handleUpdateComment(body, isPostUpdate)}
            >
              { I18n.t('common.buttons.update') }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentEditForm;