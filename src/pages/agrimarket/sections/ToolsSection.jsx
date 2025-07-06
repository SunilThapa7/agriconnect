import React, { useState, useEffect } from 'react';
import '../agriMarket.css';

const ToolsSection = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    
    useEffect(() => {
        fetchTools();
    }, [category]);

    const fetchTools = async () => {
        try {
            const url = new URL('/api/tools', window.location.origin);
            if (category) url.searchParams.append('category', category);
            
            const response = await fetch(url);
            const data = await response.json();
            setTools(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tools:', error);
            setLoading(false);
        }
    };

    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section>
            <h2 className="section-header">Agricultural Tools</h2>
            
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Search tools..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="hand">Hand Tools</option>
                    <option value="power">Power Tools</option>
                    <option value="irrigation">Irrigation</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="products-grid">
                    {filteredTools.map(tool => (
                        <div key={tool.id} className="product-card">
                            <img src={tool.image_url} alt={tool.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-name">{tool.name}</h3>
                                <p className="product-price">₹{tool.price}</p>
                                <p className="product-details">
                                    {tool.description}
                                    <br />
                                    Category: {tool.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ToolsSection;
