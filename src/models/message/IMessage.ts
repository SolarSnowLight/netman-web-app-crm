export interface IMessage {
  uuid: string | null | undefined;
  data: IMessageItem | null | undefined;
  status: number | null | undefined;
  type: string | null | undefined;
  created_at: Date | null | undefined;
}

export interface IMessageItem {
  message: string | null | undefined;
}
