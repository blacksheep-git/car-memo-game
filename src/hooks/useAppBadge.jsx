import React, { useState } from 'react'

function useAppBadge() {
    const [counter, setCounter] = useState(1);
    const setBadge = () => {
        setCounter(counter + 1);
        if (navigator.setAppBadge){ //does the setAppBadge method exist?
            navigator.setAppBadge(counter);
        } else if (navigator.setClientBadge) {
            navigator.setClientBadge(counter);

        }
    };

    const clearBadge = () => {
        setCounter(1);
        if (navigator.clearAppBadge){
            navigator.clearAppBadge()
        } else if (navigator.clearClientBandge){
            navigator.clearClientBandge();
        }
    };

    return [setBadge, clearBadge]
}

export default useAppBadge
