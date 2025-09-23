import { User } from "../types/User";

type Props = { user: User; onClick: () => void };

export default function UserCard({ user, onClick }: Props) {
  return (
    <div onClick={onClick} style={{ border: "2px solid #ccc", padding: 10, margin: 5, cursor: "pointer" }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.company.name}</p>
    </div>
  );
}