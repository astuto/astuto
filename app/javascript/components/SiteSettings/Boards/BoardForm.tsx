import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import I18n from 'i18n-js';

import Button from '../../common/Button';

interface Props {
  mode: 'create' | 'update';

  id?: number;
  name?: string;
  description?: string;

  handleCreate?(
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

interface IBoardForm {
  name: string;
  description: string;
}

const BoardForm = ({
  mode,
  id,
  name,
  description,
  handleCreate,
  handleUpdate,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IBoardForm>({
    mode: 'onChange',
    defaultValues: {
      name: name || '',
      description: description || '',
    },
  });

  const onSubmit: SubmitHandler<IBoardForm> = data => {
    if (mode === 'create') {
      handleCreate(
        data.name,
        data.description,
        () => reset({ name: '', description: '' })
      );
    } else {
      handleUpdate(id, data.name, data.description);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="boardForm">
      <div className="boardMandatoryForm">
        <input
          {...register('name', { required: true })}
          placeholder={I18n.t('site_settings.boards.form.name')}
          autoFocus
          className="formControl"
        />

        <Button
          onClick={() => null}
          className="newBoardButton"
          disabled={!isValid}
        >
          {
            mode === 'create' ?
              I18n.t('common.buttons.create')
            :
              I18n.t('common.buttons.update')
          }
        </Button>
      </div>
      
      <textarea
        {...register('description')}
        placeholder={I18n.t('site_settings.boards.form.description')}
        className="formControl"
      />
    </form>
  );
}

export default BoardForm;