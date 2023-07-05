import { getFireBaseApp } from "../firebaseHelper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const signUp = async (firstName, lastName, email, password) => {
  const app = getFireBaseApp();
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
  } catch (error) {
    const errorCode = error.code;

    let message = "something went wrong";

    if (errorCode === "auth/email-already-in-use") {
      message = "This email is already in use";
    }

    throw new Error(message);
  }
};
