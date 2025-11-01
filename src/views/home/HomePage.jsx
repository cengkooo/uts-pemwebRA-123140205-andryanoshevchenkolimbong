import styled from "styled-components";
import {
  Banner,
  Preloader,
  Title,
} from "../../components/common/index";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllGames,
  selectAllGamesStatus,
  selectGamesError
} from "../../redux/store/gameSlice";
import { useEffect } from "react";
import { fetchAsyncGames } from "../../redux/utils/gameUtils";
import { STATUS } from "../../utils/status";
import { GameList } from "../../components/game/index";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const gamesStatus = useSelector(selectAllGamesStatus);
  const gamesError = useSelector(selectGamesError);

  useEffect(() => {
    // Fetch popular games (default ordering by rating)
    dispatch(fetchAsyncGames({ 
      page: 1, 
      pageSize: 9,
      ordering: '-rating'
    }));
  }, [dispatch]);

  const renderedPopularGames = (
    <>
      <GameList sliceValue={9} games={games} />
      <div className="d-flex justify-content-center">
        <Link to="/games" className="section-btn">
          View All Games
        </Link>
      </div>
    </>
  );

  return (
    <HomeWrapper>
      <Banner />

      <section className="section sc-popular">
        <div className="container">
          <Title
            titleName={{ firstText: "Featured", secondText: "Games" }}
          />
          {gamesStatus === STATUS.LOADING ? (
            <Preloader />
          ) : gamesStatus === STATUS.FAILED ? (
            <div className="error-message text-white text-center">
              <p>Failed to load games: {gamesError}</p>
              <button 
                className="section-btn mt-4"
                onClick={() => dispatch(fetchAsyncGames({ page: 1, pageSize: 9, ordering: '-rating' }))}
              >
                Retry
              </button>
            </div>
          ) : games?.length > 0 ? (
            renderedPopularGames
          ) : (
            <p className="text-white text-center">No games found!</p>
          )}
        </div>
      </section>
    </HomeWrapper>
  );
};

export default HomePage;

const HomeWrapper = styled.div`
  background-color: var(--clr-black);

  .sc-popular {
    background-color: var(--clr-black);
    min-height: 60vh;
    padding-top: 100px;
    padding-bottom: 100px;
    
    .section-btn {
      margin-top: 60px;
    }

    .error-message {
      padding: 60px 20px;
      
      p {
        font-size: 18px;
        margin-bottom: 20px;
        color: var(--clr-gray-lighter);
      }
    }
  }
`;