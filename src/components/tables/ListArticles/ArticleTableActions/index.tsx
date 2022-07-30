import { IArticle } from '@interfaces/api';
import React, { FC } from 'react';

export interface IArticleTableActionsProps {
    record: IArticle;
    reload: () => void;
}

const ArticleTableActions: FC<IArticleTableActionsProps> = () => {
    return <div></div>;
};

export default ArticleTableActions;
