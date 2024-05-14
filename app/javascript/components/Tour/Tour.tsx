import * as React from 'react';

import Joyride from 'react-joyride';

const Tour = () => {
  const steps = [
    {
      target: 'body',
      placement: 'center',
      content: 'Welcome to the tour!',
      disableBeacon: true,
    },
    {
      target: '.boardsNav',
      content: 'This is my awesome feature!',
      disableBeacon: true,
    },
    {
      target: '.postStatusFilterContainer',
      content: 'This another awesome feature!',
      disableBeacon: true,
    },
    {
      target: '.siteSettingsDropdown',
      content: 'This is the last awesome feature!',
      disableBeacon: true,
    }
  ];

  return (
    <Joyride
      steps={steps}
      callback={async (state) => {
        if ((state.action === 'next' || state.action === 'close') && state.step.target === '.postStatusFilterContainer') {
          const dropdownToggler = document.getElementById('navbarDropdown');
          dropdownToggler.click();
        }
      }}
      continuous
      showSkipButton
      showProgress
      disableOverlayClose
      hideCloseButton
      styles={{
        overlay: { height: '100%' },
        options: {
          primaryColor: '#333333',
        },
      }}
    />
  );
};

export default Tour;