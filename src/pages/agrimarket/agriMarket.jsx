import './agriMarket.css';

const AgriMarket = () => {
    return (
        <div className="agrimarket-container">
            <h1>Agricultural Market</h1>
            <p>This is the AgriMarket page where farmers can trade agricultural products.</p>
            <div className="content-section">
                <p>Explore our marketplace for:</p>
                <ul>
                    <li>Fresh Produce</li>
                    <li>Agricultural Equipment</li>
                    <li>Seeds and Fertilizers</li>
                    <li>Farming Tools</li>
                </ul>
            </div>
        </div>
    );
};

export default AgriMarket;
