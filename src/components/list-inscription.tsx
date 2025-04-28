import { useState } from "react";
import { IInscriptionResponse } from "@/types";

const ListInscriptions = ({
  inscriptions,
  inscriptionsFiltered,
}: {
  inscriptions: IInscriptionResponse[];
  inscriptionsFiltered: IInscriptionResponse[];
}) => {
  const [expandedCardId, setExpandedCardId] = useState<number | string | null>(
    null
  );
  const noResults =
    inscriptionsFiltered.length === 0 && inscriptions.length > 0;

  const toggleExpand = (id: number | string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <>
      {noResults ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-lg text-gray-600">
            No se encontraron inscripciones que coincidan con tu búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-10 items-start">
          {inscriptionsFiltered?.map((inscription) => {
            const isExpanded = expandedCardId === inscription.id;
            return (
              <div
                key={inscription.id}
                className="border-gray-400/80 border bg-white p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out"
              >
                <p>
                  <strong># Radicado:</strong> {inscription.id}
                </p>
                <p>
                  <strong>Nombre:</strong> {inscription.data.name}
                </p>
                <p>
                  <strong>Correo:</strong> {inscription.data.email}
                </p>
                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <h2 className="text-lg font-bold mb-2">Detalle completo:</h2>
                    <p>
                      <strong>Fecha de inscripción:</strong>{" "}
                      {inscription.data.date}
                    </p>
                    <p>
                      <strong>Semestre:</strong> {inscription.data.semester}
                    </p>
                    <p>
                      <strong>¿Viene acompañado?:</strong>{" "}
                      {inscription.data.person ? "Sí" : "No"}
                    </p>
                    {inscription.data.person && (
                      <p>
                        <strong>Nombre acompañante:</strong>{" "}
                        {inscription.data.personName}
                      </p>
                    )}
                    <p>
                      <strong>Términos aceptados:</strong>{" "}
                      {inscription.data.termsAndConditions ? "Sí" : "No"}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => toggleExpand(inscription.id)}
                  className="mt-3 text-amber-700 hover:text-amber-800 text-sm cursor-pointer hover:underline"
                >
                  {isExpanded ? "Ver menos" : "Ver más"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ListInscriptions;
