interface IPost {
  id: number;
  title: string;
  description?: string;
  board_id: number;
  post_status_id?: number;
  user_id: number;
  created_at: string;

  // associations
  postStatus?: any;
}

export default IPost;