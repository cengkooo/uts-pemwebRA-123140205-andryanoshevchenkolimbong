import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameFilter = ({ onFilterChange }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Platform IDs dari RAWG API
  const platforms = [
    { id: 4, name: 'PC' },
    { id: 187, name: 'PlayStation 5' },
    { id: 1, name: 'Xbox One' },
    { id: 18, name: 'PlayStation 4' },
    { id: 186, name: 'Xbox Series S/X' },
    { id: 7, name: 'Nintendo Switch' },
    { id: 3, name: 'Xbox 360' },
  ];

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => {
      const newSelection = prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId];
      
      return newSelection;
    });
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
  };

  useEffect(() => {
    // Kirim filter ke parent component
    onFilterChange({
      platforms: selectedPlatforms.join(',')
    });
  }, [selectedPlatforms, onFilterChange]);

  return (
    <FilterWrapper>
      <div className="filter-header">
        <button 
          className="filter-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>FILTER BY PLATFORM</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>
        
        {selectedPlatforms.length > 0 && (
          <button 
            className="clear-btn"
            onClick={handleClearFilters}
          >
            CLEAR ALL FILTERS
          </button>
        )}
      </div>

      {isOpen && (
        <div className="filter-content">
          <div className="platform-grid">
            {platforms.map(platform => (
              <label key={platform.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform.id)}
                  onChange={() => handlePlatformToggle(platform.id)}
                />
                <span className="checkbox-custom"></span>
                <span className="platform-name">{platform.name}</span>
              </label>
            ))}
          </div>

          {selectedPlatforms.length > 0 && (
            <div className="selected-info">
              <p className="text-white">
                {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      )}
    </FilterWrapper>
  );
};

export default GameFilter;

GameFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

const FilterWrapper = styled.div`
  background-color: var(--clr-gray-dark);
  border: 1px solid var(--clr-gray-medium);
  border-radius: 8px;
  margin-bottom: 40px;
  overflow: hidden;

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background-color: var(--clr-gray-dark);
    border-bottom: 1px solid var(--clr-gray-medium);
    flex-wrap: wrap;
    gap: 16px;

    .filter-toggle {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--clr-white);
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.1em;
      transition: var(--transition-default);

      &:hover {
        color: var(--clr-gray-lightest);
      }

      .arrow {
        transition: var(--transition-default);
        font-size: 12px;

        &.open {
          transform: rotate(180deg);
        }
      }
    }

    .clear-btn {
      background-color: transparent;
      color: var(--clr-gray-lightest);
      border: 1px solid var(--clr-gray-medium);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      transition: var(--transition-default);

      &:hover {
        background-color: var(--clr-white);
        color: var(--clr-black);
        border-color: var(--clr-white);
      }
    }
  }

  .filter-content {
    padding: 24px;
  }

  .platform-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--clr-gray-medium);
    border-radius: 6px;
    transition: var(--transition-default);

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: var(--clr-gray-light);
    }

    input[type="checkbox"] {
      display: none;
    }

    .checkbox-custom {
      width: 20px;
      height: 20px;
      border: 2px solid var(--clr-gray-light);
      border-radius: 4px;
      position: relative;
      transition: var(--transition-default);
      flex-shrink: 0;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 10px;
        height: 10px;
        background-color: var(--clr-white);
        border-radius: 2px;
        transition: var(--transition-default);
      }
    }

    input[type="checkbox"]:checked + .checkbox-custom {
      background-color: var(--clr-white);
      border-color: var(--clr-white);

      &::after {
        transform: translate(-50%, -50%) scale(1);
        background-color: var(--clr-black);
      }
    }

    .platform-name {
      color: var(--clr-white);
      font-size: 14px;
      font-weight: 500;
    }
  }

  .selected-info {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--clr-gray-medium);
    text-align: center;

    p {
      font-size: 13px;
      color: var(--clr-gray-lightest);
    }
  }
`;