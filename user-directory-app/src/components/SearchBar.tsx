type Props = { onSearch: (text: string) => void };

export default function SearchBar({ onSearch }: Props) {
  return <input type="text" placeholder="Search name..." onChange={e => onSearch(e.target.value)} />;
}