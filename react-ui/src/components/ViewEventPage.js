import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setActiveEvent, setActiveView, setLastView } from '../actions/views';
import { startRemoveEvent } from '../actions/events';
import { ArrowForward, AutoFixHigh, Close, DeleteForever, Notes, Place, Schedule } from '../svg/Icons';

export const ViewEventPage = (props) => {
    const { id, title, startDate, endDate, duration, color, location, notes } = props.views.activeEvent;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onLoad = () => {
        // set if statement for event.location.address
        if (location.address) {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            const mapElement = document.getElementById('map');
            const map = new window.google.maps.Map(mapElement, {
                center: location.coordinates,
                zoom: 14,
                disableDefaultUI: true,
            });
            directionsRenderer.setMap(map);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        directionsService
                            .route({
                            origin: pos,
                            destination: location.coordinates,
                            travelMode: window.google.maps.TravelMode.DRIVING,
                            })
                            .then((response) => {
                            directionsRenderer.setDirections(response);
                            });
                    }
                );
            }
            
            const contentString = `
                <div>
                    <strong>${location.description}</strong><br />
                    <span>(${location.address})</span>
                </div>
            `;
            const infowindow = new window.google.maps.InfoWindow({
                content: contentString,
              });
            
            const marker = new window.google.maps.Marker({
                position: location.coordinates,
                map,
                title: location.description,
            });

            marker.addListener("click", () => {
                infowindow.open({
                  anchor: marker,
                  map,
                  shouldFocus: false,
                });
            });
        }
        
    }

    const closeView = () => {
        props.setActiveEvent(undefined);
        props.setLastView('');
        props.setActiveView('list');
    }

    const deleteEvent = () => {
        props.startRemoveEvent({ id });
    }

    const editEvent = () => {
        props.setActiveEvent(props.views.activeEvent);
        props.setActiveView('edit');
        props.setLastView('view');
    }
    
    const startDay = moment(startDate).format('MMDDYYYY');
    const endDay = moment(endDate).format('MMDDYYYY');

    return (
        <div className="calendar-view">
            <button onClick={closeView} className="button button--close"><Close /></button>
            <button onClick={deleteEvent} className="button button--delete"><DeleteForever /></button>
            <button onClick={editEvent} className="button button--edit"><AutoFixHigh /></button>
            <h1 className="calendar-view__title">Event Details</h1>
            <div className={`calendar-view__event-details ${color}`}>
                <h2 className="event-title"><div className="event-bullet"></div> {title}</h2>
                <div className="event-date__view"><Schedule /> 
                    <div className="event-date__text">{
                        duration === 'day' ? (
                            startDay !== endDay ? (
                                <>
                                    <div className="start-date">
                                        <div className="date">{moment(startDate).format('ddd, MMM D')}</div>
                                    </div>
                                    <ArrowForward />
                                    <div className="end-date">
                                        <div className="date">{moment(endDate).format('ddd, MMM D')}</div>
                                    </div>
                                </>
                            ) : (
                                <div className="start-date">
                                    <div className="date">{moment(startDate).format('ddd, MMM D')}</div>
                                </div>
                            )
                        ) : (
                            startDay !== endDay ? (
                                <>
                                    <div className="start-date">
                                        <div className="date">{moment(startDate).format('ddd, MMM D')}</div>
                                        <div className="time">{moment(startDate).format('h:mma')} - {moment(endDate).format('h:mma')}</div>
                                    </div>
                                    <ArrowForward />
                                    <div className="end-date">
                                        <div className="date">{moment(endDate).format('ddd, MMM D')}</div>
                                        <div className="time">{moment(startDate).format('h:mma')} - {moment(endDate).format('h:mm a')}</div>
                                    </div>
                                </>
                            ) : (
                                <div className="start-date">
                                    <div className="date">{moment(startDate).format('ddd, MMM D')}</div>
                                    <div className="time">{moment(startDate).format('h:mma')} - {moment(endDate).format('h:mma')}</div>
                                </div>
                            )
                        )
                    }</div>
                </div>
                {location.description && 
                    <div className="event-location__view">
                        <Place />
                        <div className="event-location__text">
                            {
                                location.address ? (
                                    <>
                                        <div className="description">{location.description}</div>
                                        {location.description !== location.address.split(',')[0] &&
                                            <div className="address">{location.address}</div>
                                        }
                                    </>
                                ) : (
                                    <div className="description">{location.description}</div>
                                )
                            }
                        </div>
                    </div>
                }
                {location.address && 
                    <div id="map" className="event-location__map"></div>
                }
                {notes && 
                    <div className="event-notes__view">
                        <Notes />
                        <div className="event-notes__text">
                            <div className="title">Notes</div>
                            <div className="notes">{notes}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setActiveEvent: (event) => dispatch(setActiveEvent(event)),
    setActiveView: (view) => dispatch(setActiveView(view)),
    setLastView: (lastView) => dispatch(setLastView(lastView)),
    startRemoveEvent: (data) => dispatch(startRemoveEvent(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewEventPage);