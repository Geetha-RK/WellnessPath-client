import React from "react";
import "./Home.scss";
import Speciality from "../../components/Speciality/Speciality";
import TopDoctors from "../../components/TopDoctors/TopDoctors";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <div className="scrollContainer"> */}
        <div className="bg-parent"></div>

        <div className="homecontent">
          <section>
            <p className="homecontent__para">
              Leading the way to <br /> better medicine
            </p>
            <p className="homecontent__para-tag">
              Your health journey made easy with seamless appointment scheduling
            </p>
            <div onClick={()=>navigate(`/doctors`)}>
              <button className="homecontent__button">
                Book an Appointment
              </button>
              </div>
          </section>
          <Speciality />
          <TopDoctors />
        </div>
      </div>
    //  </div>
  );
};

export default Home;
