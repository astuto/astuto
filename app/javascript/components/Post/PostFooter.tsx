import * as React from 'react';
import Gravatar from 'react-gravatar';
import I18n from 'i18n-js';

import { MutedText } from '../common/CustomTexts';
import friendlyDate from '../../helpers/datetime';
import Separator from '../common/Separator';

interface Props {
  createdAt: string;
  handleDeletePost(): void;
  isPowerUser: boolean;
  authorEmail: string;
  authorFullName: string;
  currentUserEmail: string;
}

const PostFooter = ({
  createdAt,
  handleDeletePost,
  isPowerUser,
  authorEmail,
  authorFullName,
  currentUserEmail,
}: Props) => (
  <div className="postFooter">
    <div className="postAuthor">
      <span>{ I18n.t('post.published_by').toLowerCase() } &nbsp;</span>
      <Gravatar email={authorEmail} size={24} className="postAuthorAvatar" /> &nbsp;
      {authorFullName}
    </div>
    {
      isPowerUser || authorEmail === currentUserEmail ?
        <>
        <a onClick={() => confirm(I18n.t('common.confirmation')) && handleDeletePost()}>
          { I18n.t('common.buttons.delete') }
        </a>
        <Separator />
        </>
      :
        null
    }
    <MutedText>{friendlyDate(createdAt)}</MutedText>
  </div>
);

export default PostFooter;