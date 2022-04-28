import { string } from 'prop-types';
import * as React from 'react';
import Button from '../../shared/Button';

interface Props {
  handleSubmit(
    name: string,
    color: string,
  ): void;
}

interface State {
  name: string;
  color: string;
}

class NewPostStatusForm extends React.Component<Props, State> {
  initialState: State = {
    name: '',
    color: this.getRandomColor(),
  };

  constructor(props: Props) {
    super(props);

    this.state = this.initialState;
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

  onSubmit(name: string, color: string) {
    this.props.handleSubmit(name, color);
    this.setState({...this.initialState, color: this.getRandomColor()});
  }

  render() {
    const {name, color} = this.state;

    return (
      <div className="newPostStatusForm">
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
          onClick={() => this.onSubmit(name, color)}
          className="newPostStatusButton"
          disabled={!this.isFormValid()}
        >
          Create
        </Button>
      </div>
    );
  }
}

export default NewPostStatusForm;