import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function addData(
  name,
  nik,
  part,
  machine,
  shift,
  date,
  jenisNg,
  jumlahNg,
  estimasiBerat,
  status
) {
  try {
    const docRef = collection(firestore, "DataReport");
    const snapshot = await addDoc(docRef, {
      nama: name,
      nik: nik,
      mesin: machine,
      shift: shift,
      date: date,
      status: status,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
      },
    });
    return snapshot;
  } catch (error) {
    console.error("Error adding document to Firestore:", error);
    throw new Error("Failed to add document to Firestore");
  }
}

export async function addDataBatch(
  name,
  nik,
  part,
  machine,
  shift,
  date,
  jenisNg,
  jumlahNg,
  estimasiBerat,
  status
) {
  const batch = writeBatch(firestore);
  const docRefs = [];

  try {
    // Membuat referensi dokumen baru dengan ID yang dihasilkan oleh Firestore
    const docRef1 = doc(collection(firestore, "DataReport"));
    const docRef2 = doc(collection(firestore, "History"));

    docRefs.push(docRef1.id);
    docRefs.push(docRef2.id);

    batch.set(docRef1, {
      nama: name,
      nik: nik,
      mesin: machine,
      shift: shift,
      date: date,
      status: status,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
      },
    });

    batch.set(docRef2, {
      nama: name,
      nik: nik,
      mesin: machine,
      shift: shift,
      date: date,
      status: status,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
      },
    });

    await batch.commit();

    console.log(docRefs);
    return docRefs;
  } catch (error) {
    console.error("Error menambahkan dokumen ke Firestore:", error);
    throw new Error("Gagal menambahkan dokumen ke Firestore");
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
export async function getDataByNik(userNik) {
  try {
    const docRef = collection(firestore, "DataReport");
    const q = query(docRef, where("nik", "==", userNik))
    const snapshot = await getDocs(q);
    const subData = [];
    snapshot.forEach((doc) => {
      subData.push({ id: doc.id, ...doc.data() });
    });
    return subData;
  } catch (error) {
    console.log(error);
  }
}

export async function getHistory() {
  try {
    const docRef = collection(firestore, "History");
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

export async function updateData(
  docId1,
  docId2,
  part,
  machine,
  shift,
  date,
  jenisNg,
  jumlahNg,
  estimasiBerat,
  aktualBerat
) {
  try {
    const docRef1 = doc(firestore, "DataReport", docId1);
    const snapshot1 = await updateDoc(docRef1, {
      mesin: machine,
      shift: shift,
      date: date,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
        },
        });
        
        const docRef2 = doc(firestore, "History", docId2);
        const snapshot2 = await updateDoc(docRef2, {
          mesin: machine,
          shift: shift,
          date: date,
          data_NG: {
            part: part,
            jenis_NG: jenisNg,
            jumlah_NG: jumlahNg,
            estimasi_berat: estimasiBerat,
            aktual_berat: aktualBerat,
            },
    });
    return { snapshot1, snapshot2 };
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document subcollection to Firestore");
  }
}

export async function updateStatus(docId1, docId2, status) {
  try {
    const docRef1 = doc(firestore, "DataReport", docId1);
    const snapshot1 = await updateDoc(docRef1, {
      status: status,
    });

    const docRef2 = doc(firestore, "History", docId2);
    const snapshot2 = await updateDoc(docRef2, {
      status: status,
    });

    return {snapshot1, snapshot2};
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document subcollection to Firestore");
  }
}

export async function updateActualWeight(
  docId1,
  docId2,
  part,
  jenisNg,
  jumlahNg,
  estimasiBerat,
  aktualBerat
) {
  try {
    const docRef1 = doc(firestore, "DataReport", docId1);
    const snapshot1 = await updateDoc(docRef1, {
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
      },
    });

    const docRef2 = doc(firestore, "History", docId2);
    const snapshot2 = await updateDoc(docRef2, {
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
      },
    });
    return {snapshot1, snapshot2};
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document subcollection to Firestore");
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

export async function deleteDataCollection() {
  try {
    const collectionRef = collection(firestore, "DataReport");
    const querySnapshot = await getDocs(collectionRef);

    const batch = writeBatch(firestore);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}

export async function deleteHistoryCollection() {
  try {
    const collectionRef = collection(firestore, "History");
    const querySnapshot = await getDocs(collectionRef);

    const batch = writeBatch(firestore);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}