import { IInscriptionResponse } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

  const ListInscriptionFilters = ({
    inscriptions,
    setInscriptionsFiltered,
  }: {
    inscriptions: IInscriptionResponse[];
    setInscriptionsFiltered: Dispatch<SetStateAction<IInscriptionResponse[]>>;
  }) => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setInscriptionsFiltered(
      value.trim() === ""
        ? inscriptions
        : inscriptions.filter((inscription) =>
            inscription.data.name.toLowerCase().includes(value)
          )
    );
  };

  const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setInscriptionsFiltered(
      value === "asc" ? inscriptions.slice().reverse() : inscriptions
    );
  };

  return (
    <div className="flex gap-5">
      <input
        className="bg-white border-1 border-gray-500/80 rounded-lg w-full lg:min-w-90 p-2"
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => handleSearch(e)}
      />

      <select
        name="order"
        id="order"
        className="bg-white border-1 border-gray-500/80 rounded-lg p-2"
        onChange={(e) => handleOrder(e)}
      >
        <option value="desc">Más antiguos</option>
        <option value="asc">Más recientes</option>
      </select>
    </div>
  );
};

export default ListInscriptionFilters;
