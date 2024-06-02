import { addData } from "@/lib/firestore/dataController/dataController";

export default async function handlerAddData(req, res) {
  if (req.method === "POST") {
    try {
      const { name, nik, part, shift, date, jenisNg, jumlahNg } = req.body;

      const docRef = await addData(
        name,
        nik,
        part,
        shift,
        date,
        jenisNg,
        jumlahNg
      );
      const docId = docRef.id;
      res.status(200).json({ docId });
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
      res.status(500).json({ message: "Failed to add data to Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
