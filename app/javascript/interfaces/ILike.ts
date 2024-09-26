import ILikeJSON from "./json/ILike";

interface ILike {
  id: number;
  fullName: string;
  email: string;
}

export default ILike;

export const likeJSON2JS = (likeJSON: ILikeJSON): ILike => ({
  id: likeJSON.id,
  fullName: likeJSON.full_name,
  email: likeJSON.email,
});