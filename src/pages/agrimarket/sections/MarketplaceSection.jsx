import React, { useState, useEffect } from 'react';
import '../agriMarket.css';

const MarketplaceSection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [buyerType, setBuyerType] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const url = new URL('/api/marketplace', window.location.origin);
                if (buyerType) url.searchParams.append('buyerType', buyerType);
                
                const response = await fetch(url);
                const data = await response.json();
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching marketplace items:', error);
                setLoading(false);
            }
        };

        fetchItems();
    }, [buyerType]);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section>
            <h2 className="section-header">Farmer's Marketplace</h2>
            
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Search marketplace..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="wholesale">Wholesale Buyer</option>
                    <option value="retail">Retail Buyer</option>
                    <option value="both">Both</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="products-grid">
                    {filteredItems.map(item => (
                        <div key={item.id} className="product-card">
                            <img src={item.image_url} alt={item.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-name">{item.name}</h3>
                                <p className="product-price">₹{item.price}/{item.unit}</p>
                                <p className="product-details">
                                    Seller: {item.seller}
                                    <br />
                                    Location: {item.location}
                                    <br />
                                    Quantity Available: {item.quantity} {item.unit}
                                    <br />
                                    Buyer Type: {item.buyer_type}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MarketplaceSection;
