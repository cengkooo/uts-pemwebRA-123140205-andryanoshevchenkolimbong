import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  selectAllGames, 
  selectAllGamesStatus, 
  selectGamesNextPage, 
  selectGamesPrevPage,
  selectGamesError 
} from '../../redux/store/gameSlice';
import {
  selectAllGenres,
  selectAllGenresStatus
} from '../../redux/store/genreSlice';
import { useEffect, useState } from 'react';
import { fetchAsyncGames } from '../../redux/utils/gameUtils';
import { fetchAsyncGenres } from '../../redux/utils/genreUtils';
import { Pagination, Preloader, Title, SearchBar } from '../../components/common';
import { STATUS } from '../../utils/status';
import { GameList } from '../../components/game';
import PlatformFilter from '../../components/common/PlatformFilter';
import GenreFilter from '../../components/common/GenreFilter';

const GameAllPage = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const gamesStatus = useSelector(selectAllGamesStatus);
  const gamesError = useSelector(selectGamesError);
  const genres = useSelector(selectAllGenres);
  const genresStatus = useSelector(selectAllGenresStatus);
  const nextPage = useSelector(selectGamesNextPage);
  const prevPage = useSelector(selectGamesPrevPage);
  
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Fetch genres on mount
  useEffect(() => {
    dispatch(fetchAsyncGenres());
  }, [dispatch]);

  // Fetch games when filters change
  useEffect(() => {
    const params = {
      page,
      search: searchQuery
    };

    if (selectedPlatforms.length > 0) {
      params.platforms = selectedPlatforms.join(',');
    }

    if (selectedGenre) {
      params.genres = selectedGenre;
    }

    dispatch(fetchAsyncGames(params));
  }, [dispatch, page, searchQuery, selectedPlatforms, selectedGenre]);

  const pageHandler = (pageValue) => setPage(pageValue);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePlatformChange = (platforms) => {
    setSelectedPlatforms(platforms);
    setPage(1);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPlatforms([]);
    setSelectedGenre('');
    setPage(1);
  };

  const hasActiveFilters = searchQuery || selectedPlatforms.length > 0 || selectedGenre;

  return (
    <GameAllPageWrapper>
      <div className='sc-games section'>
        <div className='container'>
          <Title titleName={{
            firstText: "all",
            secondText: "games"
          }} />

          <SearchBar onSearch={handleSearch} />

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-grid">
              <PlatformFilter 
                selectedPlatforms={selectedPlatforms}
                onPlatformChange={handlePlatformChange}
              />
              
              {genresStatus === STATUS.SUCCEEDED && genres?.length > 0 && (
                <GenreFilter 
                  genres={genres}
                  selectedGenre={selectedGenre}
                  onGenreChange={handleGenreChange}
                />
              )}
            </div>

            {hasActiveFilters && (
              <div className="active-filters">
                <p className="text-white">
                  Active filters applied
                  <button 
                    className="clear-filters-btn ms-3"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Results */}
          {gamesStatus === STATUS.LOADING ? (
            <Preloader />
          ) : gamesStatus === STATUS.FAILED ? (
            <div className="error-message text-white text-center">
              <p>Failed to load games: {gamesError}</p>
              <button 
                className="section-btn mt-4"
                onClick={() => dispatch(fetchAsyncGames({ 
                  page, 
                  search: searchQuery,
                  platforms: selectedPlatforms.join(','),
                  genres: selectedGenre
                }))}
              >
                Retry
              </button>
            </div>
          ) : games?.length > 0 ? (
            <>
              <GameList games={games} />
              <Pagination 
                pageHandler={pageHandler} 
                nextPage={nextPage} 
                prevPage={prevPage} 
                currentPage={page} 
              />
            </>
          ) : (
            <div className="no-results text-white text-center">
              <p>No games found with the selected filters!</p>
              {hasActiveFilters && (
                <button 
                  className="section-btn mt-4"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </GameAllPageWrapper>
  )
}

export default GameAllPage;

const GameAllPageWrapper = styled.div`
  background-color: var(--clr-violet-dark-active);

  .sc-games {
    min-height: 100vh;
    padding-top: 65px;

    .filters-section {
      margin-bottom: 60px;
      padding: 32px;
      background-color: var(--clr-gray-darkest);
      border: 1px solid var(--clr-gray-medium);
      border-radius: 12px;
    }

    .filters-grid {
      display: grid;
      gap: 32px;

      @media screen and (min-width: 992px) {
        grid-template-columns: 2fr 1fr;
        align-items: start;
      }
    }

    .active-filters {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--clr-gray-medium);
      
      p {
        font-size: 14px;
        color: var(--clr-gray-lighter);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
      }

      .clear-filters-btn {
        background-color: transparent;
        color: var(--clr-white);
        border: 1px solid var(--clr-gray-light);
        padding: 8px 20px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        transition: var(--transition-default);
        
        &:hover {
          background-color: var(--clr-white);
          color: var(--clr-black);
          border-color: var(--clr-white);
        }
      }
    }

    .error-message,
    .no-results {
      padding: 60px 20px;
      
      p {
        font-size: 18px;
        margin-bottom: 20px;
        color: var(--clr-gray-lighter);
      }
    }
  }
`;