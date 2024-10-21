import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { envs } from "../../config";

export class GithubWebhookMiddleware {
  /**
   * Middleware para validar la firma de los webhooks de GitHub
   * GitHub firma cada webhook con una clave secreta compartida usando HMAC-SHA256
   */
  static verifySignature = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      // Obtener la firma del header enviado por GitHub
      const signature = req.header("x-hub-signature-256");
      if (!signature) {
        res.status(401).json({ error: "No signature found" });
        return;
      }

      // Convertir el body a string para generar el hash
      const payload = JSON.stringify(req.body);

      // Crear un HMAC usando SHA256 y nuestro token secreto
      const hmac = crypto.createHmac("sha256", envs.SECRET_TOKEN);

      // Generar el digest en el mismo formato que GitHub: sha256=<hash>
      const digest = `sha256=${hmac.update(payload).digest("hex")}`;

      // Comparar las firmas de forma segura contra ataques de timing
      const isValid = crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(digest)
      );

      if (!isValid) {
        res.status(401).json({ error: "Invalid signature" });
        return;
      }

      // Si la firma es válida, continuar con el siguiente middleware
      next();
    } catch (error) {
      res.status(500).json({ error: "Error validating signature" });
      return;
    }
  };
}
