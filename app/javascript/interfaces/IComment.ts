interface IComment {
  id: number;
  body: string;
  parentId: number;
  userFullName: string;
  userEmail: string;
  updatedAt: string;
}

export default IComment;