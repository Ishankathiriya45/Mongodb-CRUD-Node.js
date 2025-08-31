const Crypto = require("node:crypto");
const { Buffer } = require("node:buffer");

const password = process.env["ENCREPTE_PASSWORD_" + process.env.RUN_MODE];
const algorithm = process.env["CRYPTO_ALGORITHM_" + process.env.RUN_MODE];
const key = Crypto.scryptSync(password, "salt", 32);
const iv = Buffer.alloc(16, 0);

module.exports = {
  encryptData: (plainText) => {
    try {
      const cipher = Crypto.createCipheriv(algorithm, key, iv);
      let encrypt = cipher.update(plainText, "utf-8", "hex");
      encrypt += cipher.final("hex");
      const cipherText = iv.toString("hex") + ":" + encrypt;
      console.log({ cipherText });
      return cipherText;
    } catch (error) {
      throw error;
    }
  },

  decryptData: (plainText) => {
    try {
      const textParts = plainText.split(":");
      if (textParts.length !== 2) {
        throw new Error("Invalid ciphertext format");
      }
      const iv = Buffer.from(textParts[0], "hex");
      const encryptedText = Buffer.from(textParts[1], "hex");
      const decipher = Crypto.createDecipheriv(algorithm, key, iv);
      let decrypt = decipher.update(encryptedText, "hex", "utf-8");
      decrypt += decipher.final("utf-8");
      return decrypt;
    } catch (error) {
      throw error;
    }
  },
};
