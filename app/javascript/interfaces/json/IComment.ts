interface ICommentJSON {
  id: number;
  body: string;
  parent_id: number;
  user_full_name: string;
  user_email: string;
  updated_at: string;
}

export default ICommentJSON;