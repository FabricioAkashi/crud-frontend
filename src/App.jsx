import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://crud-backend-tbpd.onrender.com";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    await axios.post(`${API}/users`, { name, email });
    setName("");
    setEmail("");
    fetchUsers();
  };

  const updateUser = async () => {
    await axios.put(`${API}/users/${editingId}`, {
      name,
      email,
    });

    setName("");
    setEmail("");
    setEditingId(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/users/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>CRUD</h1>

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={editingId ? updateUser : createUser}>
        {editingId ? "Atualizar" : "Criar"}
      </button>

      <ul className="users">
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}

            <button
              onClick={() => {
                setName(user.name);
                setEmail(user.email);
                setEditingId(user._id);
              }}
            >
              Editar
            </button>

            <button onClick={() => deleteUser(user._id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
