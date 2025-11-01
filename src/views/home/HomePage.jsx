import styled from "styled-components";
import {
  Banner,
  Preloader,
  Title,
  Tabs,
  SearchBar,
} from "../../components/common/index";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllGames,
  selectAllGamesStatus,
  selectGamesError
} from "../../redux/store/gameSlice";
import {
  selectAllGenres,
  selectAllGenresStatus
} from "../../redux/store/genreSlice";
import { useEffect } from "react";
import { fetchAsyncGames } from "../../redux/utils/gameUtils";
import { fetchAsyncGenres } from "../../redux/utils/genreUtils";
import { STATUS } from "../../utils/status";
import { GameList } from "../../components/game/index";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const games = useSelector(selectAllGames);
  const gamesStatus = useSelector(selectAllGamesStatus);
  const gamesError = useSelector(selectGamesError);
  const genres = useSelector(selectAllGenres);
  const genresStatus = useSelector(selectAllGenresStatus);

  useEffect(() => {
    // Fetch popular games
    dispatch(fetchAsyncGames({ 
      page: 1, 
      pageSize: 9,
      ordering: '-rating'
    }));

    // Fetch genres
    dispatch(fetchAsyncGenres());
  }, [dispatch]);

  const handleSearch = (query) => {
    // Navigate to games page with search query
    navigate(`/games?search=${query}`);
  };

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

      {/* Search Section */}
      <section className="section sc-search">
        <div className='container'>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <section className="section sc-popular">
        <div className='bg-overlay'></div>
        <div className='container'>
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

      {/* Genres Section */}
      <section className="section sc-genres">
        <div className='container'>
          <Title
            titleName={{ firstText: "Top", secondText: "Genres" }}
          />
          {genresStatus === STATUS.LOADING ? (
            <Preloader />
          ) : genres?.length > 0 ? (
            <Tabs data={genres} />
          ) : (
            <p className="text-white text-center">No genres found!</p>
          )}
        </div>
      </section>
    </HomeWrapper>
  );
};

export default HomePage;

const HomeWrapper = styled.div`
  background-color: var(--clr-black);

  .sc-search {
    background-color: var(--clr-black);
    padding-top: 80px;
    padding-bottom: 40px;
  }

  .sc-popular {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.9) 100%),
                url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920') center/cover no-repeat fixed;
    min-height: 60vh;
    padding-top: 100px;
    padding-bottom: 100px;
    position: relative;
    
    .bg-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .container {
      position: relative;
      z-index: 2;
    }
    
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

  .sc-genres {
    background-color: var(--clr-black);
    padding-top: 0;
    padding-bottom: 100px;
  }
`;