import { ReactNode } from "react";

import { InscriptionProvider } from "@/context/inscription-context";
import UILayout from "../ui-layout";

/**
 *  * AppProvider - Provider de la aplicación
 * @param param0 - children: ReactNode - Componente hijo
 * @returns  - AppProvider: JSX.Element - Componente AppProvider
 */
const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full">
    <InscriptionProvider>
      <UILayout>{children}</UILayout>
    </InscriptionProvider>
    </div>
  );
};

export default AppProvider;
