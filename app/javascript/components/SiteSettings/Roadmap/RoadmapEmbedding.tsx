import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import { MutedText } from '../../common/CustomTexts';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';

interface Props {
  embeddedRoadmapUrl: string;
}

const RoadmapEmbedding: React.FC<Props> = ({ embeddedRoadmapUrl }) => {
  const embedCode = `<iframe src="${embeddedRoadmapUrl}" width="640" height="380" seamless frameborder="0"></iframe>`;

  return (
    <Box>
      <h2>{I18n.t('site_settings.roadmap.title_embed')}</h2>
      <MutedText>{I18n.t('site_settings.roadmap.embed_help')}</MutedText>

      <textarea defaultValue={embedCode} id="roadmapEmbedCode">
      </textarea>

      <div>
        <CopyToClipboardButton
          label={I18n.t('common.buttons.copy_to_clipboard')}
          textToCopy={embedCode}
          copiedLabel={I18n.t('common.copied')}
        />
      </div>
    </Box>
  );
};

export default RoadmapEmbedding;