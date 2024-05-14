import { string } from "yup";

export type EmergencyEducationalResourcesSubsDTO = {
    subTitle: string;
    subContent: string;
};

export type EmergencyEducationalResourcesDTO = 
{
    id: number;
    title: string;
    content: EmergencyEducationalResourcesSubsDTO[]
};
