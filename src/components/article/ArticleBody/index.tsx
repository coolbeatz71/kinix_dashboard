import React, { FC, Fragment } from 'react';
import { isEmpty } from 'lodash';
import { Affix, Col, Grid, Row, Typography } from 'antd';
import { IArticle } from '@interfaces/api';
import ArticleShare from '../ArticleShare';
import ArticleHeader from '../ArticleHeader';
import ArticleAction from '../ArticleAction';
import { ARTICLE_PATH } from '@constants/paths';
import SectionTitle from '@components/common/SectionTitle';
import RelatedArticleCard from '../RelatedArticleCard';
import Tags from '@components/common/Tags';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Paragraph } = Typography;

export interface IArticleBodyProps {
    article: IArticle;
    related: IArticle[];
}

const ArticleBody: FC<IArticleBodyProps> = ({ article, related }) => {
    const { lg, md } = useBreakpoint();

    return (
        <Fragment>
            <Row className={styles.articleBody}>
                <Col xs={3} sm={2} lg={5}>
                    <Affix offsetTop={80}>
                        {/* TODO: should add the link from the client web not the admin one */}
                        <ArticleShare
                            title={article.title}
                            link={`https://www.website.com${ARTICLE_PATH}/${article.slug}`}
                        />
                    </Affix>
                </Col>
                <Col xs={21} sm={22} lg={12} className={styles.articleBody__content}>
                    <ArticleHeader author={String(article.user?.userName)} createdAt={String(article.createdAt)} />
                    <div>
                        <Paragraph data-summary>{article.summary}</Paragraph>
                        <div data-article-body dangerouslySetInnerHTML={{ __html: article.body }} />
                    </div>
                    {lg && <ArticleAction article={article} />}
                    {lg && article.tags && <Tags type="article" tags={article.tags} />}
                </Col>

                {lg && !isEmpty(related) && (
                    <Col sm={24} lg={7}>
                        <Affix offsetTop={80}>
                            <Fragment>
                                <SectionTitle title="Articles similaires" isRelated linkHasMore={ARTICLE_PATH} />
                                {related.map((item) => (
                                    <RelatedArticleCard key={item.id} article={item} />
                                ))}
                            </Fragment>
                        </Affix>
                    </Col>
                )}

                {md && !lg && article.tags && (
                    <Col sm={24} lg={8}>
                        <Tags tags={article.tags} type="article" />
                    </Col>
                )}
            </Row>
        </Fragment>
    );
};

export default ArticleBody;
