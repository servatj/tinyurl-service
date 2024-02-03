import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type URLDocument = HydratedDocument<URL>;

@Schema()
export class URL {
  @Prop({ required: true, unique: true })
  shortenedUrl: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: false })
  userId: string;
}

export const URLSchema = SchemaFactory.createForClass(URL);
URLSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.',
});
