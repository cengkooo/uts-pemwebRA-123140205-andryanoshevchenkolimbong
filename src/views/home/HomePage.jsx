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
import { useState, useEffect } from "react";
import { fetchAsyncGames } from "../../redux/utils/gameUtils";
import { fetchAsyncGenres } from "../../redux/utils/genreUtils";
import { STATUS } from "../../utils/status";
import { GameList } from "../../components/game/index";
import { Link, useNavigate } from "react-router-dom";

// Platform constants
const PLATFORMS = [
  { id: 4, label: "PC" },
  { id: 187, label: "PlayStation" },
  { id: 1, label: "Xbox" },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const games = useSelector(selectAllGames);
  const gamesStatus = useSelector(selectAllGamesStatus);
  const gamesError = useSelector(selectGamesError);
  const genres = useSelector(selectAllGenres);
  const genresStatus = useSelector(selectAllGenresStatus);
  
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    // Fetch popular games (tanpa filter platform)
    dispatch(fetchAsyncGames({ 
      page: 1, 
      pageSize: 9,
      ordering: '-rating'
    }));

    // Fetch genres with platform filter
    const params = { page: 1 };
    if (selectedPlatforms.length > 0) {
      params.platforms = selectedPlatforms.join(',');
    }
    dispatch(fetchAsyncGenres(params));
  }, [dispatch, selectedPlatforms]);

  const handleSearch = (query) => {
    navigate(`/games?search=${query}`);
  };

  const handlePlatformChange = (platformId) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

  const handleClearPlatformFilter = () => {
    setSelectedPlatforms([]);
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

      {/* Featured Games Section */}
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

      {/* Top Genres Section with Platform Filter */}
      <section className="section sc-genres">
        <div className='container'>
          <Title
            titleName={{ firstText: "Top", secondText: "Genres" }}
          />

          {/* Platform Filter Panel */}
          <div className='platform-filter-panel'>
            <div className='filter-header'>
              <span className='filter-icon'>⚙</span>
              <h3 className='filter-title'>PLATFORMS</h3>
            </div>
            
            <div className='filter-options'>
              {PLATFORMS.map(({ id, label }) => (
                <label key={id} className='filter-label'>
                  <input
                    type='checkbox'
                    checked={selectedPlatforms.includes(id)}
                    onChange={() => handlePlatformChange(id)}
                    className='filter-checkbox'
                  />
                  <span className='filter-text'>{label}</span>
                </label>
              ))}
            </div>

            {selectedPlatforms.length > 0 && (
              <button 
                className='clear-platform-btn'
                onClick={handleClearPlatformFilter}
              >
                CLEAR PLATFORM FILTER
              </button>
            )}
          </div>

          {/* Genres Tabs */}
          {genresStatus === STATUS.LOADING ? (
            <Preloader />
          ) : genres?.length > 0 ? (
            <Tabs data={genres} />
          ) : (
            <div className="no-genres text-white text-center">
              <p>No genres found with selected platform!</p>
              {selectedPlatforms.length > 0 && (
                <button 
                  className="section-btn mt-4"
                  onClick={handleClearPlatformFilter}
                >
                  Show All Genres
                </button>
              )}
            </div>
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

    /* Platform Filter Panel */
    .platform-filter-panel {
      background-color: var(--clr-gray-dark);
      border: 1px solid var(--clr-gray-medium);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 40px;
      transition: var(--transition-default);

      &:hover {
        border-color: var(--clr-gray-light);
      }
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
      font-size: 16px;
      font-weight: 600;
      color: var(--clr-white);
      letter-spacing: 0.1em;
      margin: 0;
    }

    .filter-options {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
    }

    .filter-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 10px 18px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--clr-gray-medium);
      transition: var(--transition-default);

      &:hover {
        border-color: var(--clr-white);
        background-color: rgba(255, 255, 255, 0.05);
      }
    }

    .filter-checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      border-radius: 4px;
      accent-color: var(--clr-white);
      transition: var(--transition-default);

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
      letter-spacing: 0.02em;
    }

    .clear-platform-btn {
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

    .no-genres {
      padding: 60px 20px;
      
      p {
        font-size: 18px;
        margin-bottom: 20px;
        color: var(--clr-gray-lighter);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .sc-genres {
      .platform-filter-panel {
        padding: 16px;
      }

      .filter-options {
        flex-direction: column;
      }

      .filter-label {
        width: 100%;
      }
    }
  }
`;