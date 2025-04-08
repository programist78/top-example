import { ofStatSender } from '../../rabbitMQ';
import { ICreator, ISFSProfile, IShareForSharePost } from '../../types';

export const toSFSPosts = async (
    creator: ICreator,
    profile: ISFSProfile,
    posts: IShareForSharePost[]
): Promise<IShareForSharePost[]> => {
    const creatorAuth = await ofStatSender.getCreatorAuthByCreatorIdWithCheck(
        creator.id
    );
    const sFsData = await ofStatSender.getSfsCreatorData(creatorAuth.user_id);

    // eslint-disable-next-line require-await
    const postsPromise = posts.map(async (post) => {
        return {
            ...post.toObject(),
            profile: {
                ...profile.toObject(),
            },
            meInfo: {
                linkOF: creator.link,
                verificationExpiredAtOF: creatorAuth.expiredAt,
            },
            accountType: sFsData?.accountType,
            ofRanking: sFsData?.ofRanking,
            activeFans: sFsData?.activeFans,
        };
    });

    return await Promise.all(postsPromise);
};
