import { User } from "../types/User";

type Props = { user: User; onClose: () => void };

export default function UserDetailModal({ user, onClose }: Props) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, width: 300 }}>
        <h2>{user.name}</h2>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Website:</b> {user.website}</p>
        <p><b>Address:</b> {user.address.street}, {user.address.city}</p>
        <p><b>Catch Phrase:</b> {user.company.catchPhrase}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}