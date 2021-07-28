import React, { useEffect, useState } from 'react';

const LocationInput = (props) => {
    const [location, setLocation] = useState(
        props.location ? props.location : { 
            description: '',
            address: '',
            placeId: '',
            coordinates: {
                lat: '',
                lng: ''
            }
        }
    );
    const [description, setDescription] = useState(
        location ? location.description : ''
    );
    
    let map, autocomplete

    useEffect(() => {
        if (!window.google) {
            const script = document.createElement(`script`);
            script.src =
                'https://maps.googleapis.com/maps/api/js?key=' +
                process.env.REACT_APP_GOOGLE_MAPS_API_KEY + 
                '&libraries=places&v=weekly';
            document.head.append(script);
            script.addEventListener(`load`, onLoad);
            return () => script.removeEventListener(`load`, onLoad)
        } else onLoad()
    }, []);

    useEffect(() => {
        setLocation(props.location);
        setDescription(props.location.description);
    }, [props.location]);
    
    const onLoad = () => {
        const mapElement = document.createElement('div');
        const input = document.getElementById('location-autocomplete')
        map = new window.google.maps.Map(mapElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 6,
        });
        autocomplete = new window.google.maps.places.Autocomplete(input)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(pos)
                }
            );
        }
        autocomplete.bindTo("bounds", map);
        autocomplete.setFields(["place_id", "geometry", "name", "formatted_address"]);
        const geocoder = new window.google.maps.Geocoder();
        input.addEventListener('keyup', function() {
            if (this.value !== '') {
                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace()
                    let address = place.formatted_address.split(',')
                    address.pop()
                    address = address.join(', ')
                    
                    if (!place.place_id) {
                        return
                    }
                    geocoder.geocode({ placeId: place.place_id }, (results, status) => {
                        if (status !== "OK" && results) {
                            console.log("Geocoder failed due to: " + status)
                            return;
                        }
                        map.setCenter(results[0].geometry.location)
                    
                    });
                    
                    const location = {
                        description: place.name,
                        address: address,
                        placeId: place.place_id,
                        coordinates: place.geometry.location
                    }
                    setLocation(location);
                    setDescription(location.description);
                    props.onLocationChange(location);
                })
                if (autocomplete.getPlace() === undefined) {
                    const location = {
                        description: this.value,
                        address: '',
                        placeId: '',
                        coordinates: {}
                    }
                    setLocation(location);
                    setDescription(location.description);
                    props.onLocationChange(location);
                }
            }
        })
    }

    const onLocationChange = (e) => {
        setDescription(e.target.value)
    }
    
    return (
        <>
            <input
                type="text"
                placeholder="location"
                onChange={onLocationChange}
                value={description}
                id="location-autocomplete"
            />
        </>
    );
}

export { LocationInput as default };


