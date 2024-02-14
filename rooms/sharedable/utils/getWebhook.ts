import { WebhookEnum } from "@types";
import { Webhook } from "discord-webhook-node";

export default (url: WebhookEnum) => new Webhook(url);