import React, { useState, useEffect } from 'react';
import '../agriMarket.css';

const SeedsSection = () => {
    const [seeds, setSeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchSeeds = async () => {
            try {
                const url = new URL('/api/seeds', window.location.origin);
                if (type) url.searchParams.append('type', type);
                
                const response = await fetch(url);
                const data = await response.json();
                setSeeds(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching seeds:', error);
                setLoading(false);
            }
        };

        fetchSeeds();
    }, [type]);

    const filteredSeeds = seeds.filter(seed =>
        seed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seed.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section>
            <h2 className="section-header">Seeds & Saplings</h2>
            
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Search seeds..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="vegetable">Vegetable Seeds</option>
                    <option value="fruit">Fruit Seeds</option>
                    <option value="flower">Flower Seeds</option>
                    <option value="herb">Herb Seeds</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="products-grid">
                    {filteredSeeds.map(seed => (
                        <div key={seed.id} className="product-card">
                            <img src={seed.image_url} alt={seed.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-name">{seed.name}</h3>
                                <p className="product-price">₹{seed.price}</p>
                                <p className="product-details">
                                    {seed.description}
                                    <br />
                                    Type: {seed.type}
                                    <br />
                                    Planting Season: {seed.planting_season}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SeedsSection;
