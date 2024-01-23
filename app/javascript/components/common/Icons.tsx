import * as React from 'react';

import { BsReply } from 'react-icons/bs';
import { FiEdit, FiDelete } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { TbLock, TbLockOpen } from 'react-icons/tb';
import { MdContentCopy, MdDone, MdOutlineArrowBack } from 'react-icons/md';
import { GrTest } from 'react-icons/gr';
import { MdOutlineLibraryBooks } from "react-icons/md";

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