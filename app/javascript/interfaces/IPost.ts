// Approval status
export const POST_APPROVAL_STATUS_APPROVED = 'approved';
export const POST_APPROVAL_STATUS_PENDING = 'pending';
export const POST_APPROVAL_STATUS_REJECTED = 'rejected';

export type PostApprovalStatus =
  typeof POST_APPROVAL_STATUS_APPROVED |
  typeof POST_APPROVAL_STATUS_PENDING |
  typeof POST_APPROVAL_STATUS_REJECTED;

interface IPost {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  approvalStatus: PostApprovalStatus;
  boardId: number;
  postStatusId?: number;
  likeCount: number;
  liked: number;
  commentsCount: number;
  hotness: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  createdAt: string;
}

export default IPost;