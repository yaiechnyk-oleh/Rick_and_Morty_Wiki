import React, { useEffect, useState } from 'react';

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
};

type Episode = {
    name: string;
};

type ModalProps = {
    characterID: number;
    onClose: () => void;
};

const Details: React.FC<ModalProps> = ({ characterID, onClose }) => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [firstEpisodeName, setFirstEpisodeName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${characterID}`);
                const data: Character = await response.json();
                setCharacter(data);

                // If the character has episodes listed, fetch the first episode's details
                if (data.episode.length > 0) {
                    const episodeResponse = await fetch(data.episode[0]);
                    const episodeData: Episode = await episodeResponse.json();
                    setFirstEpisodeName(episodeData.name);
                }
            } catch (err) {
                setError('Failed to fetch character details');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacter();
    }, [characterID]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!character) return <div>No character data available.</div>;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 relative max-w-lg w-full">
                <button onClick={onClose} className="absolute h-10 w-10 top-2 right-2 text-xl font-bold">×</button>
                <div className="flex flex-col items-center">
                    <img src={character.image} alt={character.name} className="w-58 h-58 rounded-full mt-4" />
                    <h2 className="text-2xl font-bold mt-2">{character.name}</h2>
                    <div className="flex items-center mt-2">
                        <span className={`rounded-full h-3 w-3 mr-2 ${character.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <p className="text-lg"><strong>{character.status} - {character.species}</strong></p>
                    </div>
                    <p className="mt-2"><strong>Origin:</strong> {character.origin.name}</p>
                    <p className="mt-1"><strong>Last Known Location:</strong> {character.location.name}</p>
                    {firstEpisodeName && <p className="mt-2"><strong>First Seen in Episode:</strong> {firstEpisodeName}</p>}
                </div>
            </div>
        </div>
    );
};

export default Details;
