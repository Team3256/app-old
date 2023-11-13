import { totp } from "otplib";
import short from "short-uuid";

import { QRCODE_SECRET, TOTP_SECRET } from "../constants";
import { hash, sign } from "../hmac";
import rng from "../lehmer_prng";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const attendanceRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return "you can see this secret message!";
  }),
  getAttendanceQRURL: publicProcedure.query(() => {
    const pin = totp.generate(TOTP_SECRET);
    const nonce = short.generate();
    const hostedDate = new Date().toISOString().slice(0, 10);
    const payload = {
      hostedDate: hostedDate,
      pin: pin,
      nonce: rng(parseInt(pin) + parseInt(hostedDate.replace(/-/g, ``))).next(),
    };
    return `https://team3256-placeholder-url.com/attendance/checkin?payload=${btoa(
      JSON.stringify(payload),
    )}&signature=${hash(sign(QRCODE_SECRET, JSON.stringify(payload)))}`;
  }),
});
