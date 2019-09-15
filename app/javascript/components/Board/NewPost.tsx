import * as React from 'react';

import NewPostForm from './NewPostForm';
import Spinner from '../shared/Spinner';
import {
  TitleText,
  MutedText,
  DangerText,
  SuccessText,
} from '../shared/CustomTexts';

import IBoard from '../../interfaces/IBoard';

interface Props {
  board: IBoard;
  isLoggedIn: boolean;
  authenticityToken: string;
}

interface State {
  showForm: boolean;
  error: string;
  success: string;
  isLoading: boolean;

  title: string;
  description: string;
}

class NewPost extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      error: '',
      success: '',
      isLoading: false,

      title: '',
      description: '',
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm,
      error: '',
      success: '',
      isLoading: false,
    });
  }

  onTitleChange(title) {
    this.setState({
      title,
      error: '',
    });
  }

  onDescriptionChange(description) {
    this.setState({
      description,
    });
  }

  async submitForm(e) {
    e.preventDefault();

    this.setState({
      error: '',
      success: '',
      isLoading: true,
    });

    const boardId = this.props.board.id;
    const { authenticityToken } = this.props;
    const { title, description } = this.state;

    if (title === '') {
      this.setState({
        error: 'You forgot to enter a title!',
        isLoading: false,
      });
      return;
    }

    try {
      let res = await fetch('/posts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': authenticityToken,
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            board_id: boardId,
          },
        }),
      });
      this.setState({isLoading: false});

      if (res.status === 204) {
        this.setState({
          success: 'Your post has been published!',

          title: '',
          description: '',
        });
      } else {
        let data = await res.json();
        this.setState({error: data.error});
      }

    } catch (e) {
      this.setState({
        error: 'An unknown error occurred, try again.'
      });
    }
  }
  
  render() {
    const { board, isLoggedIn } = this.props;
    const {
      showForm,
      error,
      success,
      isLoading,
      
      title,
      description
    } = this.state;

    return (
      <div className="newBoardContainer sidebarBox">
        <TitleText>{board.name}</TitleText>
        <MutedText>{board.description}</MutedText>
        {
          isLoggedIn ?
            <button
              onClick={this.toggleForm}
              className={`submitBtn btn btn-${showForm ? 'outline-' : ''}dark my-2`}>
              { showForm ? 'Cancel' : 'Submit feedback' }
            </button>
          :
            <a href="/users/sign_in" className="btn btn-dark">
              Log in / Sign up
            </a>
        }

        {
          showForm ?
            <NewPostForm
              title={title}
              description={description}
              handleTitleChange={this.onTitleChange}
              handleDescriptionChange={this.onDescriptionChange}
              handleSubmit={this.submitForm}
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