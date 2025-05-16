import mongoose, { Document, Schema, Model } from "mongoose";

const tokenSchema: Schema<IToken> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    collection: 'tokens',
    timestamps: true
});


const Token: Model<IToken> = mongoose.model<IToken>('Token', tokenSchema);
export default Token;

export interface IToken extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    createdAt?: Date;
    updatedAt?: Date;
}
