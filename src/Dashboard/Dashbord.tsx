import React, { useEffect, useState } from 'react';
import Details from "../Details/Details";

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    location: { name: string };
    image: string;
    episode: string[];
};

type Info = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
};

type APIResponse = {
    info: Info;
    results: Character[];
};

type DashboardProps = {
    filter: string;
    sort: string;
    reset: boolean;
};

const Dashboard: React.FC<DashboardProps> = ({ filter, sort, reset }) => {
    const [originalCharacters, setOriginalCharacters] = useState<Character[]>([]);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (url: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            const data: APIResponse = await response.json();
            setNextPage(data.info.next);
            return data.results;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData('https://rickandmortyapi.com/api/character').then(results => {
            if (results) {
                setOriginalCharacters(results);
                setCharacters(results);
            }
        });
    }, []);

    useEffect(() => {
        if (reset) {
            setCharacters(originalCharacters);
        }
    }, [reset, originalCharacters]);

    useEffect(() => {
        let filteredCharacters = [...originalCharacters];

        if (filter) {
            filteredCharacters = filteredCharacters.filter(character => {
                const statusLower = character.status.toLowerCase();
                return filter === 'alive' ? statusLower === 'alive' : statusLower === 'dead';
            });
        }

        if (sort) {
            filteredCharacters.sort((a, b) => {
                if (sort === 'name-asc') return a.name.localeCompare(b.name);
                if (sort === 'name-desc') return b.name.localeCompare(a.name);
                if (sort === 'status') return a.status.localeCompare(b.status);
                return 0;
            });
        }

        setCharacters(filteredCharacters);
    }, [filter, sort, originalCharacters]);

    const handleLoadMore = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation(); // Stops the event from bubbling up to parent elements
        if (nextPage) {
            const newCharacters = await fetchData(nextPage);
            if (newCharacters) {
                setOriginalCharacters(prev => [...prev, ...newCharacters]);
                setCharacters(prev => [...prev, ...newCharacters]);
            }
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className="p-5 bg-[#6D755D] min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {characters.map((character) => (
                    <div key={character.id}
                         className=" h-258 w-258 bg-[#FDF9F3] rounded-lg shadow-md p-4 cursor-pointer hover:shadow-[0_0_25px_rgba(31,150,20,0.8)]"
                         onClick={() => setSelectedCharacter(character)}>
                        <img src={character.image} alt={character.name} className="w-48 h-48 object-cover rounded-full mx-auto" />
                        <div className="text-center mt-4">
                            <h3 className="text-lg font-bold">{character.name}</h3>
                            <p>{character.status}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCharacter && <Details characterID={selectedCharacter.id} onClose={() => setSelectedCharacter(null)} />}
            {nextPage && <button type = "button" onClick={handleLoadMore} className="bg-[#FDF9F3] text-black p-2 rounded mt-12">Load More Characters</button>}
        </div>
    );
};

export default Dashboard;
