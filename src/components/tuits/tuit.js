import React from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit}) => {
  return(
      <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
          <div className="pe-2">
              {
                  tuit.postedBy &&
                  <img src={`https://www.ikea.com/us/en/images/products/djungelskog-soft-toy-panda__0710188_pe727391_s5.jpg?f=s`}
                       className="ttr-tuit-avatar-logo rounded-circle" alt="Avatar Logo"/>
              }
          </div>
          <div className="w-100">
              <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"/>
              <h2
                  className="fs-5">
                  {tuit.postedBy && tuit.postedBy.username} ({tuit.postedBy && tuit.postedBy.email})
              </h2>
              {tuit.tuit}
              {
                  tuit.youtube &&
                  <TuitVideo tuit={tuit}/>
              }
              {
                  tuit.image &&
                  <TuitImage tuit={tuit}/>
              }
              <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit}/>
          </div>
      </li>
  );
}
export default Tuit;
