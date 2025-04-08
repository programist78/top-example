import { Schema, model, Model } from 'mongoose';
import { ISFSProfile } from '../types';
import { Gender, ProfileFeatures, ProfileNiche } from '../generated/graphql';

const sFSProfileSchema: Schema = new Schema<ISFSProfile>(
    {
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: 'Creator',
            required: true,
            unique: true,
        },
        avatarUrl: String,
        userName: {
            required: true,
            type: String,
        },
        about: {
            type: String,
        },
        modelVisibility: {
            type: Boolean,
            default: true,
        },
        maxDailyShares: {
            type: Number,
            default: 1,
            required: true,
        },
        gender: {
            type: String,
            enum: Object.values(Gender),
            required: true,
            default: Gender.Female,
        },
        followersLimit: {
            type: Number,
        },
        features: [
            {
                type: String,
                enum: Object.values(ProfileFeatures),
            },
        ],
        niche: [
            {
                type: String,
                enum: Object.values(ProfileNiche),
            },
        ],
        lastCcLogin: Date,
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'sfs_profiles',
        toObject: { virtuals: true },
    }
);

sFSProfileSchema.virtual('sFsSocialMedia', {
    ref: 'SocialMedia',
    localField: '_id',
    foreignField: 'profileId',
    justOne: false,
});

sFSProfileSchema.virtual('sFsPaidPromo', {
    ref: 'PaidPromo',
    localField: '_id',
    foreignField: 'profileId',
    justOne: false,
});

const SfSProfileModel = model<ISFSProfile, Model<ISFSProfile>>(
    'SfSProfile',
    sFSProfileSchema
);
export default SfSProfileModel;
