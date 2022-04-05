import React, {useEffect, useState} from "react";
import * as securityService from "../../services/security-service";
import * as likesService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";


const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {
    const [uid, setUid] = useState(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const checkIfLoggedIn = async () => {
        const user = await securityService.profile();
        const suid = {
            uid: user._id
        }
        setUid(suid);
        const isLiked = await likesService.doesUserLikeTuit(user._id, tuit._id)
        setLiked(isLiked)
        const isDisliked = await dislikeService.doesUserDislikeTuit(user._id, tuit._id)
        setDisliked(isDisliked)
    }
    useEffect(() => {
        let isMounted = true;
        checkIfLoggedIn()
        return () => {
            isMounted = false;
        }
    }, []);

    const handleLikeDislike = (clickedOn, toggleLike, toggleDislike) => {
        if (clickedOn === 'like') {
            if (!liked && !disliked) {
                toggleLike(tuit);
                setLiked(!liked);
            }
            else if (liked) {
                toggleLike(tuit);
                setLiked(!liked);
            }

            else {
                toggleDislike(tuit);
                setDisliked(!disliked);
                toggleLike(tuit);
                setLiked(!liked);
            }
        }

        else if (clickedOn === 'dislike') {
            if (!liked && !disliked) {
                toggleDislike(tuit);
                setDisliked(!disliked);
            } else if (disliked) {
                toggleDislike(tuit);
                setDisliked(!disliked);
            } else {
                toggleLike(tuit);
                setLiked(!liked);
                toggleDislike(tuit);
                setDisliked(!disliked);
            }
        }
    }
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
          <span onClick={() => {
              handleLikeDislike("like", likeTuit, dislikeTuit)
          }}>
              {
                  liked &&
                  <i className="fa-solid fa-thumbs-up me-1"/>
              }
              {
                  !liked &&
                  <i className="fa-light fa-thumbs-up me-1"/>
              }
              {/*<i className="fas fa-heart me-1" />*/}
              {tuit.stats && tuit.stats.likes}
          </span>
            </div>
            <div className="col">
                <span onClick={() => {
                    handleLikeDislike("dislike", likeTuit, dislikeTuit)
                }}>
                {
                    disliked &&
                    <i className="fa-solid fa-thumbs-down me-1"/>
                }
                    {
                        !disliked &&
                        <i className="fa-light fa-thumbs-down me-1"/>
                    }
                    {tuit.stats && tuit.stats.dislikes}
              </span>
            </div>
        </div>
    );
}
export default TuitStats;
