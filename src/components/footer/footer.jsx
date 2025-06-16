import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-info">
                    <div className="footer-logo">
                        AgriConnect Nepal
                    </div>
                    <p className="footer-description">
                        Connecting farmers with resources and opportunities. Supporting sustainable agriculture and rural development across Nepal.
                    </p>
                    <div className="social-links">
                        <a href="#" title="Facebook">
                            Facebook 
                        </a>
                        <a href="#" title="Twitter">
                            Twitter 
                        </a>
                        <a href="#" title="Instagram">
                            Instagram 
                        </a>
                        <a href="#" title="YouTube">
                            YouTube 
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} AgriConnect Nepal. Growing Together, Prospering Together. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;