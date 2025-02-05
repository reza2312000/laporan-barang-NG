import { updateStatus } from "@/lib/firestore/dataController/dataController";

export default async function handlerUpdateData(req, res) {
  if (req.method === "PATCH") {
    try {
      const { docId1, docId2, status } = req.body;

      await updateStatus(docId1, docId2, status);
      res.status(200).json({
        message: "Form data updated in Firestore successfully",
      });
    } catch (error) {
      console.error("Error updating form data in Firestore:", error);
      res
        .status(500)
        .json({ message: "Failed to update form data in Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
