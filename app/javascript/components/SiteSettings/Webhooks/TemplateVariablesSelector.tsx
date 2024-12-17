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
    // only post.id is available on delete_post
    postOptions.find(option => option.value === '{{ post.id }}'),
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

// Non-exhaustive list of Liquid tags
const liquidTagsOptions = {
  label: 'Liquid tags',
  options: [
    { value: '{% if <condition> %}\n\n{% endif %}', label: 'If condition' },
    { value: '{% for <item> in <collection> %}\n\n{% endfor %}', label: 'For loop' },
    { value: '{% tablerow <item> in <collection> %}\n\n{% endtablerow %}', label: 'Tablerow loop' },
    { value: '{% assign <variable> = <value> %}', label: 'Assign variable' },
  ]
};

// Non-exhaustive list of Liquid filters
const liquidFiltersOptions = {
  label: 'Liquid filters',
  options: [
    { value: ' | abs', label: 'Absolute value' },
    { value: ' | append: <value>', label: 'Append' },
    { value: ' | capitalize', label: 'Capitalize' },
    { value: ' | ceil', label: 'Ceil' },
    { value: ' | compact', label: 'Compact' },
    { value: ' | concat: <array>', label: 'Concat' },
    { value: ' | date: <format>', label: 'Date' },
    { value: ' | default: <value>', label: 'Default' },
    { value: ' | divided_by: <value>', label: 'Divided by' },
    { value: ' | downcase', label: 'Downcase' },
    { value: ' | escape', label: 'Escape' },
    { value: ' | escape_once', label: 'Escape once' },
    { value: ' | first', label: 'First' },
    { value: ' | floor', label: 'Floor' },
    { value: ' | join: <value>', label: 'Join' },
    { value: ' | last', label: 'Last' },
    { value: ' | lstrip', label: 'Lstrip' },
    { value: ' | map: <value>', label: 'Map' },
    { value: ' | minus: <value>', label: 'Minus' },
    { value: ' | modulo: <value>', label: 'Modulo' },
    { value: ' | newline_to_br', label: 'Newline to br' },
    { value: ' | plus: <value>', label: 'Plus' },
    { value: ' | prepend: <value>', label: 'Prepend' },
    { value: ' | remove: <value>', label: 'Remove' },
    { value: ' | remove_first: <value>', label: 'Remove first' },
    { value: ' | replace: <value>', label: 'Replace' },
    { value: ' | replace_first: <value>', label: 'Replace first' },
    { value: ' | reverse', label: 'Reverse' },
    { value: ' | round', label: 'Round' },
    { value: ' | rstrip', label: 'Rstrip' },
    { value: ' | size', label: 'Size' },
    { value: ' | slice: <value>', label: 'Slice' },
    { value: ' | sort', label: 'Sort' },
    { value: ' | sort_natural', label: 'Sort natural' },
    { value: ' | split: <value>', label: 'Split' },
    { value: ' | strip', label: 'Strip' },
    { value: ' | strip_html', label: 'Strip html' },
    { value: ' | strip_newlines', label: 'Strip newlines' },
    { value: ' | times: <value>', label: 'Times' },
    { value: ' | truncate: <value>', label: 'Truncate' },
    { value: ' | truncatewords: <value>', label: 'Truncate words' },
    { value: ' | uniq', label: 'Uniq' },
    { value: ' | upcase', label: 'Upcase' },
    { value: ' | url_decode', label: 'Url decode' },
    { value: ' | url_encode', label: 'Url encode' },
    { value: ' | where: <value>', label: 'Where' },
  ]
};

interface Props {
  webhookTrigger: string;
  onChange: (option: any) => void;
}

const TemplateVariablesSelector = ({
  webhookTrigger,
  onChange,
}: Props) => {
  const options = [
    {
      label: 'Astuto variables',
      options: optionsByWebhookTrigger[webhookTrigger] || [],
    },
    {
      label: 'Liquid tags',
      options: liquidTagsOptions.options,
    },
    {
      label: 'Liquid filters',
      options: liquidFiltersOptions.options,
    },
  ];
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