import React from 'react';

import {  Button } from "reactstrap";

import { socialLinks } from "../portfolio";

const SocialLinks = () => {
    return (
        <div className="btn-wrapper text-lg">
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="github"
                  href={socialLinks.github}
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-github" />
                  </span>
                </Button>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="twitter"
                  href={socialLinks.linkedin}
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-linkedin" />
                  </span>
                </Button>
        </div>
     );
}

export default SocialLinks;