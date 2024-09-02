import { useState } from 'react';

import '../css/Rating.css';
import Notification from "./Notification";

const icon = "★";

const Rating = ({defaultRating, id, textRating}) => {
    const [rating, setRating] = useState(defaultRating);
    const [displayedRating, setDisplayedRating] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("Rating stored successfully!")

    let stars = Array(10).fill(icon);

    const handleClick = (newRating) => {
        if (textRating !== "") {
            setRating(newRating);
            localStorage.setItem(`starRating_${id}`, JSON.stringify({newRating, textRating}));

            setNotificationMessage("Rating stored successfully!")
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false)
            }, 3000);
        } else {
            setNotificationMessage("Please fill in your rating!");
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false)
            }, 3000);
        }
    }

    return (
        <>
        <div className="ratingContainer">
                {stars.map((item, index) => {
                    const activeColor = (rating || displayedRating) &&
                        (index < rating || index < displayedRating);

                    let elementColor;

                    if (activeColor) {
                        elementColor = "yellow";
                    } else {
                        elementColor = "grey";
                    }

                    return (
                        <div className="ratingStar" key={index}
                             style={{color: elementColor}}
                             onMouseEnter={() => setDisplayedRating(index + 1)}
                             onMouseLeave={() => setDisplayedRating(0)}
                             onClick={() => handleClick(index + 1)}>
                            {icon}
                        </div>
                    )
                })}
            </div>
            <div>
                <Notification message={notificationMessage} isVisible={showNotification}/>
            </div>
        </>
    )

}

export default Rating;