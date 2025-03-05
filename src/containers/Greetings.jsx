import React from "react";
import { greetings } from "../portfolio";
// Updated animation import with correct path structure
import code from '../assets/animations/lottie/development/dev-coding.json';
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col } from "reactstrap";
import { FaDownload } from 'react-icons/fa';
import Button from "../components/ui/Button";
import GreetingLottie from "../components/DisplayLottie";
import SocialLinks from "../components/SocialLinks";

// Import hero section styles
import "../assets/css/hero-section.css";

const Greetings = () => {
  return ( 
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.1
        }}
        exit={{ opacity: 0, y: -20 }}
      >
        <main role="main">
          <div className="position-relative">
            <section 
              id="greetings"
              className="section section-lg section-shaped pb-250 hero-section"
              aria-label="Introduction"
            >
              <div className="shape shape-style-1 bg-gradient-info">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white" tabIndex="0">
                        {greetings.title}
                      </h1>
                      <p className="lead text-white" tabIndex="0">
                        {greetings.description}
                      </p>
                      <div className="hero-action-container">
                        <Button
                          className="resume-download-btn"
                          variant="light"
                          size="lg"
                          href={greetings.resumeLink}
                          ariaLabel="Download my resume"
                        >
                          <span className="btn-icon-left">
                            <FaDownload aria-hidden="true" />
                          </span>
                          Download Resume
                        </Button>
                        <SocialLinks />
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="lottie-container">
                        <GreetingLottie animationData={code}/>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
   );
}
 
export default Greetings;
