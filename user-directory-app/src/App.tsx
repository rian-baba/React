import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "./types/User";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import UserDetailModal from "./components/UserDetailModal";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        setUsers(res.data);
        setFiltered(res.data);
      });
  }, []);

  const handleSearch = (text: string) => {
    setFiltered(users.filter(user => user.name.toLowerCase().includes(text.toLowerCase())));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>User Directory</h1>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filtered.map(user => (
          <UserCard key={user.id} user={user} onClick={() => setSelectedUser(user)} />
        ))}
      </div>
      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

export default App;