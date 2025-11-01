import styled from 'styled-components';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchBarWrapper>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <BsSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for games..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
    </SearchBarWrapper>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 60px;

  .search-form {
    width: 100%;
  }

  .search-input-wrapper {
    display: flex;
    align-items: center;
    background-color: var(--clr-gray-dark);
    border: 2px solid var(--clr-gray-medium);
    border-radius: 50px;
    padding: 4px 4px 4px 24px;
    transition: var(--transition-default);

    &:focus-within {
      border-color: var(--clr-white);
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }
  }

  .search-icon {
    color: var(--clr-gray-lighter);
    font-size: 20px;
    margin-right: 16px;
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--clr-white);
    font-size: 16px;
    padding: 12px 0;
    font-family: var(--font-family-primary);

    &::placeholder {
      color: var(--clr-gray-lighter);
    }

    &:focus {
      outline: none;
    }
  }

  .search-btn {
    background-color: var(--clr-white);
    color: var(--clr-black);
    border: none;
    padding: 12px 32px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: var(--transition-default);
    font-family: var(--font-family-heading);
    flex-shrink: 0;

    &:hover {
      background-color: var(--clr-gray-lightest);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    .search-input-wrapper {
      padding: 4px 4px 4px 16px;
    }

    .search-icon {
      font-size: 18px;
      margin-right: 12px;
    }

    .search-input {
      font-size: 14px;
      padding: 10px 0;
    }

    .search-btn {
      padding: 10px 24px;
      font-size: 13px;
    }
  }
`;