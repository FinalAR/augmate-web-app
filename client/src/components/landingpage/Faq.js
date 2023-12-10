import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../../assets/images/img/project-img1.png";
import projImg2 from "../../assets/images/img/project-img2.png";
import projImg3 from "../../assets/images/img/project-img3.png";
import projImg from "../../assets/images/img/project-img.png";
import colorSharp2 from "../../assets/images/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Faq = () => {

  const projects = [
    {
      title: "What is Web AR, and how does it work?",
      description: "Web AR, or Web-based Augmented Reality, is a technology that overlays digital content onto the real world through a web browser. Our application leverages this technology to enhance your online experience, seamlessly blending the virtual and physical realms.",
      imgUrl: projImg,
    },
    {
      title: "What devices support your Web AR application?",
      description: "Our Web AR application is compatible with a wide range of devices, including smartphones and tablets. Ensure your device has a modern web browser and camera for the best experience.",
      imgUrl: projImg,
    },
    {
      title: "How can I access dynamic content in the application?",
      description: "Accessing dynamic content is simple. Just explore our Web AR environment, and the application will intelligently link relevant content to real-world targets. It's an intuitive and user-friendly way to interact with augmented reality.",
      imgUrl: projImg,
    },
    {
      title: "Can I create and customize my AR experiences?",
      description: "Absolutely! While the FAQ section covers common queries, our application empowers you to create personalized AR experiences. Dive into the Content Management section to unleash your creativity and tailor AR content to your preferences.",
      imgUrl: projImg,
    },
    {
      title: "Is my privacy secure when using the augmented reality features?",
      description: "Absolutely. We prioritize your privacy and adhere to strict data protection standards. Your personal information is never stored without consent, and any collected data is solely used to enhance your AR experience. Check our Privacy Policy for more details.",
      imgUrl: projImg,
    },
    {
      title: "Is there a tutorial for first-time users?",
      description: "Yes, we provide a comprehensive tutorial to guide first-time users. Check out our Getting Started section for step-by-step instructions on navigating the application, exploring content, and maximizing your Web AR experience.",
      imgUrl: projImg,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Frequently Asked Questions</h2>
                <p>Discover more about our innovative Web AR application through our frequently asked questions. Whether you're curious about the features, compatibility, or how to get started, we've got you covered. Explore the possibilities and dive into the world of augmented reality with ease.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  {/* <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav> */}
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
