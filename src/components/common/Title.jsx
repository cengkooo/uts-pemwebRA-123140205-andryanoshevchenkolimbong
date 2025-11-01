import styled from 'styled-components';
import PropTypes from "prop-types";

const Title = ({ titleName }) => {
  return (
    <TitleWrapper>
      <h2>
        {titleName.firstText} <span>{titleName.secondText}</span>
      </h2>
    </TitleWrapper>
  )
}

export default Title;

Title.propTypes = {
  titleName: PropTypes.object
}

const TitleWrapper = styled.div`
  padding: 0 0 20px;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  
  h2 {
    font-family: var(--font-family-heading);
    font-weight: 700;
    font-size: 42px;
    letter-spacing: -0.02em;
    color: var(--clr-white);
    text-transform: uppercase;
    margin-bottom: 20px;

    span {
      color: var(--clr-gray-lighter);
      font-weight: 300;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background-color: var(--clr-white);
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 32px;
    }
  }
`;