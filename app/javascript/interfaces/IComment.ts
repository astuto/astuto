interface IComment {
  id: number;
  body: string;
  parentId: number;
  isPostUpdate: boolean;
  userFullName: string;
  userEmail: string;
  updatedAt: string;
}

export default IComment;