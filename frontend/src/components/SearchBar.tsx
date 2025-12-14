import { useState } from "react";

interface Props {
  onSearch: (filters: any) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const submit = () => {
    onSearch({ name, category, minPrice, maxPrice });
  };

  return (
    <div className="search-bar">
      <input placeholder="🍬 Name" onChange={e => setName(e.target.value)} />
      <input placeholder="🍫 Category" onChange={e => setCategory(e.target.value)} />
      <input placeholder="Min ₹" type="number" onChange={e => setMinPrice(e.target.value)} />
      <input placeholder="Max ₹" type="number" onChange={e => setMaxPrice(e.target.value)} />
      <button onClick={submit}>Search 🔍</button>
    </div>
  );
}
