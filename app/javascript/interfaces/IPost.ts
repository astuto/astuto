interface IPost {
  id: number;
  title: string;
  description?: string;
  boardId: number;
  postStatusId?: number;
  userId: number;
  createdAt: string;
}

export default IPost;