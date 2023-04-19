import { User } from "firebase/auth";

const useCheckIsAdmin = () => {
  const checkIsAdmin = (user:User | null) => {
    if (
      user &&
      user.uid === process.env.NEXT_PUBLIC_ADMIN_UID &&
      user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      return true;
    }
  
    return false;
  }

  return checkIsAdmin
}

export default useCheckIsAdmin;