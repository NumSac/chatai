import fs from "fs";

export const readCreds = (): any => {
  try {
    const privateKey = fs.readFileSync(
      process.env.PRIVATE_KEY_PATH || "key.pem",
      "utf8"
    );
    const certificate = fs.readFileSync(
      process.env.CERTIFICATE_PATH || "cert.pem",
      "utf8"
    );

    return { key: privateKey, cert: certificate };
  } catch (error) {
    console.error("Failed to load credentials:", error);
    return null;
  }
};
