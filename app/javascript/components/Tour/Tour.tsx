import * as React from 'react';

import Joyride from 'react-joyride';

interface Props {
  userFullName: string;
}

const BOOTSTRAP_BREAKPOINT_SM = 768;

const Tour = ({ userFullName }: Props) => {
  const boardsToggler = document.querySelector('button.navbarToggler') as HTMLElement;
  const profileToggler = document.getElementById('navbarDropdown');
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
      content: 'Click "Site settings" to customize your feedback space. You can add custom boards and statuses, configure various settings, personalize appearance, and more.',
      disableBeacon: true,
    },
    {
      target: '.moderationDropdown',
      title: 'Moderation',
      content: 'Click "Moderation" to approve or reject submitted feedback and to manage users.',
      disableBeacon: true,
    },
    {
      target: '.tourDropdown',
      title: 'That\'s all!',
      content: 'We hope Astuto will help you understand your customers and make better decisions! You can always replay this tour from here.',
      disableBeacon: true,
    },
  ];

  const openBoardsNav = () => {
    if (boardsToggler.getAttribute('aria-expanded') === 'false') {
      boardsToggler.click();
    }
  };

  const closeBoardsNav = () => {
    if (boardsToggler.getAttribute('aria-expanded') === 'true') {
      boardsToggler.click();
    }
  };

  const openProfileNav = () => {
    if (profileToggler.getAttribute('aria-expanded') === 'false') {
      profileToggler.click();
    }
  };

  const closeProfileNav = () => {
    if (profileToggler.getAttribute('aria-expanded') === 'true') {
      profileToggler.click();
    }
  }

  return (
    <Joyride
      steps={steps}
      callback={state => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

        // Open boards navbar (only on mobile)
        if (
          vw < BOOTSTRAP_BREAKPOINT_SM &&
          state.type === 'step:after' &&
          (((state.action === 'next' || state.action === 'close') && state.step.target === 'body') ||
          (state.action === 'prev' && state.step.target === '.postListItem'))
        ) {
          openBoardsNav();
        }

        // Close boards navbar (only on mobile)
        if (
          vw < BOOTSTRAP_BREAKPOINT_SM &&
          state.type === 'step:after' &&
          (//(state.action === 'next' && state.step.target === '.boardsNav') || // This causes positioniting problems for Joyride tour
          (state.action === 'prev' && state.step.target === '.boardsNav'))
        ) {
          closeBoardsNav();
        }

        // Open profile navbar
        if (
          state.type === 'step:after' &&
          (((state.action === 'next' || state.action === 'close') && (state.step.target === '.sidebarFilters' || state.step.target === '.siteSettingsDropdown' || state.step.target === '.moderationDropdown')) ||
          (state.action === 'prev' && (state.step.target === '.moderationDropdown' || state.step.target === '.tourDropdown')))
        ) {
          if (vw < BOOTSTRAP_BREAKPOINT_SM) openBoardsNav();

          openProfileNav();
        }

        // Close everything on reset
        if (state.action === 'reset') {
          closeBoardsNav();
          closeProfileNav();
        }
      }}
      continuous
      showSkipButton
      disableScrolling
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