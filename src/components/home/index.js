import React from "react";
import {Tuits} from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import WhatsHappening from "../whats-happening";

const Home = () => {
  const location = useLocation();
  const {uid} = useParams();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');
  const userId = uid;
  const findTuits = () => {
    if(uid) {
      return service.findTuitByUser(uid)
        .then(tuits => setTuits(tuits))
    } else {
      return service.findAllTuits()
        .then(tuits => setTuits(tuits))
    }
  }
  useEffect(() => {
    let isMounted = true;
    findTuits()
    return () => {isMounted = false;}
  }, []);
  const createTuit = () =>
      service.createTuit(userId, {tuit})
          .then(findTuits)
  console.log(tuit);
  const deleteTuit = (tid) =>
      service.deleteTuit(tid)
          .then(findTuits)

  return(

    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        {
          uid &&
          <div className="d-flex">
            <div className="p-2">
              <img className="ttr-width-50px rounded-circle"
                   src="https://i.etsystatic.com/17857814/r/il/24aec7/1531067118/il_1588xN.1531067118_mqui.jpg"/>
            </div>
            <div className="w-100">
              {/*<h1>hi</h1>*/}
              <div>
              <textarea value={tuit}
                  onChange={(e) => setTuit(e.target.value)}
                placeholder="What's happening?"
                className="form-control">
              </textarea>
              </div>

              <div className="row">
                <div className="col-10 ttr-font-size-150pc text-primary">
                  {/*<i className="fas fa-portrait me-3"></i>*/}
                  <i className="far fa-image me-3"></i>
                  <i className="fas fa-chart-bar me-3"></i>
                  <i className="far fa-smile me-3"></i>
                  <i className="far fa-calendar me-3"></i>
                  {/*<i className="far fa-map-location me-3"></i>*/}
                </div>
                <div className="col-2">
                  <a onClick={createTuit}
                     className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                    Tuit
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
    </div>
  );
};
export default Home;
