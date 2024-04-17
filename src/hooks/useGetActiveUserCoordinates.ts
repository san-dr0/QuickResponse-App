import Geolocation from "@react-native-community/geolocation";
import { useCallback, useEffect, useState } from "react";
import { CoordinateDto } from "../dto/Coordinate.dto";

export function useGetActiveUserCoordinates() {
    const [coordiantes, setCoordinates] = useState<CoordinateDto>();

    const getUserCoordinates = useCallback(async () => {
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
            position => {
                setCoordinates({
                    latitude: position?.coords?.latitude,
                    longitude: position?.coords?.longitude
                });
            },
            error => {
                console.error(error);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
            },
        );
    }, []);

    useEffect(() => {
        getUserCoordinates();
    }, []);

    return { coordiantes };
}