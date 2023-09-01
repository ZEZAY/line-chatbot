# line-chatbot

![demo](./README_assets/demo.gif)

## Features

APIs:

- Message via LINE Massaging APIs
- Webhook LINE chat messages from channel (user-bot)

Extra:

- channel access-token repository (db connector)

## Setup

1. Run MongoDB, then config `.env` file
2. Add a line-chatbot channel to the database
   1. Go to [LINE Developers](https://developers.line.biz/console/), create a Provider
   2. Inside the provider, add a new channel (set to Messaging API type)
   3. Collect all `channel_id` and `channel_access_token`
   4. use code in `src/domain/access-token` to add the access token to database
3. Run project (APIs)
4. Config [APIs Webhook URL](https://manager.line.biz/account/:id/setting/messaging-api) with endpoint `/webhook/:channel_id`

## ref

- [LINE Massaging APIs](https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects)