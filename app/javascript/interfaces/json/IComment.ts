interface ICommentJSON {
  id: number;
  body: string;
  parent_id: number;
  is_post_update: boolean;
  user_full_name: string;
  user_email: string;
  user_role: number;
  created_at: string;
  updated_at: string;
}

export default ICommentJSON;