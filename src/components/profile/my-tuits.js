import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = forwardRef((props, ref) => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitByUser("session")
            .then(tuits => setTuits(tuits));

    useEffect(findMyTuits, []);

    useImperativeHandle(ref, () => ({
        refresh() {
            console.log('Refreshing!')
            findMyTuits()
        }
    }));

    return(
        <Tuits tuits={tuits}
               refreshTuits={findMyTuits}
        />
    );
});

export default MyTuits;
