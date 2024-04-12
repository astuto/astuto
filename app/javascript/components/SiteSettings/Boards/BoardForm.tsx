import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import I18n from 'i18n-js';

import Button from '../../common/Button';
import { DangerText } from '../../common/CustomTexts';

interface Props {
  mode: 'create' | 'update';

  id?: number;
  name?: string;
  description?: string;
  slug?: string;

  handleCreate?(
    name: string,
    description: string,
    onSuccess: Function,
  ): void;
  handleUpdate?(
    id: number,
    name: string,
    description?: string,
    slug?: string,
  ): void;
}

interface IBoardForm {
  name: string;
  description: string;
  slug?: string;
}

const BoardForm = ({
  mode,
  id,
  name,
  description,
  slug,
  handleCreate,
  handleUpdate,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
    watch,
  } = useForm<IBoardForm>({
    mode: 'onChange',
    defaultValues: {
      name: name || '',
      description: description || '',
      slug: slug || undefined,
    },
  });

  const formBoardName = watch('name');

  const onSubmit: SubmitHandler<IBoardForm> = data => {
    if (mode === 'create') {
      handleCreate(
        data.name,
        data.description,
        () => reset({ name: '', description: '' })
      );
    } else {
      handleUpdate(id, data.name, data.description, data.slug);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="boardForm">
      <div className="boardMandatoryForm">
        <input
          {...register('name', { required: true })}
          placeholder={I18n.t('site_settings.boards.form.name')}
          autoFocus={mode === 'update'}
          autoComplete={'off'}
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
        className="boardDescriptionTextArea formControl"
      />

      {mode === 'update' && (
        <>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">boards/</div>
          </div>
          <input
            {...register('slug', { pattern: /^[a-zA-Z0-9-]+$/ })}
            type="text"
            placeholder={formBoardName.trim().replace(/\s/g, '-').toLowerCase()}
            className="formControl"
          />
        </div>
        <DangerText>
          {errors.slug?.type === 'pattern' && I18n.t('common.validations.url')}
        </DangerText>
        </>
      )}
    </form>
  );
}

export default BoardForm;