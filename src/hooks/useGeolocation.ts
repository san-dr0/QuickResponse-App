import Geolocation from "@react-native-community/geolocation";
import { useCallback, useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";
import { CoordinateDto } from "../dto/Coordinate.dto";

export default function useGeolocation() {
    const [coordinate, setCoordinate] = useState<CoordinateDto | null>(null)

    const getPermisssion = useCallback(async () => {
        const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'QRApp Location Permission',
                message: 'QRApp Map want to ask for permission.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'Okay'
            }
        );

        return permission === 'granted'
    }, [])


    function getLocation() {
        return new Promise<CoordinateDto>((resolve) => {
            Geolocation.getCurrentPosition((postition) => {
                resolve({ latitude: postition.coords.latitude, longitude: postition.coords.longitude })
            }, (error) => {
                console.log(error)
            }, {
                timeout: 15000,
                maximumAge: 10000
            })
        })
    }
    useEffect(() => {
        getPermisssion();
    }, [])

    return {
        getPermisssion,
        setCoordinate,
        getLocation,
        coordinate
    }
}
