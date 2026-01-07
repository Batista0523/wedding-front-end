export interface Guest {
  id: string;
  full_name: string;
  status: "pending" | "confirmed" | "declined";
  has_plus_one: boolean;
  plus_one_name?: string | null;
  attendance: "ceremony" | "celebration" | "both";
}
