import { inscriptionSchema } from "@/components/forms/inscription-schema";
import { z } from "zod";

export type IFormData = z.infer<typeof inscriptionSchema>;