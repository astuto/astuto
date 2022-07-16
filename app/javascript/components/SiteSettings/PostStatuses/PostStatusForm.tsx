import * as React from 'react';
import I18n from 'i18n-js';

import Button from '../../common/Button';

import padStart from '../../../helpers/padStart';

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
    return '#' + padStart((Math.random() * 0xFFFFFF << 0).toString(16), 6, '0');
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
      <form className="postStatusForm">
        <input
          type="text"
          placeholder={I18n.t('site_settings.post_statuses.form.name')}
          value={name}
          onChange={e => this.onNameChange(e.target.value)}
          autoFocus
          className="form-control"
        />
        
        <input
          type="color"
          value={color}
          onChange={e => this.onColorChange(e.target.value)}
          className="form-control postStatusColorInput"
        />

        <Button
          onClick={e => {
            e.preventDefault();
            this.onSubmit();
          }}
          className="newPostStatusButton"
          disabled={!this.isFormValid()}
        >
          {
              mode === 'create' ?
                I18n.t('common.buttons.create')
              :
                I18n.t('common.buttons.update')
            }
        </Button>
      </form>
    );
  }
}

export default PostStatusForm;