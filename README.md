## Introduction

This repository contains my submission for the ElementPay Frontend Assessment. A DApp that allows users connect their crypto wallet, create order and poll order status, using Server-Sent Events(SSE) and webhooks notification to subscribe and publish order status update in real-time, maintaining Idempotency [`View Demo`](https://elementpay-assessment-ashen.vercel.app/)

This is a [Next.js](https://nextjs.org) App Router project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, clone this repository to your system, cd to the project root directory and install dependencies:

```bash

yarn install

```

Create a `.env.local` file in the root directory and replace the values specified in the `env.local.example` file of this project.

You can create a wallet connect project Name and project ID at [Wallet Connect](cloud.walletconnect.com)

Start the application with

```bash

yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deliverables

- Connect and disconnect a wallet (supports at least two wallet types, e.g., MetaMask and WalletConnect).
- Create an order using a simple form. The form is hidden until a wallet is connected.
- Poll order status, using Server-Sent Events(SSE) and webhooks notification to subscribe and publish order status update in real-time, maintaining Idempotency while updating the UI state machine.

## Tech Stack

- Next.js 14+ (App/API Router) with TypeScript.
- Node.js
- Wallet library (wagmi/viem, WalletConnect, RainbowKit).

## Brief notes.

This application uses Server-Sent Events (SSE) and webhooks notification for real-time webhook updates, polling (for backup) and client timeout.

With this, we are able to:

- subscribe to webhook notifications, trigger SSE immediately and update UI instantly.

- If webhook never arrives, polling eventually finds final state.

- If neither arrives in 60s, there is a manual retry mechanism.

## Project Structure Explained

```bash
├── src
│   ├── app (Next.js App router)
│   ├── components (reusable components, buttons, form inputs etc)
│   ├── constants (constant variables definition)
│   ├── hooks (custom reausable hooks)
│   │── libs (third party library configs)
|   ├── services (http network request services)
|   ├── types (types definitions)
|   ├── utils (utility helper functions)
|   ├── db (in-memory db store)

```

## End-points documentation

```bash
Create a new order
POST: /api/mock/orders/create

Get a single order
GET: /api/mock/orders/:order_id

Subscribe to an order event
GET: /api/mock/orders/:order_id/subscribe

Poll an order
GET: /api/mock/orders/:order_id/poll

Webhook notification
POST: /api/webhooks/elementpay

Webhooks curl request samples

# Valid
curl -X POST http://localhost:3000/api/webhooks/elementpay \
-H 'Content-Type: application/json' \
-H 'X-Webhook-Signature: t=1710000000,v1=3QXTcQv0m0h4QkQ0L0w9ZsH1YFhZgMGnF0d9Xz4P7nQ=' \
-d '{"type":"order.settled","data":{"order_id":"ord_0xabc123","status":"settled"}}'

# Invalid signature
curl -X POST http://localhost:3000/api/webhooks/elementpay \
-H 'Content-Type: application/json' \
-H 'X-Webhook-Signature: t=1710000300,v1=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=' \
-d '{"type":"order.failed","data":{"order_id":"ord_0xabc123","status":"failed"}}'

```

##
