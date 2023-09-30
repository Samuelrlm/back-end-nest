import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class SessionUser {
  @Prop()
  userId: string;
  @Prop()
  token: string;
}

export const SessionUserSchema = SchemaFactory.createForClass(SessionUser);
