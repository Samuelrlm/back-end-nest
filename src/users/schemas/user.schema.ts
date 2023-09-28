import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum permissionLevel {
  VIEWER = 0,
  EDITOR = 1,
  ADMIN = 2,
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  permissionLevel: permissionLevel;
}

export const UserSchema = SchemaFactory.createForClass(User);
