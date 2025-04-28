import { inscriptionSchema } from "@/components/forms/inscription-schema";
import { z } from "zod";

export type FormDataType = z.infer<typeof inscriptionSchema>;

export interface IInscriptionResponse {
    id: number | string;
    data: FormDataType;
    }