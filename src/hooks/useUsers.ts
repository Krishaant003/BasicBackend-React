import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import userService,{users} from "../services/userService";


const useUsers =() => {

    const [users, setusers] = useState<users[]>([]);
    const [error, seterror] = useState("");
    const [isloading, setloading] = useState(false);

  useEffect(() => {
    document.title="Backend Server"
    setloading(true);
    const { request, cancel } = userService.getAll<users>();
    request
      .then((res) => {
        setusers(res.data);
        setloading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        seterror(err.message);
        setloading(false);
      });

    return () => cancel();
  }, []);

  return { users , error , isloading , setusers,seterror}
}

export default useUsers;