interface IPost {
  id: number;
  title: string;
  description?: string;
  boardId: number;
  postStatusId?: number;
  likesCount: number;
  liked: number;
  commentsCount: number;
  hotness: number;
  userId: number;
  createdAt: string;
}

export default IPost;