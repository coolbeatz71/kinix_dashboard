import React, { FC } from 'react';
import { List, Skeleton } from 'antd';

const VideoCommentListSkeleton: FC = () => {
    return (
        <List>
            {Array.from(Array(4).keys()).map((i) => (
                <Skeleton className="mb-4" key={i} active avatar paragraph={{ rows: 2 }} />
            ))}
        </List>
    );
};

export default VideoCommentListSkeleton;
