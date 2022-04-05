import {useEffect, useState} from "react";
import * as service from "../../services/dislikes-service";
import Tuits from "../tuits";

const MyDislikes = () => {
    const [tuits, setTuits] = useState([]);
    const findMyDislikedTuits = () =>
        service.findAllTuitsDislikedByUser("session")
            .then((tuits) => {
                console.log(tuits)
                setTuits(tuits)
            });

    useEffect(findMyDislikedTuits, []);

    return(
        <div>
            <Tuits tuits={tuits}
                   refreshTuits={findMyDislikedTuits}/>
        </div>
    );
}

export default MyDislikes;
