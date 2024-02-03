import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type URLDocument = HydratedDocument<URL>;

@Schema()
export class URL {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortenedUrl: string;

  @Prop({ required: true })
  userId: string;
}

export const URLSchema = SchemaFactory.createForClass(URL);
