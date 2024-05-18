import * as React from 'react';

import Joyride from 'react-joyride';

interface Props {
  userFullName: string;
}

const Tour = ({ userFullName }: Props) => {
  const userFirstName = userFullName ? userFullName.split(' ')[0].trim() : '';

  const steps = [
    {
      target: 'body',
      placement: 'center',
      title: (userFirstName ? `${userFirstName}, w` : 'W') + 'elcome to your new feedback space!',
      content: 'Learn how to use and customize your feedback space with a 30-second tour.',
      disableBeacon: true,
    },
    {
      target: '.boardsNav',
      title: 'Boards',
      content: 'From the top navigation bar, you can access your roadmap and boards.',
      disableBeacon: true,
    },
    {
      target: '.postListItem',
      title: 'Feedback',
      content: 'Each board contains feedback posted by your customers.',
      disableBeacon: true,
    },
    {
      target: '.sidebarFilters',
      placement: 'right-start',
      title: 'Filters',
      content: 'On the left sidebar, filters help you sort out and make sense of all received feedback.',
      disableBeacon: true,
    },
    {
      target: '.siteSettingsDropdown',
      title: 'Site settings',
      content: 'Click "Site settings" to customize your feedback space. You can add custom boards and statuses, manage users, personalize appearance, and more.',
      disableBeacon: true,
    },
    {
      target: '.tourDropdown',
      title: 'That\'s all!',
      content: 'We hope Astuto will help you understand your customers and make better decisions! You can always replay this tour from here.',
      disableBeacon: true,
    },
  ];

  return (
    <Joyride
      steps={steps}
      callback={async (state) => {
        if (
          state.type === 'step:after' &&
          (state.step.target === '.sidebarFilters' || state.step.target === '.siteSettingsDropdown' || state.step.target === '.tourDropdown')
        ) {
          const dropdownToggler = document.getElementById('navbarDropdown');
          if (dropdownToggler.getAttribute('aria-expanded') === 'false') {
            dropdownToggler.click();
          }
        }
      }}
      continuous
      showSkipButton
      disableScrolling
      disableOverlayClose
      hideCloseButton
      spotlightClicks={false}
      locale={{
        last: 'Finish',
      }}
      styles={{
        overlay: { height: '200%' },
        options: {
          primaryColor: '#333333',
        },
      }}
    />
  );
};

export default Tour;