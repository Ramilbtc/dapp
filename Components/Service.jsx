import React from "react";

const Service = () => {
  const services = [
    {
      title: "Secure Storage",
      discription: "11111",
    },
    {
      title: "Mobile App",
      discription: "2222",
    },
    {
      title: "Exchange service",
      discription: "3333",
    },
    {
      title: "Investment project",
      discription: "444",
    },
    {
      title: "Credit card use",
      discription: "5555",
    },
  ];
  return (
    <section id="service" className="small_pb">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div className="title_default-light title_border text-center">
              <h4
                className="animation"
                data-animation="fadeInUp"
                data-animation-delay="0.2s"
              >
                meet our service
              </h4>
            </div>
          </div>
        </div>

        <div className="row">
          {services.map((service, i) => {
            <div key={i + 1} className="col-lg-4 col-md-6 col-sm-12">
              <div className="box_wrap text-center animation"
                data-animation="fadeInUp"
                data-animation-delay={`0.${i + 1}s`}>
                <h4>{service.title}</h4>
                <p>{service.discription}</p>
              </div>
            </div>
          })};
        </div>
      </div>
    </section>
  );
};

export default Service;
