import styled from 'styled-components';
import PropTypes from 'prop-types';

const PlatformFilter = ({ selectedPlatforms, onPlatformChange }) => {
  const platforms = [
    { id: '4', name: 'PC', value: 'pc' },
    { id: '187', name: 'PlayStation', value: 'playstation' },
    { id: '1', name: 'Xbox', value: 'xbox' }
  ];

  const handleCheckboxChange = (platformId) => {
    const newSelected = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId];
    
    onPlatformChange(newSelected);
  };

  return (
    <PlatformFilterWrapper>
      <h4 className="filter-title">Platforms</h4>
      <div className="platform-checkboxes">
        {platforms.map(platform => (
          <label key={platform.id} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform.id)}
              onChange={() => handleCheckboxChange(platform.id)}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">{platform.name}</span>
          </label>
        ))}
      </div>
    </PlatformFilterWrapper>
  );
};

export default PlatformFilter;

PlatformFilter.propTypes = {
  selectedPlatforms: PropTypes.array.isRequired,
  onPlatformChange: PropTypes.func.isRequired
};

const PlatformFilterWrapper = styled.div`
  .filter-title {
    font-family: var(--font-family-heading);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--clr-white);
    margin-bottom: 16px;
  }

  .platform-checkboxes {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;

    @media screen and (max-width: 768px) {
      gap: 16px;
    }
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    position: relative;
    padding: 10px 16px;
    background-color: var(--clr-gray-dark);
    border: 2px solid var(--clr-gray-medium);
    border-radius: 8px;
    transition: var(--transition-default);

    &:hover {
      border-color: var(--clr-gray-light);
      background-color: var(--clr-gray-medium);
    }
  }

  .checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ .checkbox-custom {
      background-color: var(--clr-white);
      border-color: var(--clr-white);

      &::after {
        display: block;
      }
    }

    &:checked ~ .checkbox-text {
      color: var(--clr-white);
      font-weight: 600;
    }

    &:checked + .checkbox-custom + .checkbox-text {
      & ~ * {
        border-color: var(--clr-white);
      }
    }
  }

  .checkbox-custom {
    position: relative;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: 2px solid var(--clr-gray-lighter);
    border-radius: 4px;
    margin-right: 12px;
    flex-shrink: 0;
    transition: var(--transition-default);

    &::after {
      content: '';
      position: absolute;
      display: none;
      left: 5px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid var(--clr-black);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  .checkbox-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--clr-gray-lighter);
    transition: var(--transition-default);
  }

  .checkbox-input:checked ~ .checkbox-label {
    border-color: var(--clr-white);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;