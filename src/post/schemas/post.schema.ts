import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  createdBy: string; // Use string type for createdBy

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: {  coordinates: [Number] } })
  geoLocation: {  coordinates: [number, number] };
}

export const PostSchema = SchemaFactory.createForClass(Post);
