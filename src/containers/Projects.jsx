import React from 'react';
import { Icon } from '@iconify/react';
import { projects } from "../portfolio";
import {
    Container,
    Row,
} from "reactstrap";
import ProjectsCard from "../components/ProjectsCard";
import { motion } from "framer-motion";

const Projects = () => {
    return ( 
        <section className="section section-lg">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
              <div className="d-flex p-4">
                    <div>
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                        <Icon icon="simple-icons:github" className="text-info" style={{ fontSize: '2rem' }} />
                        </div>
                    </div>
                    <div className="pl-4">
                        <h4 className="display-3 text-info">Projects</h4>
                    </div>
                </div>
                <Row className="row-grid align-items-center">
                    {
                        projects.map((data, i) => {
                            return <ProjectsCard key={i} data={data} />
                        })
                    }
                </Row>
              </motion.div>
            </Container>
          </section>
     );
}
 
export default Projects;
