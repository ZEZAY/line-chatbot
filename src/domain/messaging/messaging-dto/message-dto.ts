import { Static, Type } from '@sinclair/typebox';

export const TextMessageSchema = Type.Object({
  type: Type.String(),
  text: Type.String(),
});

export const StickerMessageSchema = Type.Object({
  type: Type.String(),
  packageId: Type.Number(),
  stickerId: Type.Number(),
});

// export type ImageMessage = {
//   type: 'image';
//   originalContentUrl: string;
//   previewImageUrl: string;
// };

// export type AudioMessage = {
//   type: 'audio';
//   originalContentUrl: string;
// };

// export type VideoMessage = {
//   type: 'video';
//   originalContentUrl: string;
//   previewImageUrl: string;
// };

// export type FlexMessage = {
//   type: 'flex';
//   altText: string;
//   contents: CarouselMessage | BubbleMessage;
// };

// export type TemplateMessage = {
//   type: 'template';
//   altText: string;
//   template: any;
// };

// export type ButtonMessage = {
//   type: 'button';
//   action: {
//     type: 'postback' | 'uri';
//     label: string;
//     uri?: string;
//     displayText?: string;
//   };
// };

// export type BoxMessage = {
//   type: 'box';
//   contents: Array<TextMessage | BoxMessage | ButtonMessage>;
// };

// export type BubbleMessage = {
//   type: 'bubble';
//   size: string;
//   styles: object;
//   hero: {
//     type: 'image';
//     url: string;
//   };
//   body: BoxMessage;
//   footer: BoxMessage;
// };

// export type CarouselMessage = {
//   type: 'carousel';
//   contents: Array<BubbleMessage>;
// };

export type Message = TextMessage | StickerMessage;
// | ImageMessage
// | AudioMessage
// | VideoMessage
// | FlexMessage
// | TemplateMessage
// | FlexMessage;

export type TextMessage = Static<typeof TextMessageSchema>;
export type StickerMessage = Static<typeof StickerMessageSchema>;
