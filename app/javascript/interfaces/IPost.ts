interface IPost {
  id: number;
  title: string;
  description?: string;
  boardId: number;
  postStatusId?: number;
  commentsCount: number;
  userId: number;
  createdAt: string;
}

export default IPost;