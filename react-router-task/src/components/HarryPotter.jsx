import { useState, useEffect } from 'react';
import "./Harrypotter.css"

const Harrypotter = () => {
    const [language, setLanguage] = useState('en');
    const [category, setCategory] = useState('books');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (language && category) {
            fetchData();
        }
    }, [language, category, searchTerm]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setResults([]);

        const url = `https://potterapi-fedeperin.vercel.app/${language}/${category}${searchTerm ?` ?search=${searchTerm}` : ''
            }`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data)) {
                setResults(data);
            } else {
                setResults([data]);
            }
        } catch (error) {
            setError('Error fetching data. Please try again later.', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Potter API Explorer</h2>

            {/* Language Selector */}
            <label htmlFor="language">Select Language:</label>
            <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
                <option value="fr">French</option>
                <option value="de">German</option>
            </select>

            {/* Category Selector */}
            <label htmlFor="category">Select Category:</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="books">Books</option>
                <option value="characters">Characters</option>
                <option value="spells">Spells</option>
                <option value="houses">Houses</option>
            </select>

            {/* Search Input */}
            {/* <label htmlFor="search">Search:</label> */}
            <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search term"
            />

            <button onClick={fetchData}>Search</button>

            {/* Results Section */}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results.length > 0 && (
                <div>
                    <h3>Results:</h3>
                    <ul>
                        {results.map((item, index) => (
                            <li key={index}>
                                {/* For books */}
                                {category === 'books' && (
                                    <div>
                                        <h4>{item.title}</h4>
                                        <img src={item.cover} alt={item.title} />
                                        <p>{item.description}</p>
                                    </div>
                                )}

                                {/* For characters */}
                                {category === 'characters' && (
                                    <div>
                                        <h4>{item.fullName}</h4>
                                        <img src={item.image} alt={item.fullName} />
                                        <p>House: {item.hogwartsHouse}</p>
                                    </div>
                                )}

                                {/* For spells */}
                                {category === 'spells' && (
                                    <div>
                                        <h4>{item.spell}</h4>
                                        <p><strong>Use:</strong> {item.use}</p>
                                    </div>
                                )}

                                {/* For houses */}
                                {category === 'houses' && (
                                    <div>
                                        <h4>{item.house} {item.emoji}</h4>
                                        <p><strong>Founder:</strong> {item.founder}</p>
                                        <p><strong>Colors:</strong> {Array.isArray(item.colors) ? item.colors.join(', ') : 'No colors available'}</p>
                                        <p><strong>Animal:</strong> {item.animal}</p>
                                    </div>
                                )}

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Harrypotter;
