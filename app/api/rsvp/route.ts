// app/api/rsvps/route.ts
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("confirmations").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

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

  return Response.json({
    totalData,
    totalRSVP: totalData.length,
    totalHadir: hadirGuests,
    totalMungkinHadir: mungkinHadirGuests,
    totalTidakHadir: tidakHadirGuests,
    totalGuests,
  });
}
