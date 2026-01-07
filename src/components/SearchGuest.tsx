import { useEffect, useState } from "react";
import { searchGuests } from "../api/guests.api";
import type { Guest } from "../types/guest";

interface Props {
  onSelect: (guest: Guest) => void;
}

const SearchGuest = ({ onSelect }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    searchGuests(query)
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        console.error("SEARCH ERROR:", err);
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="mb-4">
      <input
        className="form-control form-control-lg"
        style={{
          borderRadius: 12,
          borderColor: "rgba(0,0,0,0.1)",
        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escribe tu nombre"
      />

      {results.length > 0 && (
        <ul
          className="list-group mt-2 shadow"
          style={{ borderRadius: 12, overflow: "hidden" }}
        >
          {results.map((guest) => (
            <li
              key={guest.id}
              className="list-group-item list-group-item-action"
              onClick={() => {
                onSelect(guest);
                setQuery(guest.full_name);
                setResults([]);
              }}
              style={{
                cursor: "pointer",
                padding: "0.9rem 1.2rem",
              }}
            >
              {guest.full_name}
            </li>
          ))}
        </ul>
      )}

      {!loading && query.trim() && results.length === 0 && (
        <div
          className="mt-3 text-center text-muted"
          style={{ fontSize: "0.95rem" }}
        >
          Si tu nombre no aparece, es posible que ya hayas confirmado tu
          asistencia o que no estés en la lista.
          <br />
          Para cualquier duda, por favor comunícate con <strong>Elisaul Batista</strong>
          .
        </div>
      )}
    </div>
  );
};

export default SearchGuest;
