import React, { memo } from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <ul>
          <li>
            <a href="/career">Career</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/follow">Follow Us</a>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
      <div className="wave-background">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#4285f4"
            fillOpacity="1"
            d="M0,128L80,160C160,192,320,256,480,250.7C640,245,800,171,960,138.7C1120,107,1280,117,1360,122.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
          <path
            fill="#64b5f6"
            fillOpacity="0.7"
            d="M0,160L80,186.7C160,213,320,267,480,256C640,245,800,171,960,149.3C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
          <path
            fill="#90caf9"
            fillOpacity="0.5"
            d="M0,192L80,202.7C160,213,320,235,480,229.3C640,224,800,192,960,176C1120,160,1280,160,1360,165.3L1440,171L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
    </footer>
  );
};

export default memo(Footer);
