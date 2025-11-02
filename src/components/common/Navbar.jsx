import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebarStatus, setSidebarOff, setSidebarOn } from '../../redux/store/sidebarSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const sidebarStatus = useSelector(selectSidebarStatus);

  return (
    <NavbarWrapper className="d-flex align-items-center">
      <div className='container w-100'>
        <div className='navbar-content'>
          <div className='brand-and-toggler d-flex align-items-center justify-content-between'>
            <Link to="/" className="navbar-brand text-white text-uppercase no-wrap">
            &#x1F411; Peternak Domba &#x1F411;
            </Link>
            <button type='button' className='navbar-show-btn text-white' onClick={() => dispatch(setSidebarOn())}>
              <HiOutlineMenuAlt3 size={25} />
            </button>
          </div>

          <div className={`navbar-collapse ${sidebarStatus ? "show" : ""}`}>
            <button type="button" className='navbar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
              <MdClose size={25} />
            </button>

            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to="/" className='nav-link' onClick={() => dispatch(setSidebarOff())}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/games" className='nav-link' onClick={() => dispatch(setSidebarOff())}>
                  All Games
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  )
}

export default Navbar;

const NavbarWrapper = styled.div`
  min-height: 70px;
  background: var(--clr-black);
  border-bottom: 1px solid var(--clr-gray-medium);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);

  .navbar-brand {
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 0.05em;
    font-family: var(--font-family-heading);
    
    &:hover {
      opacity: 0.8;
    }
  }

  .nav-item {
    padding: 0;
    border-bottom: none;
  }

  .nav-link {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 0.02em;
    color: var(--clr-gray-lightest);
    padding: 8px 0;
    position: relative;
    transition: var(--transition-default);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--clr-white);
      transition: var(--transition-default);
    }

    &:hover {
      color: var(--clr-white);
      
      &::after {
        width: 100%;
      }
    }
  }

  .navbar-collapse {
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100%;
    background-color: var(--clr-gray-dark);
    padding: 80px 30px 30px;
    text-align: left;
    transform: translateX(100%);
    transition: var(--transition-default);
    z-index: 999;
    border-left: 1px solid var(--clr-gray-medium);

    &.show {
      transform: translateX(0);
    }
  }

  .navbar-hide-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    transition: var(--transition-default);
    color: var(--clr-white);
    
    &:hover {
      transform: rotate(90deg);
    }
  }

  .navbar-show-btn {
    transition: var(--transition-default);
    
    &:hover {
      opacity: 0.7;
    }
  }

  @media screen and (min-width: 992px) {
    .navbar-show-btn {
      display: none;
    }
    
    .navbar-collapse {
      transform: translateX(0);
      position: relative;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      background-color: transparent;
      border: none;
    }
    
    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .navbar-nav {
      display: flex;
      gap: 40px;
    }
    
    .navbar-hide-btn {
      display: none;
    }
    
    .nav-link {
      color: var(--clr-gray-lightest);
      padding: 8px 0;
    }
  }
`;