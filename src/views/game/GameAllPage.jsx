import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  selectAllGames, 
  selectAllGamesStatus, 
  selectGamesNextPage, 
  selectGamesPrevPage,
  selectGamesError 
} from '../../redux/store/gameSlice';
import { useEffect, useState } from 'react';
import { fetchAsyncGames } from '../../redux/utils/gameUtils';
import { Pagination, Preloader, Title, SearchBar } from '../../components/common';
import { STATUS } from '../../utils/status';
import { GameList } from '../../components/game';

// Platform IDs - Simple version
const PLATFORMS = [
  { id: 4, label: "PC" },
  { id: 187, label: "PlayStation" },
  { id: 1, label: "Xbox" },
];

const GameAllPage = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const gamesStatus = useSelector(selectAllGamesStatus);
  const gamesError = useSelector(selectGamesError);
  const nextPage = useSelector(selectGamesNextPage);
  const prevPage = useSelector(selectGamesPrevPage);
  
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // Fetch games when filters change
  useEffect(() => {
    const params = { 
      page,
      pageSize: 20
    };

    if (searchQuery.trim()) {
      params.search = searchQuery;
    }

    if (selectedPlatforms.length > 0) {
      params.platforms = selectedPlatforms.join(',');
    }

    dispatch(fetchAsyncGames(params));
  }, [dispatch, page, searchQuery, selectedPlatforms]);

  const pageHandler = (pageValue) => setPage(pageValue);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(1);
  };

  // Platform checkbox handler
  const onPlatformChange = (platformId) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    setSearchQuery('');
    setPage(1);
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

          {/* FILTER PANEL - Inspired by reference code */}
          <div className='filter-panel'>
            <div className='filter-header'>
              <span className='filter-icon'>⚙</span>
              <h2 className='filter-title'>Platforms</h2>
            </div>
            
            <div className='filter-options'>
              {PLATFORMS.map(({ id, label }) => (
                <label key={id} className='filter-label'>
                  <input
                    type='checkbox'
                    checked={selectedPlatforms.includes(id)}
                    onChange={() => onPlatformChange(id)}
                    className='filter-checkbox'
                  />
                  <span className='filter-text'>{label}</span>
                </label>
              ))}
            </div>

            {(selectedPlatforms.length > 0 || searchQuery) && (
              <button 
                className='clear-btn'
                onClick={handleClearFilters}
              >
                CLEAR ALL FILTERS
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedPlatforms.length > 0) && (
            <div className='active-filters'>
              {searchQuery && (
                <span className='filter-tag'>
                  Search: {searchQuery}
                  <button onClick={handleClearSearch}>×</button>
                </span>
              )}
              {selectedPlatforms.length > 0 && (
                <span className='filter-tag'>
                  {selectedPlatforms.map(id => 
                    PLATFORMS.find(p => p.id === id)?.label
                  ).join(', ')}
                  <button onClick={() => setSelectedPlatforms([])}>×</button>
                </span>
              )}
            </div>
          )}

          {/* Games Display */}
          {gamesStatus === STATUS.LOADING ? (
            <Preloader />
          ) : gamesStatus === STATUS.FAILED ? (
            <div className='error-message text-white text-center'>
              <p>Failed to load games: {gamesError}</p>
              <button 
                className='section-btn mt-4'
                onClick={() => dispatch(fetchAsyncGames({ 
                  page, 
                  search: searchQuery,
                  platforms: selectedPlatforms.join(',')
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
            <div className='no-results text-white text-center'>
              <p>No games found!</p>
              {(selectedPlatforms.length > 0 || searchQuery) && (
                <button 
                  className='section-btn mt-4'
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
  );
};

export default GameAllPage;

const GameAllPageWrapper = styled.div`
  background-color: var(--clr-black);

  .sc-games {
    min-height: 100vh;
    padding-top: 65px;

    /* Filter Panel - Inspired by reference */
    .filter-panel {
      background-color: var(--clr-gray-dark);
      border: 1px solid var(--clr-gray-medium);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 40px;
      transition: var(--transition-default);
    }

    .filter-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .filter-icon {
      font-size: 20px;
      color: var(--clr-white);
    }

    .filter-title {
      font-family: var(--font-family-heading);
      font-size: 18px;
      font-weight: 600;
      color: var(--clr-white);
      margin: 0;
    }

    .filter-options {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
    }

    .filter-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid transparent;
      transition: var(--transition-default);

      &:hover {
        border-color: var(--clr-white);
        background-color: rgba(255, 255, 255, 0.05);
      }
    }

    .filter-checkbox {
      width: 16px;
      height: 16px;
      cursor: pointer;
      border-radius: 4px;
      border: 2px solid var(--clr-gray-light);
      background-color: var(--clr-gray-dark);
      transition: var(--transition-default);
      accent-color: var(--clr-white);

      &:focus {
        outline: 2px solid var(--clr-white);
        outline-offset: 2px;
      }
    }

    .filter-text {
      font-size: 14px;
      font-weight: 500;
      color: var(--clr-white);
      user-select: none;
    }

    .clear-btn {
      width: 100%;
      padding: 12px 24px;
      background-color: transparent;
      border: 2px solid var(--clr-gray-light);
      color: var(--clr-white);
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.1em;
      border-radius: 6px;
      cursor: pointer;
      transition: var(--transition-default);
      font-family: var(--font-family-heading);

      &:hover {
        background-color: var(--clr-white);
        color: var(--clr-black);
        border-color: var(--clr-white);
      }
    }

    /* Active Filters */
    .active-filters {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 32px;
      padding: 16px;
      background-color: var(--clr-gray-dark);
      border-radius: 6px;
    }

    .filter-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background-color: var(--clr-gray-medium);
      color: var(--clr-white);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;

      button {
        background: none;
        border: none;
        color: var(--clr-white);
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 4px;
        line-height: 1;
        transition: var(--transition-default);

        &:hover {
          transform: scale(1.2);
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

  @media screen and (max-width: 768px) {
    .filter-options {
      flex-direction: column;
    }

    .filter-panel {
      padding: 16px;
    }
  }
`;