import React from 'react';

type HeaderProps = {
    setFilter: (filter: string) => void;
    setSort: (sort: string) => void;
};

const Header: React.FC<HeaderProps> = ({ setFilter, setSort }) => {
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
    };

    return (
        <header className="bg-gray-700 text-white py-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">R&M Wiki</h1>
                <nav>
                    <div className="flex gap-4">
                        <div>
                            <label htmlFor="filter" className="mr-2">Filter by:</label>
                            <select id="filter" onChange={handleFilterChange} className="bg-gray-800 text-white p-2 rounded">
                                <option value="">Select</option>
                                <option value="alive">Alive</option>
                                <option value="dead">Dead</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sort" className="mr-2">Sort by:</label>
                            <select id="sort" onChange={handleSortChange} className="bg-gray-800 text-white p-2 rounded">
                                <option value="">Select</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
