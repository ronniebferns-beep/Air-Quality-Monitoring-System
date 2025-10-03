import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyHmac } from "../utils/hmac";

const prisma = new PrismaClient();

export async function ingestTelemetryWebhook(req: Request, res: Response) {
  const { deviceId } = req.params;
  const signature = req.header("X-SIGNATURE") as string;

  const device = await prisma.device.findUnique({ where: { id: deviceId } });
  if (!device) return res.status(404).json({ error: "Device not found" });

  if (!verifyHmac(req.body, device.meta?.secret, signature)) {
    return res.status(401).json({ error: "invalid signature" });
  }

  await prisma.telemetry.create({
    data: {
      deviceId,
      recordedAt: new Date(req.body.timestamp),
      payload: req.body
    }
  });

  res.status(201).send({ ok: true });
}