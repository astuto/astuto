import React, { useState } from 'react';
import I18n from 'i18n-js';
import Select from 'react-select';

// To keep in sync with app/workflows/create_liquid_template_context_workflow.rb

const tenantOptions = [
  { value: '{{ tenant.site_name }}', label: 'Feedback space name' },
  { value: '{{ tenant.subdomain }}', label: 'Feedback space subdomain' },
  { value: '{{ tenant.custom_domain }}', label: 'Feedback space custom domain' },
];

const boardOptions = [
  { value: '{{ board.id }}', label: 'Board ID' },
  { value: '{{ board.name }}', label: 'Board name' },
  { value: '{{ board.description }}', label: 'Board description' },
  { value: '{{ board.slug }}', label: 'Board slug' },
  { value: '{{ board.created_at }}', label: 'Board created at datetime' },
  { value: '{{ board.updated_at }}', label: 'Board updated at datetime' },
];

const postStatusOptions = [
  { value: '{{ post_status.id }}', label: 'Post status ID' },
  { value: '{{ post_status.name }}', label: 'Post status name' },
  { value: '{{ post_status.color }}', label: 'Post status color' },
  { value: '{{ post_status.show_in_roadmap }}', label: 'Post status show in roadmap flag' },
  { value: '{{ post_status.created_at }}', label: 'Post status created at datetime' },
  { value: '{{ post_status.updated_at }}', label: 'Post status updated at datetime' },
];

const userOptions = (userKeyValue: string, userKeyLabel: string) => [
  { value: `{{ ${userKeyValue}.id }}`, label: `${userKeyLabel} ID` },
  { value: `{{ ${userKeyValue}.email }}`, label: `${userKeyLabel} email` },
  { value: `{{ ${userKeyValue}.full_name }}`, label: `${userKeyLabel} full name` },
  { value: `{{ ${userKeyValue}.role }}`, label: `${userKeyLabel} role` },
  { value: `{{ ${userKeyValue}.status }}`, label: `${userKeyLabel} status` },
  { value: `{{ ${userKeyValue}.created_at }}`, label: `${userKeyLabel} created at datetime` },
  { value: `{{ ${userKeyValue}.updated_at }}`, label: `${userKeyLabel} updated at datetime` },
];

const postOptions = [
  { value: '{{ post.id }}', label: 'Post ID' },
  { value: '{{ post.title }}', label: 'Post title' },
  { value: '{{ post.description }}', label: 'Post description' },
  { value: '{{ post.slug }}', label: 'Post slug' },
  { value: '{{ post.created_at }}', label: 'Post created at datetime' },
  { value: '{{ post.updated_at }}', label: 'Post updated at datetime' },
  { value: '{{ post.url }}', label: 'Post URL' },
];

const commentOptions = [
  { value: '{{ comment.id }}', label: 'Comment ID' },
  { value: '{{ comment.body }}', label: 'Comment body' },
  { value: '{{ comment.created_at }}', label: 'Comment created at datetime' },
  { value: '{{ comment.updated_at }}', label: 'Comment updated at datetime' },
];

const optionsByWebhookTrigger = {
  'new_post': [
    ...postOptions,
    ...userOptions('post_author', 'Post author'),
    ...boardOptions,
    ...tenantOptions,
  ],
  'new_post_pending_approval': [
    ...postOptions,
    ...userOptions('post_author', 'Post author'),
    ...boardOptions,
    ...tenantOptions,
  ],
  'delete_post': [
    ...postOptions,
    ...userOptions('post_author', 'Post author'),
    ...boardOptions,
    ...tenantOptions,
  ],
  'post_status_change': [
    ...postOptions,
    ...userOptions('post_author', 'Post author'),
    ...boardOptions,
    ...postStatusOptions,
    ...tenantOptions,
  ],
  'new_comment': [
    ...commentOptions,
    ...userOptions('comment_author', 'Comment author'),
    ...postOptions,
    ...userOptions('post_author', 'Post author'),
    ...boardOptions,
    ...tenantOptions,
  ],
  'new_vote': [
    ...userOptions('vote_author', 'Vote author'),
    ...postOptions,
    ...userOptions('post_author', 'Post author'),
    ...boardOptions,
    ...tenantOptions,
  ],
  'new_user': [
    ...userOptions('user', 'User'),
    ...tenantOptions,
  ],
};

interface Props {
  webhookTrigger: string;
  onChange: (option: any) => void;
}

const TemplateVariablesSelector = ({
  webhookTrigger,
  onChange,
}: Props) => {
  const options = optionsByWebhookTrigger[webhookTrigger] || [];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    onChange(option.value);

    // Reset the selection
    setSelectedOption(null);
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isClearable={false}
      isSearchable
      placeholder={I18n.t('site_settings.webhooks.form.template_variables_selector_placeholder')}
      styles={{
        control: (provided, state) => ({
          ...provided,
          boxShadow: 'none',
          borderColor: state.isFocused ? '#333333' : '#cdcdcd',
          '&:hover': {
            boxShadow: 'none',
            borderColor: '#333333',
          },
        }),
        option: (provided, state) => ({
          ...provided,
          color: 'inherit',
          backgroundColor: state.isFocused ? '#f2f2f2' : 'white',
        }),
      }}
    />
  );
};

export default TemplateVariablesSelector;