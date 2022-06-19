interface Users {
    all: number;
    verified: number;
    unverified: number;
}

interface Articles {
    all: number;
    liked: number;
    commented: number;
}

interface Videos {
    all: number;
    rated: number;
    shared: number;
}

interface Promotions {
    all: number;
    active: number;
    inactive: number;
}

export interface IGeneralOverview {
    users: Users;
    articles: Articles;
    videos: Videos;
    promotions: Promotions;
}

interface IOverview {
    general: IGeneralOverview;
}

export default IOverview;
