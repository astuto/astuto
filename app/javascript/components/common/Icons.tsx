import * as React from 'react';
import I18n from 'i18n-js';

import { BsReply } from 'react-icons/bs';
import { FiEdit, FiDelete } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { TbLock, TbLockOpen } from 'react-icons/tb';
import { MdContentCopy, MdDone, MdOutlineArrowBack } from 'react-icons/md';
import { GrTest, GrClearOption } from 'react-icons/gr';
import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { BiLike, BiSolidLike } from "react-icons/bi";

export const EditIcon = () => <FiEdit />;

export const DeleteIcon = () => <FiDelete />;

export const CancelIcon = () => <ImCancelCircle />;

export const BlockIcon = () => <TbLock />;

export const UnblockIcon = () => <TbLockOpen />;

export const CopyIcon = () => <MdContentCopy />;

export const TestIcon = () => <GrTest />;

export const DoneIcon = () => <MdDone />;

export const BackIcon = () => <MdOutlineArrowBack />;

export const ReplyIcon = () => <BsReply />;

export const LearnMoreIcon = () => <MdOutlineLibraryBooks />;

export const StaffIcon = () => (
  <span title={I18n.t('common.user_staff')} className="staffIcon">
    <MdVerified />
  </span>
);

export const ClearIcon = () => <GrClearOption />;

export const LikeIcon = ({size = 32}) => <BiLike size={size} />;

export const SolidLikeIcon = ({size = 32}) => <BiSolidLike size={size} />;