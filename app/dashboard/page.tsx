import { supabase } from "@/lib/supabase";
import DashboardPageClient from "./_components/dashboard-page";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { data, error } = await supabase.from("confirmations").select("*");

  if (error) redirect("/");

  const totalData = data ?? [];

  const hadirRows = totalData.filter((r) => r.attendance === "hadir");
  const tidakHadirRows = totalData.filter(
    (r) => r.attendance === "tidak hadir",
  );
  const mungkinHadirRows = totalData.filter(
    (r) => r.attendance === "mungkin hadir",
  );

  const totalGuests = totalData.reduce((sum, r) => sum + (r.guests || 0), 0);
  const hadirGuests = hadirRows.reduce((sum, r) => sum + (r.guests || 0), 0);
  const mungkinHadirGuests = mungkinHadirRows.reduce(
    (sum, r) => sum + (r.guests || 0),
    0,
  );
  const tidakHadirGuests = tidakHadirRows.reduce(
    (sum, r) => sum + (r.guests || 0),
    0,
  );

  const all = {
    totalData,
    totalRSVP: totalData.length,
    totalHadir: hadirGuests,
    totalMungkinHadir: mungkinHadirGuests,
    totalTidakHadir: tidakHadirGuests,
    totalGuests,
  };

  return <DashboardPageClient data={all} />;
}
