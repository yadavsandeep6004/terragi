import React, { PropsWithChildren, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

interface MapProps extends google.maps.MapOptions {
    onClick?: (lat?: number, lng?: number) => void;
    className?: string;
    locationCallbacks?: (state: LocationState) => void;
}

export enum LocationState {
    FETCHING,
    SUCCESS,
    FAILED,
    UNSUPPORTED,
}

export const Map: React.FC<PropsWithChildren<MapProps>> = (props) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();

    const setSearchBox = (_map: google.maps.Map) => {
        const input = document.createElement("input") as HTMLInputElement;
        input.classList.add(
            "p-4",
            "mt-3",
            "text-2xl",
            "border",
            "border-gray-300",
            "shadow-md"
        );
        const searchBox = new google.maps.places.SearchBox(input);
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (places?.length === 0) {
                return;
            }
            const bounds = new google.maps.LatLngBounds();

            places?.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    return;
                }

                const pos = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                props.onClick?.(pos.lat, pos.lng);

                _map.setCenter(pos);
                _map.moveCamera({ center: pos, zoom: 15 });

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            _map.fitBounds(bounds);
        });

        _map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

        // Bias the SearchBox results towards current map's viewport.
        _map.addListener("bounds_changed", () => {
            searchBox.setBounds(_map.getBounds() as google.maps.LatLngBounds);
        });
    };

    React.useEffect(() => {
        if (ref.current && !map) {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const _map = new window.google.maps.Map(ref.current, { zoom: 15 });
            _map.setCenter({ lat: 28.453142, lng: 77.025229 });
            const button = document.createElement("div");
            button.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">\n' +
                '  <path fill-rule="evenodd" d="M12,2 C12.5522847,2 13,2.44771525 13,3 L13.0009551,4.06201291 C16.6192832,4.51365373 19.4869953,7.38169805 19.9381291,11.0001836 L21,11 C21.5522847,11 22,11.4477153 22,12 C22,12.5522847 21.5522847,13 21,13 L19.938005,13.0008119 C19.4864693,16.618828 16.6189513,19.4863877 13.0009551,19.9379871 L13,21 C13,21.5522847 12.5522847,22 12,22 C11.4477153,22 11,21.5522847 11,21 L11.0000487,19.9381123 C7.38160685,19.4869215 4.51361653,16.6192066 4.06200545,13.0008953 L3,13 C2.44771525,13 2,12.5522847 2,12 C2,11.4477153 2.44771525,11 3,11 L4.06188125,11.0001003 C4.51309045,7.38131942 7.38127497,4.51311984 11.0000487,4.06188768 L11,3 C11,2.44771525 11.4477153,2 12,2 Z M12,6 C8.6862915,6 6,8.6862915 6,12 C6,15.3137085 8.6862915,18 12,18 C15.3137085,18 18,15.3137085 18,12 C18,8.6862915 15.3137085,6 12,6 Z M12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 Z"/>\n' +
                "</svg>";
            button.classList.add(
                "p-[6px]",
                "mb-[12px]",
                "mr-[12px]",
                "bg-white"
            );
            button.addEventListener("click", () => {
                if (navigator.geolocation) {
                    props.locationCallbacks?.(LocationState.FETCHING);
                    navigator.geolocation.getCurrentPosition(
                        (position: GeolocationPosition) => {
                            props.locationCallbacks?.(LocationState.SUCCESS);

                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };

                            _map.setCenter(pos);
                            _map.moveCamera({ center: pos, zoom: 11 });
                            props.onClick?.(pos.lat, pos.lng);
                        },
                        () => {
                            props.locationCallbacks?.(LocationState.FAILED); // header template max 6
                        },
                        {
                            timeout: 10000,
                            enableHighAccuracy: true,
                        }
                    );
                } else {
                    // Browser doesn't support Geolocation
                    props.locationCallbacks?.(LocationState.UNSUPPORTED);
                }
            });
            _map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(
                button
            );

            setSearchBox(_map);

            setMap(_map);
        }
    }, [ref, map]);

    useEffect(() => {
        map?.setOptions(props);
    }, [props, map]);

    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (props.onClick) {
                map.addListener("click", (m: google.maps.MapMouseEvent) => {
                    const lat = m.latLng?.lat();
                    const lng = m.latLng?.lng();
                    props.onClick?.(lat, lng);
                });
            }
        }
    }, [map, props.onClick]);

    return (
        <>
            <div className={props.className} ref={ref} />
            {React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map });
                }
                return null;
            })}
        </>
    );
};

export const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};

export const MapWrapper: React.FC<PropsWithChildren<any>> = (props) => (
    <Wrapper
        libraries={["places"]}
        apiKey="AIzaSyDJsUrJnMWZ5AoMRV_4ZZG0waFiulmbF6I"
    >
        <div className="relative">{props.children}</div>
    </Wrapper>
);
