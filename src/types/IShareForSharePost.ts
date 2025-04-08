import { Document, Types } from 'mongoose';
import { SfsPost as GraphQLSfsPost } from '../../generated/graphql';

export interface IShareForSharePost
    extends Document,
        Omit<GraphQLSfsPost, 'id' | 'profileId'> {
    _id: Types.ObjectId;
    profileId: Types.ObjectId;
}
