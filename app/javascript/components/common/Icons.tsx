import * as React from 'react';
import I18n from 'i18n-js';

import { BsReply } from 'react-icons/bs';
import { FiEdit, FiDelete, FiSettings } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { TbLock, TbLockOpen } from 'react-icons/tb';
import { GrTest, GrClearOption } from 'react-icons/gr';
import { BiLike, BiSolidLike } from "react-icons/bi";
import {
  MdContentCopy,
  MdDone,
  MdOutlineArrowBack,
  MdOutlineLibraryBooks,
  MdVerified,
  MdCheck,
  MdClear,
  MdAdd,
} from 'react-icons/md';
import { FaUserNinja } from "react-icons/fa";

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

export const SettingsIcon = () => <FiSettings />;

export const AnonymousIcon = ({size = 32, title=I18n.t('defaults.user_full_name')}) => <FaUserNinja size={size} title={title} />;

export const ApproveIcon = () => <MdCheck />;

export const RejectIcon = () => <MdClear />;

export const AddIcon = () => <MdAdd />;