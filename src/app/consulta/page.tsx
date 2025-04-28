"use client";
import React, { useEffect, useState } from "react";

import ListInscriptionFilters from "@/components/list-inscription-filters";
import ListInscriptions from "@/components/list-inscription";
import { IInscriptionResponse } from "@/types";
import Loader from "@/components/loader";
import { useInscription } from "@/context/inscription-context";

const ConsultPage = () => {
  const { inscriptions, isLoading, isOffline } = useInscription();
  const [inscriptionsFiltered, setInscriptionsFiltered] = useState<
    IInscriptionResponse[]
  >([]);

  useEffect(() => {
    if (inscriptions) {
      setInscriptionsFiltered(inscriptions);
    }
  }, [inscriptions]);

  return (
    <div className="flex flex-col gap-4 mx-8 lg:mx-40">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col mt-5 mb-3 lg:my-5">
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">
              Consulta de inscripciones
            </h1>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <p className="opacity-85 lg:text-left lg:mr-4">
                  Aquí puedes consultar las inscripciones realizadas.
                </p>
              <ListInscriptionFilters
                inscriptions={inscriptions || []}
                setInscriptionsFiltered={setInscriptionsFiltered}
              />
            </div>
          </div>

          {isOffline && (
            <div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-8"
              role="alert"
            >
              <strong className="font-bold">Modo sin conexión: </strong>
              <span className="block sm:inline">
                Algunas funciones pueden no estar disponibles.
              </span>
            </div>
          )}
          <ListInscriptions
            inscriptions={inscriptions || []}
            inscriptionsFiltered={inscriptionsFiltered}
          />
        </>
      )}
    </div>
  );
};

export default ConsultPage;
