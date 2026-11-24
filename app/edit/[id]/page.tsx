import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function ubahTruk(formData: FormData) {
  "use server";
  await prisma.truk.update({
    where: { id: Number(formData.get("id")) },
    data: {
      platNomor: String(formData.get("platNomor")),
      jenis: String(formData.get("jenis")),
      kapasitas: Number(formData.get("kapasitas")),
      status: String(formData.get("status")),
    },
  });
  revalidatePath("/");
  redirect("/");
}

export default async function EditTruk({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const truk = await prisma.truk.findUnique({ where: { id: Number(id) } });

  if (!truk) return <p>Data tidak ditemukan.</p>;

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Edit Truk</h1>
      <form action={ubahTruk} style={{ display: "grid", gap: 8, maxWidth: 300 }}>
        <input type="hidden" name="id" value={truk.id} />
        <input name="platNomor" defaultValue={truk.platNomor} required />
        <input name="jenis" defaultValue={truk.jenis} required />
        <input name="kapasitas" type="number" defaultValue={truk.kapasitas} required />
        <select name="status" defaultValue={truk.status}>
          <option>Tersedia</option>
          <option>Sedang Jalan</option>
          <option>Perbaikan</option>
        </select>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </main>
  );
}