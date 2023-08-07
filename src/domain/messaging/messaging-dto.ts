// TODO: check error
export type ErrorResponse = {
  message: string;
  details: ErrorDetail[];
};

type ErrorDetail = {
  message: string;
  property: string;
};

export type BroadcastPayload = {
  messages: Message[];
  notificationDisabled?: boolean;
};

export type ReplyPayload = {
  replyToken: string;
  messages: Message[];
  notificationDisabled?: boolean;
};

export type PushMessagePayload = {
  to: string;
  messages: Message[];
  notificationDisabled?: boolean;
};

export type Message =
  | TextMessage
  | StickerMessage
  | ImageMessage
  | AudioMessage
  | VideoMessage
  | FlexMessage
  | TemplateMessage
  | FlexMessage;

export type TextMessage = {
  type: 'text';
  text: string;
};

export type StickerMessage = {
  type: 'sticker';
  packageId: number;
  stickerId: number;
};

export type ImageMessage = {
  type: 'image';
  originalContentUrl: string;
  previewImageUrl: string;
};

export type AudioMessage = {
  type: 'audio';
  originalContentUrl: string;
};

export type VideoMessage = {
  type: 'video';
  originalContentUrl: string;
  previewImageUrl: string;
};

export type FlexMessage = {
  type: 'flex';
  altText: string;
  contents: CarouselMessage | BubbleMessage;
};

export type TemplateMessage = {
  type: 'template';
  altText: string;
  template: any;
};

export type ButtonMessage = {
  type: 'button';
  action: {
    type: 'postback' | 'uri';
    label: string;
    uri?: string;
    displayText?: string;
  };
};

export type BoxMessage = {
  type: 'box';
  contents: Array<TextMessage | BoxMessage | ButtonMessage>;
};

export type BubbleMessage = {
  type: 'bubble';
  size: string;
  styles: object;
  hero: {
    type: 'image';
    url: string;
  };
  body: BoxMessage;
  footer: BoxMessage;
};

export type CarouselMessage = {
  type: 'carousel';
  contents: Array<BubbleMessage>;
};
