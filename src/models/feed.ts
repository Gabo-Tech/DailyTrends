import { Schema, model, Document } from 'mongoose';

interface Price {
  unitPrice: number;
  salePrice?: number;
  currency: string;
}

interface Attribute {
  name: string;
  value: string[];
}

interface FeedDocument extends Document {
  title: string;
  link: string;
  guid: string;
  imageLink: string;
  pubDate: Date;
  description: string;
  categories: string[];
  brand: string;
  inStock: boolean;
  stock: number;
  recommend: boolean;
  tags: string[];
  recommended: string[];
  attributes: Attribute[];
  price: Price;
}

const attributeSchema = new Schema<Attribute>({
  name: { type: String, required: true },
  value: { type: [String], required: true },
});

const priceSchema = new Schema<Price>({
  unitPrice: { type: Number, required: true },
  salePrice: Number,
  currency: { type: String, required: true },
});

const feedSchema = new Schema<FeedDocument>({
  title: { type: String, required: true },
  link: { type: String, required: true },
  guid: { type: String, required: true },
  imageLink: { type: String, required: true },
  pubDate: { type: Date, required: true },
  description: { type: String, required: true },
  categories: { type: [String], required: true },
  brand: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  recommend: { type: Boolean, required: true },
  tags: { type: [String], required: true },
  recommended: { type: [String], required: true },
  attributes: { type: [attributeSchema], required: true },
  price: { type: priceSchema, required: true },
});

export const Feed = model<FeedDocument>('Feed', feedSchema);
