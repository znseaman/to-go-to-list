import React, {useState} from 'react'
import PLACES from '../data/places'
import Place from './Place'

const Places = () => {
    const [places, setPlaces] = useState(PLACES)
    return (
        <div>
            {places.map(place => (
                <Place key={place.id} place={place}></Place>
            ))}
        </div>
    )
}

export default Places
