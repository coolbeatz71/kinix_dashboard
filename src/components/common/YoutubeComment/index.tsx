import React, { FC } from 'react';
import numeral from 'numeral';
import dayjs from 'dayjs';
import { Avatar, List } from 'antd';
import { IItemsEntity } from '@interfaces/youtube/youtubeComment';

import styles from './index.module.scss';

export interface IYoutubeCommentProps {
    videoLink: string;
    data?: IItemsEntity[] | null | undefined;
}

const YoutubeComment: FC<IYoutubeCommentProps> = ({ data, videoLink }) => {
    return (
        <List
            size="large"
            itemLayout="vertical"
            className={styles.youtubeComment}
            dataSource={data as IItemsEntity[]}
            renderItem={(comment) => {
                const replies = comment.snippet.totalReplyCount;
                const replyCount = numeral(comment.snippet.totalReplyCount).format('0.[00]a');
                const publishedAt = dayjs(comment.snippet.topLevelComment.snippet.publishedAt).fromNow();
                const commentText = comment.snippet.topLevelComment.snippet.textOriginal;
                return (
                    <List.Item
                        key={comment.id}
                        actions={
                            replies
                                ? [
                                      <a key="" rel="noreferrer noopener" href={videoLink}>
                                          {replyCount} reponse{replies > 1 ? 's' : ''}
                                      </a>,
                                  ]
                                : undefined
                        }
                    >
                        <List.Item.Meta
                            description={publishedAt}
                            avatar={
                                <Avatar
                                    size="small"
                                    alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
                                    src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                />
                            }
                            title={
                                <a
                                    rel="noreferrer noopener"
                                    href={comment.snippet.topLevelComment.snippet.authorChannelUrl}
                                >
                                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                                </a>
                            }
                        />
                        {commentText}
                    </List.Item>
                );
            }}
        />
    );
};

export default YoutubeComment;
