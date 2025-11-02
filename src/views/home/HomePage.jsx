import styled from "styled-components";
import {
  Banner,
  Preloader,
  Title,
  SearchBar,
  PlatformFilter,
  SortFilter,
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
import { useState, useEffect, useMemo } from "react";
import { fetchAsyncGames } from "../../redux/utils/gameUtils";
import { fetchAsyncGenres } from "../../redux/utils/genreUtils";
import { STATUS } from "../../utils/status";
import { GameList } from "../../components/game/index";
import { Link, useNavigate } from "react-router-dom";
import { GenreItem } from "../../components/genre";

// Sort options reference for display
const SORT_OPTIONS = [
  { value: '-rating', label: 'Rating: High to Low' },
  { value: 'rating', label: 'Rating: Low to High' },
  { value: '-released', label: 'Newest First' },
  { value: 'released', label: 'Oldest First' },
  { value: 'name', label: 'Name: A-Z' },
  { value: '-name', label: 'Name: Z-A' }
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
  const [selectedSort, setSelectedSort] = useState('-rating');
  const [activeGenreTab, setActiveGenreTab] = useState(null);
  const [genreGames, setGenreGames] = useState({});
  const [loadingGenreGames, setLoadingGenreGames] = useState(false);

  // Fetch featured games (no filters)
  useEffect(() => {
    dispatch(fetchAsyncGames({ 
      page: 1, 
      pageSize: 9,
      ordering: '-rating'
    }));
  }, [dispatch]);

  // Fetch all genres (without filters - genres endpoint doesn't support filtering)
  useEffect(() => {
    dispatch(fetchAsyncGenres({ page: 1 }));
  }, [dispatch]);

  // Set active tab when genres are loaded
  useEffect(() => {
    if (genres && genres.length > 0 && !activeGenreTab) {
      setActiveGenreTab(genres[0]);
    }
  }, [genres, activeGenreTab]);

  // Fetch games for active genre with filters
  useEffect(() => {
    if (!activeGenreTab) return;

    const fetchGenreGames = async () => {
      const cacheKey = `${activeGenreTab.id}-${selectedPlatforms.join(',')}-${selectedSort}`;
      
      // Check if already cached
      if (genreGames[cacheKey]) {
        return;
      }

      setLoadingGenreGames(true);
      
      try {
        const params = {
          genres: activeGenreTab.id,
          ordering: selectedSort,
          page_size: 6
        };

        if (selectedPlatforms.length > 0) {
          params.platforms = selectedPlatforms.join(',');
        }

        const response = await dispatch(fetchAsyncGames(params)).unwrap();
        
        setGenreGames(prev => ({
          ...prev,
          [cacheKey]: response.results || []
        }));
      } catch (error) {
        console.error('Error fetching genre games:', error);
        setGenreGames(prev => ({
          ...prev,
          [cacheKey]: []
        }));
      } finally {
        setLoadingGenreGames(false);
      }
    };

    fetchGenreGames();
  }, [activeGenreTab, selectedPlatforms, selectedSort, dispatch, genreGames]);

  const handleSearch = (query) => {
    navigate(`/games?search=${query}`);
  };

  const handlePlatformChange = (platforms) => {
    setSelectedPlatforms(platforms);
    // Clear cache when filters change
    setGenreGames({});
  };

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
    // Clear cache when filters change
    setGenreGames({});
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedSort('-rating');
    setGenreGames({});
  };

  const handleGenreTabClick = (genre) => {
    setActiveGenreTab(genre);
  };

  const hasActiveFilters = selectedPlatforms.length > 0 || selectedSort !== '-rating';

  const getActiveFilterNames = () => {
    const filters = [];
    if (selectedPlatforms.length > 0) {
      const platformNames = {
        '4': 'PC',
        '187': 'PlayStation',
        '1': 'Xbox'
      };
      const names = selectedPlatforms.map(id => platformNames[id]).filter(Boolean);
      filters.push(`Platforms: ${names.join(', ')}`);
    }
    if (selectedSort !== '-rating') {
      const sortLabel = SORT_OPTIONS.find(s => s.value === selectedSort)?.label;
      if (sortLabel) filters.push(`Sort: ${sortLabel}`);
    }
    return filters;
  };

  // Get current genre games
  const currentGenreGames = useMemo(() => {
    if (!activeGenreTab) return [];
    const cacheKey = `${activeGenreTab.id}-${selectedPlatforms.join(',')}-${selectedSort}`;
    return genreGames[cacheKey] || [];
  }, [activeGenreTab, selectedPlatforms, selectedSort, genreGames]);

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

      {/* Top Genres Section with Filters */}
      <section className="section sc-genres">
        <div className='container'>
          <Title
            titleName={{ firstText: "Top", secondText: "Genres" }}
          />

          {/* Filter Panel */}
          <div className='filter-panel'>
            <div className='filter-row'>
              <div className='filter-col'>
                <PlatformFilter 
                  selectedPlatforms={selectedPlatforms}
                  onPlatformChange={handlePlatformChange}
                />
              </div>

              <div className='filter-col'>
                <SortFilter 
                  selectedSort={selectedSort}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className='active-filters'>
                <div className='active-filters-content'>
                  <span className='active-filters-label'>ACTIVE FILTERS:</span>
                  <div className='active-filters-tags'>
                    {getActiveFilterNames().map((filter, index) => (
                      <span key={index} className='filter-tag'>
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  className='clear-filters-btn'
                  onClick={handleClearFilters}
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            )}
          </div>

          {/* Genres Tabs */}
          {genresStatus === STATUS.LOADING ? (
            <Preloader />
          ) : genres?.length > 0 ? (
            <div className='genres-tabs-wrapper bg-white'>
              <div className='genres-sidebar'>
                <ul className='genre-list'>
                  {genres.map(genre => (
                    <li 
                      key={genre.id} 
                      className={`genre-item ${activeGenreTab?.id === genre.id ? 'active' : ''}`}
                    >
                      <button 
                        className='genre-button text-white' 
                        type="button" 
                        onClick={() => handleGenreTabClick(genre)}
                      >
                        {genre.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='genres-content'>
                {loadingGenreGames ? (
                  <div className='loading-state'>
                    <Preloader />
                  </div>
                ) : currentGenreGames.length > 0 ? (
                  <div className='card-list'>
                    {currentGenreGames.map(game => (
                      <GenreItem key={game.id} gameItem={game} />
                    ))}
                  </div>
                ) : (
                  <div className='no-games-message text-white text-center'>
                    <p>
                      {hasActiveFilters 
                        ? 'No games found for this genre with selected filters.'
                        : 'No games available for this genre.'}
                    </p>
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
          ) : (
            <div className="no-genres text-white text-center">
              <p>No genres available.</p>
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

    .filter-panel {
      background-color: var(--clr-gray-dark);
      border: 1px solid var(--clr-gray-medium);
      border-radius: 12px;
      padding: 32px;
      margin-bottom: 40px;
      transition: var(--transition-default);

      &:hover {
        border-color: var(--clr-gray-light);
      }
    }

    .filter-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      align-items: start;

      @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    .filter-col {
      min-width: 0;
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

    .genres-tabs-wrapper {
      position: relative;
      min-height: 800px;
      background-color: var(--clr-black);
      display: grid;
      grid-template-columns: 240px 1fr;

      @media screen and (max-width: 1280px) {
        grid-template-columns: 1fr;
      }
    }

    .genres-sidebar {
      background-color: var(--clr-gray-dark);
      border-right: 1px solid var(--clr-gray-medium);
      padding: 20px 0;
      max-height: 800px;
      overflow-y: auto;

      @media screen and (max-width: 1280px) {
        max-height: none;
        border-right: none;
        border-bottom: 1px solid var(--clr-gray-medium);
      }
    }

    .genre-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .genre-item {
      .genre-button {
        padding: 16px 30px;
        font-family: var(--font-family-primary);
        font-weight: 500;
        font-size: 15px;
        letter-spacing: 0.05em;
        width: 100%;
        text-align: start;
        transition: var(--transition-default);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: transparent;
        border: none;
        cursor: pointer;
      }

      &:hover:not(.active) {
        background-color: var(--clr-gray-medium);
      }

      &.active {
        background-color: var(--clr-white);
        .genre-button {
          color: var(--clr-black);
        }
      }
    }

    .genres-content {
      padding: 20px;
      min-height: 600px;
    }

    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }

    .no-games-message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 60px 20px;

      p {
        font-size: 16px;
        color: var(--clr-gray-lightest);
        margin-bottom: 20px;
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
      .filter-panel {
        padding: 16px;
      }

      .active-filters {
        flex-direction: column;
        align-items: flex-start;

        .clear-filters-btn {
          width: 100%;
        }
      }

      .genres-tabs-wrapper {
        min-height: 600px;
      }
    }
  }
`;