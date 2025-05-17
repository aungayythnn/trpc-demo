'use client';

import { useEffect, useState } from 'react';

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type GetPokemonResponse = {
  abilities: Ability[];
  id: number;
  is_default: boolean;
  name: string;
};

export default function GetPokemonWithoutTrpc() {
  const [data, setData] = useState<GetPokemonResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        const json: GetPokemonResponse = await res.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">{data.name.toUpperCase()}</h1>
      <p className="text-gray-600 mb-2">ID: <span className="font-medium">{data.id}</span></p>
      <p className="text-gray-600 mb-4">
        Default:{" "}
        <span className={`font-semibold ${data.is_default ? "text-green-600" : "text-red-600"}`}>
          {data.is_default ? "Yes" : "No"}
        </span>
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Abilities</h2>
      <ul className="space-y-1">
        {data.abilities.map((a) => (
          <li
            key={a.ability.name}
            className="bg-purple-100 text-purple-800 rounded px-3 py-1 inline-block text-sm"
          >
            {a.ability.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}
