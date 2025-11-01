import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import { AiOutlineMenu } from "react-icons/ai";
import { GenreItem } from '../genre';

const Tabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState(data[0]);
  const [tabButtonStatus, setTabButtonStatus] = useState(false);

  const tabClickHandler = (id) => {
    data.map(item => {
      if(item.id === id){
        setActiveTab(item);
      }
    })
  }

  const tabButtonsHandler = () => setTabButtonStatus(prevStatus => !prevStatus);

  return (
    <TabsWrapper className='bg-white'>
      <div className='container'>
        <div className='tabs-content'>
          <ul className={`tabs-buttons ${tabButtonStatus ? "show" : ""}`}>
            <button type="button" className='tabs-buttons-close bg-white d-flex align-items-center justify-content-center' onClick={ tabButtonsHandler }>
              <AiOutlineMenu size = { 22 } />
            </button>
            {
              data.map(item => {
                return (
                  <li key = {item?.id} className={`tabs-button ${item?.id === activeTab.id ? 'tabs-active' : ""}`}>
                    <button className='text-white' type="button" onClick={() => tabClickHandler(item?.id)}>{ item?.name }</button>
                  </li>
                )
              })
            }
          </ul>

          <div className='tabs-body'>
            <div className='card-list'>
              {
                activeTab?.games?.slice(0, 6).map(item => (
                  <GenreItem key = {item.id} gameItem = { item } />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </TabsWrapper>
  )
}

export default Tabs;

Tabs.propTypes = {
  data: PropTypes.array,
  sliceValue: PropTypes.number
}

const TabsWrapper = styled.div`
  position: relative;
  min-height: 800px;
  background-color: var(--clr-black);

  .tabs-buttons{
    position: absolute;
    left: 0;
    top: 0;
    width: 240px;
    z-index: 99;
    padding-top: 20px;
    padding-bottom: 60px;
    background-color: var(--clr-gray-dark);
    border-right: 1px solid var(--clr-gray-medium);
    transition: var(--transition-default);
    max-height: 100vh;
    overflow-y: auto;

    .tabs-buttons-close{
      position: absolute;
      right: -40px;
      top: 0;
      width: 40px;
      height: 40px;
      display: none;
      background-color: var(--clr-gray-dark);
      border: 1px solid var(--clr-gray-medium);

      &:hover{
        background-color: var(--clr-white);
        color: var(--clr-black);
      }
    }

    @media screen and (max-width: 1280px){
      transform: translateX(-100%);

      .tabs-buttons-close{
        display: flex;
      }

      &.show{
        transform: translateX(0);
      }
    }
  }

  .tabs-button{
    button{
      padding: 16px 30px;
      font-family: var(--font-family-primary);
      font-weight: 500;
      font-size: 15px;
      letter-spacing: 0.05em;
      width: 100%;
      text-align: start;
      transition: var(--transition-default);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    &:hover:not(.tabs-active){
      background-color: var(--clr-gray-medium);
    }
  }

  .tabs-active{
    background-color: var(--clr-white);
    button{
      color: var(--clr-black);
    }
  }

  .tabs-body{
    margin-left: 260px;
    padding: 20px;

    @media screen and (max-width: 1280px){
      margin-left: 0;
    }
  }

  @media screen and (max-width: 768px){
    min-height: 600px;
  }
`;