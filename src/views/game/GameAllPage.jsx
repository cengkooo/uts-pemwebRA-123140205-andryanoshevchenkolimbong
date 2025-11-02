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
import SortFilter from '../../components/common/SortFilter';

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
  const [selectedSort, setSelectedSort] = useState('');

  useEffect(() => {
    dispatch(fetchAsyncGenres());
  }, [dispatch]);

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

    if (selectedSort) {
      params.ordering = selectedSort;
    }

    dispatch(fetchAsyncGames(params));
  }, [dispatch, page, searchQuery, selectedPlatforms, selectedGenre, selectedSort]);

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

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPlatforms([]);
    setSelectedGenre('');
    setSelectedSort('');
    setPage(1);
  };

  const hasActiveFilters = searchQuery || selectedPlatforms.length > 0 || selectedGenre || selectedSort;

  const getActiveFilterNames = () => {
    const filters = [];
    if (selectedPlatforms.length > 0) filters.push(`${selectedPlatforms.length} platform(s)`);
    if (selectedGenre) {
      const genre = genres?.find(g => g.id === parseInt(selectedGenre));
      if (genre) filters.push(`Genre: ${genre.name}`);
    }
    if (selectedSort) {
      const sortLabels = {
        '-rating': 'Rating: High to Low',
        'rating': 'Rating: Low to High',
        '-released': 'Newest First',
        'released': 'Oldest First',
        'name': 'Name: A-Z',
        '-name': 'Name: Z-A'
      };
      filters.push(`Sort: ${sortLabels[selectedSort]}`);
    }
    return filters;
  };

  return (
    <GameAllPageWrapper>
      <div className='sc-games section'>
        <div className='container'>
          <Title titleName={{
            firstText: "all",
            secondText: "games"
          }} />

          <SearchBar onSearch={handleSearch} />

          {/* Filters Section - Horizontal Layout */}
          <div className="filters-section">
            <div className="filters-row">
              {/* Platform Filter - Left */}
              <div className="filter-col filter-col-platforms">
                <PlatformFilter 
                  selectedPlatforms={selectedPlatforms}
                  onPlatformChange={handlePlatformChange}
                />
              </div>
              
              {/* Genre & Sort Filters - Right */}
              <div className="filter-col filter-col-side">
                {genresStatus === STATUS.SUCCEEDED && genres?.length > 0 && (
                  <GenreFilter 
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onGenreChange={handleGenreChange}
                  />
                )}
                
                <SortFilter 
                  selectedSort={selectedSort}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="active-filters">
                <div className="active-filters-content">
                  <span className="active-filters-label">ACTIVE FILTERS:</span>
                  <div className="active-filters-tags">
                    {getActiveFilterNames().map((filter, index) => (
                      <span key={index} className="filter-tag">
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  className="clear-filters-btn"
                  onClick={handleClearFilters}
                >
                  CLEAR ALL FILTERS
                </button>
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
                  genres: selectedGenre,
                  ordering: selectedSort
                }))}
              >
                Retry
              </button>
            </div>
          ) : games?.length > 0 ? (
            <>
              <div className="results-count">
                <p className="text-white">
                  Showing {games.length} games
                </p>
              </div>
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
                  Clear All Filters
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
      margin-bottom: 48px;
      padding: 32px;
      background-color: var(--clr-gray-darkest);
      border: 1px solid var(--clr-gray-medium);
      border-radius: 12px;
    }

    .filters-row {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 32px;
      align-items: start;

      @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    .filter-col-platforms {
      min-width: 0; /* Allow shrinking */
    }

    .filter-col-side {
      display: flex;
      gap: 24px;
      align-items: start;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        width: 100%;
      }
    }

    .active-filters {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--clr-gray-medium);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;

      .active-filters-content {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .active-filters-label {
        font-size: 12px;
        font-weight: 700;
        color: var(--clr-gray-lighter);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .active-filters-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .filter-tag {
        display: inline-block;
        background-color: var(--clr-gray-medium);
        border: 1px solid var(--clr-gray-light);
        color: var(--clr-white);
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: 500;
      }

      .clear-filters-btn {
        background-color: transparent;
        color: var(--clr-white);
        border: 1px solid var(--clr-gray-light);
        padding: 8px 20px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        transition: var(--transition-default);
        white-space: nowrap;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        
        &:hover {
          background-color: var(--clr-white);
          color: var(--clr-black);
          border-color: var(--clr-white);
        }
      }
    }

    .results-count {
      margin-bottom: 24px;
      
      p {
        font-size: 14px;
        color: var(--clr-gray-lighter);
        font-weight: 500;
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

  @media screen and (max-width: 1200px) {
    .sc-games {
      .active-filters {
        flex-direction: column;
        align-items: flex-start;

        .clear-filters-btn {
          width: 100%;
        }
      }
    }
  }
`;