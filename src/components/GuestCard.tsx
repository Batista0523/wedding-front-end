import type { Guest } from "../types/guest";

interface Props {
  guest: Guest;
}

const GuestCard = ({ guest }: Props) => {
  return (
    <div
      className="bg-white shadow-sm p-3"
      style={{ borderRadius: 14 }}
    >
      <h6 className="fw-semibold mb-1">{guest.full_name}</h6>

      {guest.has_plus_one && guest.plus_one_name && (
        <p className="mb-1 text-muted" style={{ fontSize: "0.85rem" }}>
          + {guest.plus_one_name}
        </p>
      )}

      <p className="mb-0 text-muted" style={{ fontSize: "0.8rem" }}>
        {guest.attendance === "both"
          ? "Ceremonia y compartir"
          : guest.attendance === "ceremony"
          ? "Solo ceremonia"
          : "Solo compartir"}
      </p>
    </div>
  );
};

export default GuestCard;
