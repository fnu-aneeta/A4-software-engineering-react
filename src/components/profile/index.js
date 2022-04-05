import React, {useEffect, useRef, useState} from "react";
import {Routes, Route, useNavigate, Link, useLocation, Router} from "react-router-dom";
import * as securityService from "../../services/security-service"
import TuitsAndReplies from "./tuits-and-replies";
import MyTuits from "./my-tuits";
import Media from "./media";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";
import * as tuitService from "../../services/tuits-service";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [tuit, setTuit] = useState('');
  const myTuits = useRef();

  useEffect(async () => {
    try {
      const user = await securityService.profile();
      setProfile(user);
      navigate('/profile/mytuits');
    }
    catch (e) {
      navigate('/login');
    }
  }, []);


  const logout = () => {
    securityService.logout()
        .then(() => navigate('/login'));
  }

  const createTuit = () =>
      tuitService.createTuit("session", {tuit}).then( () => {
        console.log("Calling refresh!")
        myTuits.current.refresh();
      });

  return(
      <div className="ttr-home">
        <div className="border border-bottom-0">
          <h4 className="fw-bold p-2">Profile Page</h4>
          <h4>{profile.username}</h4>
          <h6>@{profile.username}</h6>
          <button onClick={logout}>Logout</button>
          <div className="d-flex">
            <div className="p-2">
              <img className="ttr-width-50px rounded-circle"
                   src="https://res.cloudinary.com/teepublic/image/private/s--9YGBFPO1--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1591292360/production/designs/10991222_0.jpg"
                   alt="Profile Image"/>
            </div>
            <div className="p-2 w-100">
              <textarea
                  onChange={(e) =>
                      setTuit(e.target.value)}
                  placeholder="What's happening?"
                  className="w-100 border-0"/>
              <div className="row">
                <div className="col-10 ttr-font-size-150pc text-primary">
                  <i className="fas fa-portrait me-3"/>
                  <i className="far fa-gif me-3"/>
                  <i className="far fa-bar-chart me-3"/>
                  <i className="far fa-face-smile me-3"/>
                  <i className="far fa-calendar me-3"/>
                  <i className="far fa-map-location me-3"/>
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
        </div>

          <ul className="mt-4 nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/profile/mytuits"
                    className={`nav-link ${location.pathname.indexOf('mytuits') >= 0 ? 'active':''}`}>
                Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/tuits-and-replies"
                    className={`nav-link ${location.pathname.indexOf('tuits-and-replies') >= 0 ? 'active':''}`}>
                Tuits & replies</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/media"
                    className={`nav-link ${location.pathname.indexOf('media') >= 0 ? 'active':''}`}>
                Media</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/likes"
                    className={`nav-link ${location.pathname.indexOf('likes') >= 0 && location.pathname.indexOf('dislikes') <= 0 ? 'active':''}`}>
                Likes</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/dislikes"
                    className={`nav-link ${location.pathname.indexOf('dislikes') >= 0 ? 'active':''}`}>
                Dislikes</Link>
            </li>
          </ul>

        <Routes>
          <Route path="/mytuits" element={<MyTuits/>}/>
          <Route path="/tuits-and-replies" element={<TuitsAndReplies/>}/>
          <Route path="/media" element={<Media/>}/>
          <Route path="/likes" element={<MyLikes/>}/>
          <Route path="/dislikes" element={<MyDislikes/>}/>
        </Routes>
    </div>
  );
}
export default Profile;
