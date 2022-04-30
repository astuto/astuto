import * as React from 'react';

import Button from '../../shared/Button';

interface Props {
  mode: 'create' | 'update';

  id?: number;
  name?: string;
  color?: string;

  handleSubmit?(
    name: string,
    color: string,
    onSuccess: Function,
  ): void;
  handleUpdate?(
    id: number,
    name: string,
    color: string,
  ): void;
}

interface State {
  name: string;
  color: string;
}

class PostStatusForm extends React.Component<Props, State> {
  initialState: State = {
    name: '',
    color: this.getRandomColor(),
  };

  constructor(props: Props) {
    super(props);

    this.state = this.props.mode === 'create' ?
      this.initialState
      :
      {
        name: this.props.name,
        color: this.props.color,
      };

    this.onSubmit = this.onSubmit.bind(this);
  }

  getRandomColor() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  }

  isFormValid() {
    return this.state.name && this.state.name.length > 0 &&
      this.state.color && this.state.color.length === 7;
  }

  onNameChange(nameText: string) {
    this.setState({
      name: nameText,
    });
  }

  onColorChange(colorText: string) {
    this.setState({
      color: colorText,
    });
  }

  onSubmit() {
    if (this.props.mode === 'create') {
      this.props.handleSubmit(
        this.state.name,
        this.state.color,
        () => this.setState({...this.initialState, color: this.getRandomColor()}),
      );
    } else {
      this.props.handleUpdate(this.props.id, this.state.name, this.state.color);
    }
  }

  render() {
    const {mode} = this.props;
    const {name, color} = this.state;

    return (
      <div className="postStatusForm">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => this.onNameChange(e.target.value)}
          className="form-control"
        />
        
        <input
          type="color"
          value={color}
          onChange={e => this.onColorChange(e.target.value)}
          className="form-control"
        />

        <Button
          onClick={this.onSubmit}
          className="newPostStatusButton"
          disabled={!this.isFormValid()}
        >
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </div>
    );
  }
}

export default PostStatusForm;