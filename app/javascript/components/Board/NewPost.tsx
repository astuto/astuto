import * as React from 'react';

import NewPostForm from './NewPostForm';
import Spinner from '../Shared/Spinner';

import IBoard from '../../interfaces/IBoard';

import '../../stylesheets/components/Board/NewPost.scss';

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
      let res = await fetch('http://localhost:3000/posts', {
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

      let data = await res.json();

      if (data.status === 'success') this.setState({success: 'Your post has been published!'});
      else this.setState({error: data.message});

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
      <div className="newBoardContainer">
        <span className="boardName">{board.name}</span>
        <span className="boardDescription">{board.description}</span>
        {/* <span>{this.props.authenticityToken}</span> */}
        {
          isLoggedIn ?
            <button
              onClick={this.toggleForm}
              className="submitBtn btn btn-dark">
              { showForm ? 'Cancel' : 'Submit feedback' }
            </button>
          :
            <a href="http://localhost:3000/users/sign_in" className="btn btn-dark">
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
        { error ? <span className="error">{error}</span> : null }
        { success ? <span className="success">{success}</span> : null }
      </div>
    );
  }
}

export default NewPost;