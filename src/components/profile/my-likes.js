import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findMyLikedTuits = () =>
        service.findAllTuitsLikedByUser("session")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findMyLikedTuits, []);

    return(
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findMyLikedTuits}/>
        </div>
    );
};
export default MyLikes;
