import styled from 'styled-components';
import PropTypes from 'prop-types';

const GenreFilter = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <GenreFilterWrapper>
      <h4 className="filter-title">Genres</h4>
      <div className="genre-dropdown">
        <select 
          value={selectedGenre} 
          onChange={(e) => onGenreChange(e.target.value)}
          className="genre-select"
        >
          <option value="">All Genres</option>
          {genres?.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </GenreFilterWrapper>
  );
};

export default GenreFilter;

GenreFilter.propTypes = {
  genres: PropTypes.array.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

const GenreFilterWrapper = styled.div`
  .filter-title {
    font-family: var(--font-family-heading);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--clr-white);
    margin-bottom: 16px;
  }

  .genre-dropdown {
    position: relative;
  }

  .genre-select {
    width: 100%;
    max-width: 300px;
    padding: 12px 40px 12px 16px;
    background-color: var(--clr-gray-dark);
    border: 2px solid var(--clr-gray-medium);
    border-radius: 8px;
    color: var(--clr-white);
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-family-primary);
    cursor: pointer;
    transition: var(--transition-default);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999999' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;

    &:hover {
      border-color: var(--clr-gray-light);
      background-color: var(--clr-gray-medium);
    }

    &:focus {
      outline: none;
      border-color: var(--clr-white);
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }

    option {
      background-color: var(--clr-gray-dark);
      color: var(--clr-white);
      padding: 12px;
    }

    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
  }
`;