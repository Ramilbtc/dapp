import React from "react";
import { BsArrowRight } from "react-icons/bs";

const About = () => {
  return <section id="about" className="small_pt">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="text_md_center">
            <img
              src="assets/images/about_img2.png"
              alt="about"
              data-animation="zoomIn"
              data-animation-delay="0.17s"
              className="animation" />
          </div>
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 res_md_mt_30 res_sm_mt_20">
          <div className="title_default_light title_border">
            <h4
              className="animation"
              data-animation="fadeInUp"
              data-animation-delay="0.17s"
            >
              About the Cryptocash
            </h4>

            <p
              className="animation"
              data-animation="fadeInUp"
              data-animation-delay="0.17s">
              ggggg
            </p>
          </div>

          <a
            href=""
            className="a btn btn-default btn-radius video animation"
            data-animation="fadeInUp"
            data-animation-delay="0.9s">
            let's start <BsArrowRight />
          </a>


        </div>
      </div>
    </div>
  </section>;
};

export default About;
