import SFSPostModel from '../models/SFSPostModel';
import creatorService from './CreatorService';
import sFsProfileService from './SFSProfileService';
import oFImagesService from './oFImagesService';
import { toSFSPosts } from '../utils/toSFSPosts';
import { elevateError } from '../utils/elevateError';
import { IShareForSharePost } from '../types/IShareForSharePost';
import { CreateSfsPostInput } from '../generated/graphql';

class SFSPostService {
    private model: typeof SFSPostModel = SFSPostModel;

    async createSFSPost(token: string, input: CreateSfsPostInput) {
        try {
            const profile = (await sFsProfileService.getProfileById(
                input.profileId
            ));

            const creator = (await creatorService.getCreatorById(
                profile.creatorId.toString(),
            ));

            await this.model.updateMany(
                { profileId: input.profileId, isPrimary: true },
                { $set: { isPrimary: false } }
            );

            const files =
                await oFImagesService.uploadTemporarImagesToDefaultFolder(
                    input.files as string[]
                );

            const newPost = (await this.model.create({
                text: input.text,
                files,
                profileId: input.profileId,
                isPrimary: true,
            })) as IShareForSharePost;

            const [post] = await toSFSPosts(creator, profile, [
                newPost,
            ] as IShareForSharePost[]);

            return post;
        } catch (err) {
            elevateError(err);
        }
    }
}

const sFSPostService = new SFSPostService();
export default sFSPostService;
