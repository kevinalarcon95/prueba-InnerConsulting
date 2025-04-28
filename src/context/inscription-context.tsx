"use client";

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getInscriptions as fetchInscriptionsAPI, sendInscription as sendInscriptionAPI } from "@/services/inscription.service";
import { IInscriptionResponse, FormDataType } from "@/types";
import * as localDB from "@/index-db";
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

interface InscriptionContextType {
  inscriptions: IInscriptionResponse[] | null;
  setInscriptions: React.Dispatch<React.SetStateAction<IInscriptionResponse[] | null>>;
  sendInscription: (data: FormDataType) => Promise<void>;
  getInscriptions: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isOffline: boolean;
}

const InscriptionContext = createContext<InscriptionContextType | null>(null);

export const useInscription = () => {
  const context = useContext(InscriptionContext);
  if (!context) {
    throw new Error("useInscription must be used within an InscriptionProvider");
  }
  return context;
}

export const InscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [inscriptions, setInscriptions] = useState<IInscriptionResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isOnline = useOnlineStatus();

  const isFetchingRef = useRef(false);
  const isSyncingRef = useRef(false);

  const syncLocalInscriptions = async () => {
    if (isSyncingRef.current) return;
    
    try {
      isSyncingRef.current = true;
      const localInscriptions = await localDB.getInscriptions();
      const localOnlyInscriptions = localInscriptions.filter(
        (item: IInscriptionResponse) => typeof item.id === 'string' && item.id.startsWith('local_')
      );
      
      if (localOnlyInscriptions.length === 0) return;
      
      for (const inscription of localOnlyInscriptions) {
        try {
          if (!navigator.onLine) break;
          const response = await sendInscriptionAPI(inscription.data);
          await localDB.deleteInscription(inscription.id);
          await localDB.addInscription(response);
          console.log(`Inscripción sincronizada correctamente: ${inscription.id} -> ${response.id}`);
        } catch (error) {
          console.error(`Error al sincronizar inscripción ${inscription.id}:`, error);
        }
      }
      
      if (!navigator.onLine) return;
      await getInscriptions();
    } catch (error) {
      console.error("Error al sincronizar inscripciones locales:", error);
    } finally {
      isSyncingRef.current = false;
    }
  };

  const getInscriptions = async () => {
    if (isFetchingRef.current) return;
    
    try {
      isFetchingRef.current = true;
      setIsLoading(true);

      const inscriptionsFromDB = await localDB.getInscriptions();
      if (inscriptionsFromDB.length > 0) {
        setInscriptions(inscriptionsFromDB);
      }

      if (isOnline) {
        const inscriptionsFromAPI = await fetchInscriptionsAPI();
        const apiIds = new Set(inscriptionsFromAPI.map((item: IInscriptionResponse) => item.id));
        const localOnlyInscriptions = inscriptionsFromDB.filter(
          (item: IInscriptionResponse) => !apiIds.has(item.id) && typeof item.id === 'string'
        );
        
        const combinedInscriptions = [...inscriptionsFromAPI, ...localOnlyInscriptions];
        setInscriptions(combinedInscriptions);
        await localDB.clearInscriptions();
        await localDB.addInscriptions(combinedInscriptions);
      }
    } catch (error) {
      console.error(error);
      setError("Error al obtener las inscripciones");
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    if (isOnline) {
      syncLocalInscriptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  const sendInscription = async (data: FormDataType) => {
    try {
      let inscriptionData: IInscriptionResponse;
      
      if (isOnline) {
        const response = await sendInscriptionAPI(data);
        inscriptionData = response;
      } else {
        inscriptionData = {
          id: `local_${Date.now()}`,
          data
        };
      }

      await localDB.addInscription(inscriptionData);
      await getInscriptions();
    } catch (error) {
      console.error(error);
      setError("Error al enviar la inscripción");
    }
  };

  useEffect(() => {
    getInscriptions();

    if (isOnline) {
      syncLocalInscriptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: InscriptionContextType = {
    inscriptions,
    setInscriptions,
    sendInscription,
    getInscriptions,
    isLoading,
    error,
    isOffline: !isOnline,
  };

  return (
    <InscriptionContext.Provider value={value}>
      {children}
    </InscriptionContext.Provider>
  );
};

export default InscriptionContext;
