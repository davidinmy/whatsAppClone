import { getDatabase, get, ref, child } from "firebase/database";
import { getFireBaseApp } from "../firebaseHelper";

export const getUserData = async (userId) => {
  try {
    const app = getFireBaseApp();
    const dbRef = ref(getDatabase());
    const userRef = child(dbRef, `users/${userId}`);

    const snapshot = await get(userRef);
    console.log(snapshot);
    return snapshot.val();
  } catch (error) {
    console.log(error);
  }
};
