import { users } from "./services/userService";
import userService from "./services/userService";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isloading, setusers, seterror } = useUsers();

  const deleteUser = (user: users) => {
    const originalusers = [...users];
    setusers(users.filter((u) => u.id != user.id));

    userService.delete(user.id).catch((err) => {
      seterror(err.message);
      setusers(originalusers);
    });
  };

  const addUser = () => {
    const originalusers = [...users];
    const newuser = { id: 0, name: "vikram" };
    setusers([...users, newuser]);

    userService
      .create(newuser)
      .then(({ data: saveduser }) => setusers([saveduser, ...users]))
      .catch((err) => {
        seterror(err.message);
        setusers(originalusers);
      });
  };

  const updateuser = (user: users) => {
    const updateduser = { ...user, name: user.name + "!" };
    const originalusers = [...users];
    setusers(users.map((u) => (u.id === user.id ? updateduser : u)));

    userService.update(updateduser).catch((err) => {
      seterror(err.message);
      setusers(originalusers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isloading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((users) => (
          <li
            key={users.id}
            className="list-group-item d-flex justify-content-between"
          >
            {users.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1 "
                onClick={() => updateuser(users)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(users)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
