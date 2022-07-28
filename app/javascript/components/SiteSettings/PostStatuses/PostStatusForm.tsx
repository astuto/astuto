import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import I18n from 'i18n-js';

import Button from '../../common/Button';

import padStart from '../../../helpers/padStart';

interface Props {
  mode: 'create' | 'update';

  id?: number;
  name?: string;
  color?: string;

  handleCreate?(
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

interface IPostStatusForm {
  name: string;
  color: string;
}

const PostStatusForm = ({
  mode,
  id,
  name,
  color,
  handleCreate,
  handleUpdate,
}: Props) => {
  const getRandomColor = () => 
    '#' + padStart((Math.random() * 0xFFFFFF << 0).toString(16), 6, '0');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IPostStatusForm>({
    mode: 'onChange',
    defaultValues: {
      name: name || '',
      color: color || getRandomColor(),
    },
  });

  const onSubmit: SubmitHandler<IPostStatusForm> = data => {
    if (mode === 'create') {
      handleCreate(
        data.name,
        data.color,
        () => reset({ name: '', color: getRandomColor() })
      );
    } else {
      handleUpdate(id, data.name, data.color);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="postStatusForm">
      <input
        {...register('name', { required: true })}
        placeholder={I18n.t('site_settings.post_statuses.form.name')}
        autoFocus={mode === 'update'}
        className="formControl"
      />
      
      <input
        {...register('color', { required: true })}
        type="color"
        className="formControl postStatusColorInput"
      />

      <Button
        onClick={() => null}
        className="newPostStatusButton"
        disabled={!isValid}
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

export default PostStatusForm;