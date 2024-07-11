import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import I18n from 'i18n-js';

import NewPostForm from './NewPostForm';
import Spinner from '../common/Spinner';
import {
  DangerText,
  SuccessText,
} from '../common/CustomTexts';
import Button from '../common/Button';

import IBoard from '../../interfaces/IBoard';
import buildRequestHeaders from '../../helpers/buildRequestHeaders';
import HttpStatus from '../../constants/http_status';

interface Props {
  board: IBoard;
  isLoggedIn: boolean;
  currentUserFullName: string;
  isAnonymousFeedbackAllowed: boolean;
  authenticityToken: string;

  // Time check anti-spam measure
  componentRenderedAt: number;
}

interface State {
  showForm: boolean;
  error: string;
  success: string;
  isLoading: boolean;

  title: string;
  description: string;
  isSubmissionAnonymous: boolean;

  // Honeypot anti-spam measure
  // These fields are honeypots: they are not visibile and must not be filled
  // dnf = do not fill
  dnf1: string;
  dnf2: string;
}

class NewPost extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showForm: false,
      error: '',
      success: '',
      isLoading: false,

      title: '',
      description: '',
      isSubmissionAnonymous: false,

      dnf1: '',
      dnf2: '',
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.onDnf1Change = this.onDnf1Change.bind(this)
    this.onDnf2Change = this.onDnf2Change.bind(this)
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm,
      error: '',
      success: '',
      isLoading: false,
    });
  }

  onTitleChange(title: string) {
    this.setState({
      title,
      error: '',
    });
  }

  onDescriptionChange(description: string) {
    this.setState({
      description,
    });
  }

  onDnf1Change(dnf1: string) {
    this.setState({
      dnf1,
    });
  }

  onDnf2Change(dnf2: string) {
    this.setState({
      dnf2,
    });
  }

  async submitForm(e: React.FormEvent) {
    e.preventDefault();

    this.setState({
      error: '',
      success: '',
      isLoading: true,
    });

    const boardId = this.props.board.id;
    const { authenticityToken, componentRenderedAt } = this.props;
    const { title, description, dnf1, dnf2 } = this.state;

    if (title === '') {
      this.setState({
        error: I18n.t('board.new_post.no_title'),
        isLoading: false,
      });
      return;
    }

    try {
      const res = await fetch('/posts', {
        method: 'POST',
        headers: buildRequestHeaders(authenticityToken),
        body: JSON.stringify({
          post: {
            title,
            description,
            board_id: boardId,
            
            dnf1,
            dnf2,
            form_rendered_at: componentRenderedAt,
          },
        }),
      });
      const json = await res.json();
      this.setState({isLoading: false});
      
      if (res.status === HttpStatus.Created) {
        this.setState({
          success: I18n.t('board.new_post.submit_success'),

          title: '',
          description: '',
        });

        setTimeout(() => (
          window.location.href = `/posts/${json.slug || json.id}`
        ), 1000);
      } else {
        this.setState({error: json.error});
      }

    } catch (e) {
      this.setState({
        error: I18n.t('common.errors.unknown')
      });
    }
  }
  
  render() {
    const {
      board,
      isLoggedIn,
      currentUserFullName,
      isAnonymousFeedbackAllowed
    } = this.props;

    const {
      showForm,
      error,
      success,
      isLoading,
      
      title,
      description,
      isSubmissionAnonymous,

      dnf1,
      dnf2,
    } = this.state;

    return (
      <div className="newPostContainer sidebarBox">
        <span className="boardTitle">{board.name}</span>

        <ReactMarkdown
          className="boardDescription"
          disallowedTypes={['heading', 'image', 'html']}
          unwrapDisallowed
        >
          {board.description}
        </ReactMarkdown>

        <Button
          onClick={() => {
            
            if (showForm) {
              this.toggleForm();
              return;
            }

            if (isLoggedIn) {
              this.toggleForm();
              this.setState({ isSubmissionAnonymous: false });
            } else {
              window.location.href = '/users/sign_in';
            }
          }}
          className="submitBtn"
          outline={showForm}
        >
          {
            showForm ?
              I18n.t('board.new_post.cancel_button')
            :
              I18n.t('board.new_post.submit_button')
          }
        </Button>

        {
          (isAnonymousFeedbackAllowed && !showForm) &&
            <div className="anonymousFeedbackLink">
              {I18n.t('common.words.or')}
              &nbsp;
              <a
                onClick={() => {
                  this.toggleForm();
                  this.setState({ isSubmissionAnonymous: true });
                }}
                className="link"
              >
                {I18n.t('board.new_post.submit_anonymous_button').toLowerCase()}
              </a>
            </div>
        }

        {
          showForm ?
            <NewPostForm
              title={title}
              description={description}
              handleTitleChange={this.onTitleChange}
              handleDescriptionChange={this.onDescriptionChange}

              handleSubmit={this.submitForm}

              dnf1={dnf1}
              dnf2={dnf2}
              handleDnf1Change={this.onDnf1Change}
              handleDnf2Change={this.onDnf2Change}

              currentUserFullName={currentUserFullName}
              isSubmissionAnonymous={isSubmissionAnonymous}
            />
          :
            null
        }

        { isLoading ? <Spinner /> : null }
        { error ? <DangerText>{error}</DangerText> : null }
        { success ? <SuccessText>{success}</SuccessText> : null }
      </div>
    );
  }
}

export default NewPost;