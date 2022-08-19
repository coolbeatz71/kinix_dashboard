import { ILike } from '@interfaces/api';

const isMyLike = (likes: ILike[], userId: number | undefined): boolean => {
    return likes.some((like) => like.userId === userId);
};

export default isMyLike;
