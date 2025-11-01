import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { banner_image } from '../../utils/images';

const Banner = () => {
  return (
    <BannerWrapper className='d-flex align-items-center justify-content-center'>
      <div className='banner-content w-100 container text-white text-center'>
        <div className='banner-badge text-uppercase'>Discover Gaming</div>
        <h1 className='banner-title text-uppercase'>
          Find Your Next
          <br />
          <span>Favorite Game</span>
        </h1>
        <p className='lead-text'>
          Explore thousands of games with detailed information, ratings, and reviews.
          <br />
          Your ultimate gaming database.
        </p>
        <Link to="/games" className='banner-btn text-uppercase'>
          Browse Games
        </Link>
      </div>
    </BannerWrapper>
  )
}

export default Banner;

const BannerWrapper = styled.div`
  min-height: 85vh;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(10, 10, 10, 0.8) 100%), 
              url(${banner_image}) center/cover no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .banner-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
  }

  .banner-badge {
    background-color: transparent;
    border: 1px solid var(--clr-gray-light);
    padding: 8px 24px;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.15em;
    display: inline-block;
    margin-bottom: 40px;
    transition: var(--transition-default);

    &:hover {
      background-color: var(--clr-white);
      color: var(--clr-black);
      border-color: var(--clr-white);
    }
  }

  .banner-title {
    font-family: var(--font-family-heading);
    font-size: 56px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 32px;

    span {
      display: inline-block;
      background: linear-gradient(90deg, var(--clr-white) 0%, var(--clr-gray-lighter) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .lead-text {
    max-width: 600px;
    margin: 0 auto 48px;
    font-size: 17px;
    line-height: 1.7;
  }

  .banner-btn {
    min-width: 180px;
    padding: 16px 40px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background-color: var(--clr-white);
    color: var(--clr-black);
    border: 2px solid var(--clr-white);
    transition: var(--transition-default);
    display: inline-block;
    font-family: var(--font-family-heading);

    &:hover {
      background-color: transparent;
      color: var(--clr-white);
      transform: translateY(-2px);
    }
  }

  @media screen and (max-width: 768px) {
    min-height: 70vh;
    
    .banner-title {
      font-size: 40px;
    }

    .lead-text {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 992px) {
    .banner-title {
      font-size: 72px;
    }
  }
`;