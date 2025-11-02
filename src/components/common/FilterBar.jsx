import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsFilter } from 'react-icons/bs';

const FilterBar = ({ onFilterChange }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const platforms = [
    { id: 4, name: 'PC', value: '4' },
    { id: 187, name: 'PlayStation 5', value: '187' },
    { id: 18, name: 'PlayStation 4', value: '18' },
    { id: 16, name: 'PlayStation 3', value: '16' },
    { id: 1, name: 'Xbox One', value: '1' },
    { id: 186, name: 'Xbox Series S/X', value: '186' },
    { id: 14, name: 'Xbox 360', value: '14' },
    { id: 7, name: 'Nintendo Switch', value: '7' },
  ];

  const handleCheckboxChange = (platformValue) => {
    let updatedPlatforms;
    
    if (selectedPlatforms.includes(platformValue)) {
      updatedPlatforms = selectedPlatforms.filter(p => p !== platformValue);
    } else {
      updatedPlatforms = [...selectedPlatforms, platformValue];
    }
    
    setSelectedPlatforms(updatedPlatforms);
    onFilterChange(updatedPlatforms);
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    onFilterChange([]);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <FilterBarWrapper>
      <div className="filter-header" onClick={toggleFilters}>
        <div className="filter-title">
          <BsFilter size={24} />
          <h3>Filter by Platform</h3>
        </div>
        {selectedPlatforms.length > 0 && (
          <span className="filter-count">{selectedPlatforms.length} selected</span>
        )}
      </div>

      {showFilters && (
        <div className="filter-content">
          <div className="filter-options">
            {platforms.map((platform) => (
              <label key={platform.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  value={platform.value}
                  checked={selectedPlatforms.includes(platform.value)}
                  onChange={() => handleCheckboxChange(platform.value)}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">{platform.name}</span>
              </label>
            ))}
          </div>

          {selectedPlatforms.length > 0 && (
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </FilterBarWrapper>
  );
};

export default FilterBar;

FilterBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

const FilterBarWrapper = styled.div`
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
    cursor: pointer;
    transition: var(--transition-default);

    &:hover {
      background-color: var(--clr-gray-medium);
    }
  }

  .filter-title {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--clr-white);

    svg {
      color: var(--clr-gray-lighter);
    }

    h3 {
      font-family: var(--font-family-heading);
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .filter-count {
    background-color: var(--clr-white);
    color: var(--clr-black);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
  }

  .filter-content {
    padding: 0 24px 24px;
    border-top: 1px solid var(--clr-gray-medium);
  }

  .filter-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding-top: 20px;
  }

  .filter-checkbox {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    color: var(--clr-white);
    font-size: 15px;
    position: relative;
    user-select: none;

    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkbox-custom {
      position: relative;
      height: 20px;
      width: 20px;
      background-color: transparent;
      border: 2px solid var(--clr-gray-light);
      border-radius: 4px;
      transition: var(--transition-default);
      flex-shrink: 0;

      &::after {
        content: '';
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid var(--clr-black);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    input:checked ~ .checkbox-custom {
      background-color: var(--clr-white);
      border-color: var(--clr-white);

      &::after {
        display: block;
      }
    }

    &:hover .checkbox-custom {
      border-color: var(--clr-white);
    }

    .checkbox-label {
      transition: var(--transition-default);
    }

    &:hover .checkbox-label {
      color: var(--clr-white);
    }
  }

  .clear-filters-btn {
    margin-top: 20px;
    width: 100%;
    padding: 12px 24px;
    background-color: transparent;
    color: var(--clr-white);
    border: 2px solid var(--clr-gray-light);
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: var(--transition-default);
    font-family: var(--font-family-heading);

    &:hover {
      background-color: var(--clr-white);
      color: var(--clr-black);
      border-color: var(--clr-white);
    }
  }

  @media screen and (max-width: 768px) {
    .filter-options {
      grid-template-columns: 1fr;
    }
  }
`;