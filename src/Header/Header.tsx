import React, { useState } from 'react';

type HeaderProps = {
    setFilter: (filter: string) => void;
    setSort: (sort: string) => void;
    setReset: (value: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ setFilter, setSort, setReset }) => {
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedSort, setSelectedSort] = useState('');

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(event.target.value);
        setFilter(event.target.value);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSort(event.target.value);
        setSort(event.target.value);
    };

    const handleReset = () => {
        setSelectedFilter('');
        setSelectedSort('');
        // Propagate the reset to the parent component
        setFilter('');
        setSort('');
        setReset(true);
    };

    return (
        <header className="bg-[#FDF9F3] text-gray-800 py-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#1F9614]">R&M Wiki</h1>
                <nav>
                    <div className="flex gap-4">
                        <div>
                            <label htmlFor="filter" className="mr-2">Filter by:</label>
                            <select id="filter" value={selectedFilter} onChange={handleFilterChange} className="bg-white text-gray-800 p-2 rounded border border-gray-300">
                                <option value="">Select</option>
                                <option value="alive">Alive</option>
                                <option value="dead">Dead</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sort" className="mr-2">Sort by:</label>
                            <select id="sort" value={selectedSort} onChange={handleSortChange} className="bg-white text-gray-800 p-2 rounded border border-gray-300">
                                <option value="">Select</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                        <button onClick={handleReset} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                            Reset
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
