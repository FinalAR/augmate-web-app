import authentication from "../../assets/images/CMS/image_2023_12_06T14_24_47_187Z-modified.png";
import dashboard from "../../assets/images/CMS/image_2023_12_06T14_25_32_863Z-modified.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../../assets/images/img/arrow1.svg";
import arrow2 from "../../assets/images/img/arrow2.svg";
import colorSharp from "../../assets/images/img/color-sharp.png"
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const isAutherized = useSelector((state) => state.data.user.isAuthorized);
  const navigate = useNavigate()

  const handleOnExploreClick = () => {
    if (isAutherized) {
      <Navigate to='/starter' />
    } else {
      <Navigate to='/auth' />
    }
  }

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Content Managment Overview</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br></br> Lorem Ipsum has been the industry's standard dummy text.</p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                <div className="item">
                  <img src={authentication} alt="Image" />
                  <h5>Authentication</h5>
                </div>
                <div className="item">
                  <img src={dashboard} alt="Image" />
                  <h5>Dashboard</h5>
                </div>
                <div className="item">
                  <img src={authentication} alt="Image" />
                  <h5>Mapping</h5>
                </div>
                <div className="item">
                  <img src={dashboard} alt="Image" />
                  <h5>Profile</h5>
                </div>
              </Carousel>
              <span className="banner-btn-container">
                <button onClick={handleOnExploreClick}><span>Get Started</span></button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
