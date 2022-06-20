interface IPostJSON {
  id: number;
  title: string;
  description?: string;
  board_id: number;
  post_status_id?: number;
  likes_count: number;
  liked: number;
  comments_count: number;
  hotness: number;
  user_id: number;
  user_email: string;
  user_full_name: string;
  created_at: string;
}

export default IPostJSON;