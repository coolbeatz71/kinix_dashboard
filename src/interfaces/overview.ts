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

interface UserRole {
    ads: number;
    admin: number;
    video: number;
    viewer: number;
    superAdmin: number;
}

interface UserActivity {
    active: number;
    inactive: number;
}
interface UserProvider {
    local: number;
    google: number;
    facebook: number;
}

type UserNotification = UserActivity;

export interface IUserOverview {
    role: UserRole;
    activity: UserActivity;
    provider: UserProvider;
    notification: UserNotification;
}

interface IOverview {
    users: IUserOverview;
    general: IGeneralOverview;
}

export default IOverview;
