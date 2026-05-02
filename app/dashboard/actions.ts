// "use server";

// import { supabase } from "@/lib/supabase";

// export async function getRSVPs() {
//   const { data, error } = await supabase
//     .from("confirmations")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) console.log(error.message);

//   const { data: totalHadir, error: errorHadir } = await supabase
//     .from("confirmations")
//     .select("guests")
//     .eq("attendance", "hadir");

//   if (errorHadir) console.log(errorHadir.message);

//   console.log(totalHadir);

//   return data ?? [];
// }
