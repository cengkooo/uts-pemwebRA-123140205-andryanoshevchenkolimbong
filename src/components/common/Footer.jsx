import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterWrapper>
      <div className='footer-content'>
        <div className='container'>
          <div className='footer-grid'>
            <div className='footer-column'>
              <Link to="/" className='footer-brand text-white text-uppercase'>
                &#x1F411; Peternak Domba &#x1F411;
              </Link>
              <p className='footer-description'>
                Enter the world where games and dreams collide.
              </p>
            </div>

            <div className='footer-column'>
              <h4 className='footer-title'>Navigation</h4>
              <ul className='footer-links'>
                <li><Link to="/" className='footer-link'>Home</Link></li>
                <li><Link to="/games" className='footer-link'>All Games</Link></li>
              </ul>
            </div>

            <div className='footer-column'>
              <h4 className='footer-title'>Information</h4>
              <ul className='footer-links'>
                <li><a href="https://rawg.io/apidocs" target='blank'>About</a></li>
                <li><a href="https://github.com/cengkooo">Contact</a></li>
                <li><a href="https://rawg.io/apidocs#terms" target='blank'>Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className='footer-bottom'>
            <p className='copyright'>© Peternak Domba - Andryano Shevchenko Limbong - 123140205.</p>
            <p className='powered-by'>Powered by RAWG API</p>
          </div>
        </div>
      </div>
    </FooterWrapper>
  )
}

export default Footer;

const FooterWrapper = styled.footer`
  background-color: var(--clr-gray-darkest);
  border-top: 1px solid var(--clr-gray-medium);
  color: var(--clr-gray-lighter);

  .footer-content {
    padding: 60px 0 30px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 60px;
    margin-bottom: 60px;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  .footer-column {
    .footer-brand {
      font-weight: 700;
      font-size: 24px;
      letter-spacing: 0.05em;
      font-family: var(--font-family-heading);
      display: inline-block;
      margin-bottom: 16px;
      transition: var(--transition-default);

      &:hover {
        opacity: 0.8;
      }
    }

    .footer-description {
      font-size: 14px;
      line-height: 1.7;
      color: var(--clr-gray-lighter);
      max-width: 320px;
    }
  }

  .footer-title {
    font-family: var(--font-family-heading);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--clr-white);
    margin-bottom: 20px;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .footer-link {
      color: var(--clr-gray-lighter);
      font-size: 14px;
      transition: var(--transition-default);
      display: inline-block;

      &:hover {
        color: var(--clr-white);
        transform: translateX(4px);
      }
    }
  }

  .footer-bottom {
    padding-top: 30px;
    border-top: 1px solid var(--clr-gray-medium);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }

    p {
      font-size: 13px;
      color: var(--clr-gray-lighter);
      margin: 0;
    }

    .powered-by {
      font-weight: 500;
    }
  }
`;