export enum FIELD_TYPES {
  TEXT = 'TEXT',
  RICH_TEXT = 'RICH_TEXT',
  ONE_OF_MANY = 'ONE_OF_MANY',
  MANY_OF_MANY = 'MANY_OF_MANY',
  FILE = 'FILE',
}

export type Field = {
  name: string;
  id: string;
  type: FIELD_TYPES;
  options?: string[];
}

export type Model = {
  name: string;
  id: string;
  fields: Field[]
}