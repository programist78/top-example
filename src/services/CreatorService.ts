import CreatorModel from '../models/CreatorModel';
import { elevateError } from '../utils/elevateError';

class CreatorService {
    private model: typeof CreatorModel = CreatorModel;

    async getCreatorById(creatorId: string) {
        try {
            return await this.model.findById(creatorId);
        } catch (err) {
            elevateError(err);
        }
    }
}

const creatorService = new CreatorService();
export default creatorService;
