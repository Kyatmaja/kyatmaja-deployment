import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function tambahTruk(formData: FormData) {
  "use server";
  await prisma.truk.create({
    data: {
      platNomor: String(formData.get("platNomor")),
      jenis: String(formData.get("jenis")),
      kapasitas: Number(formData.get("kapasitas")),
      status: String(formData.get("status")),
    },
  });
  revalidatePath("/");
}

async function hapusTruk(formData: FormData) {
  "use server";
  await prisma.truk.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/");
}

export default async function Home() {
  const daftarTruk = await prisma.truk.findMany({ orderBy: { id: "asc" } });

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Data Armada Truk</h1>

      <h2>Tambah Truk</h2>
      <form action={tambahTruk} style={{ display: "grid", gap: 8, maxWidth: 300 }}>
        <input name="platNomor" placeholder="Plat nomor (B 1234 XYZ)" required />
        <input name="jenis" placeholder="Jenis (Engkel, Tronton, dll)" required />
        <input name="kapasitas" type="number" placeholder="Kapasitas (ton)" required />
        <select name="status">
          <option>Tersedia</option>
          <option>Sedang Jalan</option>
          <option>Perbaikan</option>
        </select>
        <button type="submit">Simpan</button>
      </form>

      <h2>Daftar Truk</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Plat Nomor</th>
            <th>Jenis</th>
            <th>Kapasitas (ton)</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftarTruk.map((t) => (
            <tr key={t.id}>
              <td>{t.platNomor}</td>
              <td>{t.jenis}</td>
              <td>{t.kapasitas}</td>
              <td>{t.status}</td>
              <td>
                <Link href={`/edit/${t.id}`}>Edit</Link>{" "}
                <form action={hapusTruk} style={{ display: "inline" }}>
                  <input type="hidden" name="id" value={t.id} />
                  <button type="submit">Hapus</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}