import React, { useEffect, useState } from 'react';
import Details from "../Details/Details";

type DashBoardProps = {
    filter: string;
    sort: string;
};

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    location: { name: string };
    image: string;
    episode: string[];
};

const Dashboard: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('https://rickandmortyapi.com/api/character');
                const data = await response.json();
                setCharacters(data.results);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error}</div>;

    return (
        <div className="p-5 bg-gray-500 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {characters.map((character) => (
                    <div key={character.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={() => setSelectedCharacter(character)}>
                        <img src={character.image} alt={character.name} className="w-full h-48 object-cover rounded-md" />
                        <h3 className="text-lg font-bold mt-2">{character.name}</h3>
                    </div>
                ))}
            </div>
            {selectedCharacter && <Details characterID={selectedCharacter.id} onClose={() => setSelectedCharacter(null)} />}
        </div>
    );
};

export default Dashboard;
