import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class BlackList {
  @Prop()
  token: string;
}

export const BlackListSchema = SchemaFactory.createForClass(BlackList);
