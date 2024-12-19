import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import { MutedText } from '../../common/CustomTexts';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';
import Switch from '../../common/Switch';

interface Props {
  embeddedRoadmapUrl: string;
}

const RoadmapEmbedding: React.FC<Props> = ({ embeddedRoadmapUrl }) => {
  const [showBoardFilter, setShowBoardFilter] = React.useState(true);
  const [showPostStatusFilter, setShowPostStatusFilter] = React.useState(false);
  const [embedCode, setEmbedCode] = React.useState('');

  React.useEffect(() => {
    const code = `
      <iframe
        src="${embeddedRoadmapUrl}?show_board_filter=${showBoardFilter}&show_status_filter=${showPostStatusFilter}"
        width="860"
        height="600"
        seamless
        frameborder="0"></iframe>
    `;
    setEmbedCode(code.replace(/\s+/g, ' ').trim());
  }, [embeddedRoadmapUrl, showBoardFilter, showPostStatusFilter]);

  return (
    <Box>
      <h2>{I18n.t('site_settings.roadmap.title_embed')}</h2>

      <Switch
        label={I18n.t('site_settings.roadmap.show_board_filter')}
        onClick={() => setShowBoardFilter(!showBoardFilter)}
        checked={showBoardFilter}
        htmlId="showBoardFilterCheckbox"
      />

      <Switch
        label={I18n.t('site_settings.roadmap.show_post_status_filter')}
        onClick={() => setShowPostStatusFilter(!showPostStatusFilter)}
        checked={showPostStatusFilter}
        htmlId="showPostStatusFilterCheckbox"
      />

      <textarea
        value={embedCode}
        onChange={event => setEmbedCode(event.target.value)}
        rows={5}
        id="roadmapEmbedCode"
        className="formControl"
      >
      </textarea>

      <MutedText>{I18n.t('site_settings.roadmap.embed_help')}</MutedText>

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