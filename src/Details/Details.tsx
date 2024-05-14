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

type ModalProps = {
    characterID: number;
    onClose: () => void;
};

const Details: React.FC<ModalProps> = ({ characterID, onClose }) => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${characterID}`);
                const data = await response.json();
                setCharacter(data);
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
            <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">&times;</button>
                <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Type:</strong> {character.type}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Origin:</strong> {character.origin.name}</p>
                <p><strong>Last Known Location:</strong> {character.location.name}</p>
                <img src={character.image} alt={character.name} className="w-full max-h-60 object-cover mt-4"/>
                <p><strong>First Seen in Episodes:</strong> {character.episode.join(', ')}</p>
            </div>
        </div>
    );
};

export default Details;
