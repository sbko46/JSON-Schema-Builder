export type FieldType = | "" | "string" | "number" | "float" | "boolean" | "objectId" | "array" | "nested";
export interface SchemaField {
  id: string;
  name: string;
  type: FieldType;
  children?: SchemaField[];
}

export interface SchemaData {
  fields: SchemaField[];
}
