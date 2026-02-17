import { getSalons } from "@/features/salons/services/salonService";
import SalonList from "@/features/salons/components/SalonList";

export default async function SalonsPage() {
  const salons = await getSalons();

  return (
    <div style={{ padding: "40px" }}>
      <h1>All Salons</h1>
      <SalonList salons={salons} />
    </div>
  );
}
