import { Schema, model, Model } from 'mongoose';
import { IShareForSharePost } from '../types/IShareForSharePost';

const sFSPostSchema: Schema = new Schema<IShareForSharePost>(
    {
        text: {
            type: String,
            required: true,
        },
        files: [
            {
                type: String,
                required: true,
            },
        ],
        profileId: {
            type: Schema.Types.ObjectId,
            ref: 'SfSProfile',
            required: true,
        },
        isPrimary: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'share_for_share',
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

sFSPostSchema.virtual('settings', {
    ref: 'SFSSettings',
    localField: 'profileId',
    foreignField: 'profileId',
    justOne: true,
});

const SFSPostModel = model<IShareForSharePost, Model<IShareForSharePost>>(
    'ShareForShare',
    sFSPostSchema
);
export default SFSPostModel;
