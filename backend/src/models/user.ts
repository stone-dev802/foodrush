import { Schema, model } from 'mongoose';

export type User = {
  name: string;
  email: string;
  password: string;
};

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
  },
);

export const UserModel = model<User>('User', userSchema);
