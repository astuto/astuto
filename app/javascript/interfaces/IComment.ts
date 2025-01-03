interface IComment {
  id: number;
  body: string;
  parentId: number;
  isPostUpdate: boolean;
  userFullName: string;
  userEmail: string;
  userAvatar?: string;
  userRole: number;
  createdAt: string;
  updatedAt: string;
}

export default IComment;