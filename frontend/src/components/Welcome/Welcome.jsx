import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  
  const links = [
    {
      title: 'PyroReality Check',
      description: 'The 3-minute business debrief',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googleforms.svg',
      url: '/realitycheck',
      isExternal: false
    },
    {
      title: 'Website',
      description: 'Visit our main website',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlechrome.svg',
      url: '/', 
      isExternal: false
    },
    {
      title: 'Book a Call',
      description: 'Schedule a strategy call',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlecalendar.svg',
      url: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0iZ6GBUpEp6xEXcYQ0wZLryUc6bprkId2iHVJjJF88E3JTJGM917FiwtH6mwtuwUuyOVr2Whwm?gv=true', // Replace with actual calendar link
      isExternal: true
    },
    {
      title: 'Instagram',
      description: 'Follow us on Instagram',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg',
      url: 'https://www.instagram.com/pyrosynergy', // Replace with Instagram link
      isExternal: true
    },
    {
      title: 'LinkedIn',
      description: 'Connect with us professionally',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
      url: 'https://www.linkedin.com/company/pyrosynergy/posts/?feedView=all', // Replace with LinkedIn link
      isExternal: true
    }
  ];

  const handleLinkClick = (link) => {
    if (link.isExternal) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else {
      // Use navigate instead of window.location.href to avoid page reload
      navigate(link.url);
    }
  };

  return (
    <div className="pyro-landing-wrapper">
      <div className="pyro-landing-main">
        {/* Profile Section */}
        <div className="pyro-company-info">
          <div className="pyro-logo-container">
            <img 
              src="/Mainlogo3.png" 
              alt="PyroSynergy Logo" 
              className="pyro-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="pyro-logo-fallback" style={{display: 'none'}}>PS</div>
          </div>
          <h1 className="pyro-company-title">PyroSynergy</h1>
          <p className="pyro-company-tagline">
            Empathy-first Digital Partner • Business Growth • Strategy Consulting
          </p>
          <p className="pyro-company-description">
            Are you an early-stage founder, post-MVP and revenue-making, but struggle to align your business to the vision and mission you had? <br/>
          </p>
        </div>

        {/* Links Section */}
        <div className="pyro-navigation-menu">
          <div className="pyro-cta-text">
            Want to get aligned? Take our FREE PyroReality Check!
          </div>
          {links.map((link, index) => (
            <button
              key={index}
              className="pyro-nav-item"
              onClick={() => handleLinkClick(link)}
            >
              <div className="pyro-nav-content">
                <div className="pyro-nav-icon">
                  {link.icon.startsWith('http') ? (
                    <img 
                      src={link.icon} 
                      alt={`${link.title} icon`} 
                      className="pyro-nav-icon-img"
                    />
                  ) : (
                    link.icon
                  )}
                </div>
                <div className="pyro-nav-text">
                  <h3 className="pyro-nav-title">{link.title}</h3>
                  <p className="pyro-nav-subtitle">{link.description}</p>
                </div>
              </div>
              {/* <div className="pyro-nav-arrow">→</div> */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
