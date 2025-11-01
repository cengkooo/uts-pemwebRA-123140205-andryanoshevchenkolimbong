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

const GameAllPage = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const gamesStatus = useSelector(selectAllGamesStatus);
  const gamesError = useSelector(selectGamesError);
  const nextPage = useSelector(selectGamesNextPage);
  const prevPage = useSelector(selectGamesPrevPage);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAsyncGames({ 
      page,
      search: searchQuery 
    }));
  }, [dispatch, page, searchQuery]);

  const pageHandler = (pageValue) => setPage(pageValue);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
  };

  const handleClearSearch = () => {
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

          {searchQuery && (
            <div className="search-info text-center mb-4">
              <p className="text-white">
                Searching for: <strong>{searchQuery}</strong>
                <button 
                  className="clear-search-btn ms-3"
                  onClick={handleClearSearch}
                >
                  Clear Search
                </button>
              </p>
            </div>
          )}

          {gamesStatus === STATUS.LOADING ? (
            <Preloader />
          ) : gamesStatus === STATUS.FAILED ? (
            <div className="error-message text-white text-center">
              <p>Failed to load games: {gamesError}</p>
              <button 
                className="section-btn mt-4"
                onClick={() => dispatch(fetchAsyncGames({ page, search: searchQuery }))}
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
              <p>No games found{searchQuery ? ` for "${searchQuery}"` : ''}!</p>
              {searchQuery && (
                <button 
                  className="section-btn mt-4"
                  onClick={handleClearSearch}
                >
                  Show All Games
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

    .search-info {
      margin-bottom: 40px;
      
      p {
        font-size: 16px;
        color: var(--clr-gray-lighter);
        
        strong {
          color: var(--clr-white);
        }
      }

      .clear-search-btn {
        background-color: transparent;
        color: var(--clr-white);
        border: 1px solid var(--clr-gray-light);
        padding: 6px 16px;
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