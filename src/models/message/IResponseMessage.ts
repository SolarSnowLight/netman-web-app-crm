import { empty } from "src/types/empty";

export interface IResponseMessage {
  message: string | empty;
  status: number | empty;
}
