import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsStar, BsStarFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

const GameItem = ({ gameItem }) => {
  // Format rating to show stars
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<BsStarFill key={i} />);
      } else {
        stars.push(<BsStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <GameItemWrapper className='card'>
      <Link to={`/games/${gameItem?.id}`} className='card-link'>
        <div className='card-image'>
          <img src={gameItem?.background_image} alt={gameItem?.name} />
          <div className='card-overlay'>
            <span className='view-details'>View Details</span>
          </div>
        </div>
        
        <div className='card-content'>
          <div className='card-rating'>
            <div className='rating-stars'>
              {renderRating(gameItem?.rating || 0)}
            </div>
            <span className='rating-value'>{gameItem?.rating?.toFixed(1) || 'N/A'}</span>
          </div>
          
          <h3 className='card-title'>{gameItem?.name}</h3>
          
          <div className='card-meta'>
            <span className='meta-item'>
              {gameItem?.released || 'TBA'}
            </span>
            <span className='meta-divider'>•</span>
            <span className='meta-item'>
              {gameItem?.ratings_count || 0} ratings
            </span>
          </div>
        </div>
      </Link>
    </GameItemWrapper>
  )
}

export default GameItem;

GameItem.propTypes = {
  gameItem: PropTypes.object
}

const GameItemWrapper = styled.div`
  background-color: var(--clr-gray-dark);
  border: 1px solid var(--clr-gray-medium);
  transition: var(--transition-default);
  overflow: hidden;

  &:hover {
    border-color: var(--clr-gray-light);
    transform: translateY(-4px);
  }

  .card-link {
    display: block;
    color: inherit;
  }

  .card-image {
    position: relative;
    height: 280px;
    overflow: hidden;
    background-color: var(--clr-gray-medium);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-default);
    }

    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(0, 0, 0, 0.8) 100%
      );
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      transition: var(--transition-default);

      .view-details {
        color: var(--clr-white);
        font-weight: 600;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        padding: 12px 24px;
        border: 2px solid var(--clr-white);
        background-color: transparent;
        transition: var(--transition-default);
      }
    }
  }

  &:hover {
    .card-image {
      img {
        transform: scale(1.05);
      }

      .card-overlay {
        opacity: 1;

        .view-details {
          background-color: var(--clr-white);
          color: var(--clr-black);
        }
      }
    }
  }

  .card-content {
    padding: 24px;
  }

  .card-rating {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    .rating-stars {
      display: flex;
      gap: 4px;
      color: var(--clr-gray-lighter);
      font-size: 14px;

      svg {
        fill: currentColor;
      }
    }

    .rating-value {
      font-weight: 600;
      font-size: 14px;
      color: var(--clr-white);
    }
  }

  .card-title {
    font-family: var(--font-family-heading);
    font-size: 18px;
    font-weight: 600;
    color: var(--clr-white);
    margin-bottom: 12px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--clr-gray-lighter);

    .meta-divider {
      opacity: 0.5;
    }
  }
`;