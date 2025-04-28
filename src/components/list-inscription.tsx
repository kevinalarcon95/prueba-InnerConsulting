import { IInscriptionResponse } from "@/types";


const ListInscriptions = ({inscriptions, inscriptionsFiltered} : {inscriptions: IInscriptionResponse[], inscriptionsFiltered: IInscriptionResponse[]}) => {
    const noResults = inscriptionsFiltered.length === 0 && inscriptions.length > 0;
    
    return (
    <>
      {noResults ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-lg text-gray-600">No se encontraron inscripciones que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-10">
          {inscriptionsFiltered?.map((inscription) => (
            <div
              key={inscription.id}
              className="border-gray-400/80 border bg-white p-4 rounded-lg shadow-md"
            >
              <p>
                <strong>Id:</strong> {inscription.id}
              </p>
              <p>
                <strong>Nombre:</strong> {inscription.data.name}
              </p>
              <p>
                <strong>Fecha de inscripción:</strong> {inscription.data.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListInscriptions;
