import * as React from 'react';

import Button from '../../shared/Button';

interface Props {
  mode: 'create' | 'update';

  id?: number;
  name?: string;
  description?: string;

  handleSubmit?(
    name: string,
    description: string,
    onSuccess: Function,
  ): void;
  handleUpdate?(
    id: number,
    name: string,
    description?: string,
  ): void;
}

interface State {
  name: string;
  description: string;
}

class BoardForm extends React.Component<Props, State> {
  initialState: State = {
    name: '',
    description: '',
  };

  constructor(props: Props) {
    super(props);

    this.state = this.props.mode === 'create' ?
      this.initialState
      :
      {
        name: this.props.name,
        description: this.props.description,
      };

    this.onSubmit = this.onSubmit.bind(this);
  }

  isFormValid() {
    return this.state.name && this.state.name.length > 0;
  }

  onNameChange(nameText: string) {
    this.setState({
      name: nameText,
    });
  }

  onDescriptionChange(descriptionText: string) {
    this.setState({
      description: descriptionText,
    });
  }

  onSubmit() {
    if (this.props.mode === 'create') {
      this.props.handleSubmit(
        this.state.name,
        this.state.description,
        () => this.setState({...this.initialState}),
      );
    } else {
      this.props.handleUpdate(this.props.id, this.state.name, this.state.description);
    }
  }

  render() {
    const {mode} = this.props;
    const {name, description} = this.state;

    return (
      <div className="boardForm">
        <div className="boardMandatoryForm">
          <input
            type="text"
            placeholder="Board name"
            value={name}
            onChange={e => this.onNameChange(e.target.value)}
            className="form-control"
          />

          <Button
            onClick={this.onSubmit}
            className="newBoardButton"
            disabled={!this.isFormValid()}
          >
            {mode === 'create' ? 'Create' : 'Save'}
          </Button>
        </div>
        
        <textarea
          placeholder="Optional board description"
          value={description}
          onChange={e => this.onDescriptionChange(e.target.value)}
          className="form-control"
        />
      </div>
    );
  }
}

export default BoardForm;