import React from "react";
import { Icon } from '@iconify/react';
import { feedbacks } from "../portfolio";
import { Col, Container, Fade, Row } from "reactstrap";
import FeedbackCard from "../components/FeedbackCard";
const Feedbacks = () => {
	return (
		<section className="section section-lg">
			<Container>
				<Fade in={true} timeout={1000}>
					<div className="d-flex p-4">
						<div>
							<div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
								<Icon icon="simple-icons:trustpilot" className="text-info" style={{ fontSize: '2rem' }} />
							</div>
						</div>
						<div className="pl-4">
							<h4 className="display-3 text-info">
								Personal Recommendations
							</h4>
						</div>
					</div>
					<Row className="row-grid align-items-center">
						{feedbacks.map((data, i) => {
							return (
								<Col key={i} lg={6}>
									<FeedbackCard data={data} />
								</Col>
							);
						})}
					</Row>
				</Fade>
			</Container>
		</section>
	);
};

export default Feedbacks;
