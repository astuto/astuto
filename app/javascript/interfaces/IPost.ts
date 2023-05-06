interface IPost {
  id: number;
  title: string;
  description?: string;
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