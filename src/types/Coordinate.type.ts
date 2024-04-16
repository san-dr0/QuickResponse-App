export type CoordinatesDTO = {
    accuracy?: number;
    altitude?: number | undefined | null;
    altitudeAccuracy?: number | undefined | null;
    heading?: number | undefined | null;
    latitude: number;
    longitude: number;
    speed?: number;
}