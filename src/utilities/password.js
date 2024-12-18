import { createHmac } from "crypto";
const { APP_SECRET_KEY } = process.env;

export const encrypt = (password) => {
  return createHmac(
    "sha256",
    APP_SECRET_KEY ||
      "3fe640e330ae3800aa4d8c938531d47342179f45de4f12e4666153b645ed3428fcad1ed587c1233b7d25d4eb9b85f8392be621b28be248ec33786384b634c92",
  )
    .update(password)
    .digest("hex");
};
