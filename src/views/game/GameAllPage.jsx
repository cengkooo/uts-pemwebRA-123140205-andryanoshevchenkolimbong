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
import { Pagination, Preloader, Title } from '../../components/common';
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

  useEffect(() => {
    dispatch(fetchAsyncGames({ page }));
  }, [dispatch, page]);

  const pageHandler = (pageValue) => setPage(pageValue);

  return (
    <GameAllPageWrapper>
      <div className='sc-games section'>
        <div className='container'>
          <Title titleName={{
            firstText: "all",
            secondText: "games"
          }} />

          {gamesStatus === STATUS.LOADING ? (
            <Preloader />
          ) : gamesStatus === STATUS.FAILED ? (
            <div className="error-message text-white text-center">
              <p>Failed to load games: {gamesError}</p>
              <button 
                className="section-btn mt-4"
                onClick={() => dispatch(fetchAsyncGames({ page }))}
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
            <p className="text-white text-center">No games found!</p>
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

    .error-message {
      padding: 40px 20px;
      
      p {
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
  }
`;