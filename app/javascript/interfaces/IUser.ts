interface IUser {
  id: number;
  email: string;
  fullName: string;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'blocked' | 'deleted';
}

export default IUser;