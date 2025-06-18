export interface UserProps {
  name: string;
  surname: string;
  age: number;
  profession?: string | undefined;
}

export interface UserExtraProps {
  name: string;
  id: number;
  uuid?: string;
  surname?: string;
  age: number;
  profession?: string | null;
  description?: string | null;
  isKnown?: boolean;
  createdAt?: Date;
}
