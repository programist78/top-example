import { Document, Types } from 'mongoose';
import { SfsProfile as GraphQLSfsProfile } from '../generated/graphql';

export interface ISFSProfile
    extends Document,
        Omit<GraphQLSfsProfile, 'id' | 'creatorId' | 'createdAt'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
}
