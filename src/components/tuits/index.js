import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import * as tuitsService from "../../services/tuits-service";

function Tuits({tuits = [], refreshTuits}) {
    const likeTuit = (tuit) =>
        likesService
            .userTogglesTuitLikes("session", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const dislikeTuit = (tuit) =>
        dislikesService
            .userTogglesTuitDislikes("session", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const deleteTuit = (tid) =>
        tuitsService.deleteTuit(tid)
            .then(refreshTuits);

    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits.map && tuits.map(tuit => {
                        return (
                            <Tuit key={tuit._id}
                                  deleteTuit={deleteTuit}
                                  likeTuit={likeTuit}
                                  dislikeTuit={dislikeTuit}
                                  tuit={tuit}/>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Tuits;
