"use server";

import { supabase } from "@/lib/supabase";

export async function createConfirm(data: any) {
  const form = {
    name: data.nama,
    attendance: data.attendance,
    guests: data.guest,
    phone: data.phone,
    quote: data.quote,
  };
  console.log(form);
  const { error: errorConfirmation } = await supabase
    .from("confirmations")
    .insert(form);

  if (errorConfirmation) return { success: false };

  return { success: true };
}
