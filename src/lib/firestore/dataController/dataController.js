import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function addData(name, nik, part, shift, date, jenisNg, jumlahNg) {
  try {
    const docRef = collection(firestore, "DataReport");
    const snapshot = await addDoc(docRef, {
      nama: name,
      nik: nik,
      shift: shift,
      date: date,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
      },
    });
    return snapshot;
  } catch (error) {
    console.error("Error adding document to Firestore:", error);
    throw new Error("Failed to add document to Firestore");
  }
}

export async function getAllData() {
  try {
    const docRef = collection(firestore, "DataReport");
    const snapshot = await getDocs(docRef);
    const subData = [];
    snapshot.forEach((doc) => {
      subData.push({ id: doc.id, ...doc.data() });
    });
    return subData;
  } catch (error) {
    console.log(error);
  }
}

export async function getDataById(docId) {
  try {
    const docRef = doc(firestore, "DataReport", docId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Failed to fetch document ID from Firestore");
  }
}

export async function updateData(docId, part, shift, date, jenisNg, jumlahNg) {
  try {
    const docRef = doc(firestore, "DataReport", docId);
    const snapshot = await updateDoc(docRef, {
      shift: shift,
      date: date,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
      },
    });
    return snapshot;
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function deleteData(docId) {
  try {
    const docRef = doc(firestore, "DataReport", docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}
