import SFSProfileModel from '../models/SFSProfileModel';
import { ISFSProfile } from '../types';

class SFSProfileService {
    private model: typeof SFSProfileModel = SFSProfileModel;

    async getProfileById(profileId: string): Promise<ISFSProfile> {
        try {
            const profile = await this.model.findOne({ _id: profileId });
            if (!profile) {
                throw Error(`Profile with id ${profileId} not found.`);
            }

            return profile;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

const sFsProfileService = new SFSProfileService();
export default sFsProfileService;
