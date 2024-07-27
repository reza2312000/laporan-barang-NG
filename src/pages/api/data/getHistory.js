import { getHistory } from "@/lib/firestore/dataController/dataController";

export default async function handlerGetHistory(req, res) {
  if (req.method === "GET") {
    try {
      const data = await getHistory();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
