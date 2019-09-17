interface IComment {
  id: number;
  body: string;
  parentId: number;
  userFullName: string;
  updatedAt: string;
}

export default IComment;