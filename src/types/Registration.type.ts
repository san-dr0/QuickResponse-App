import { UserType } from "../enums/User.enum";

export type RegistrationDTO = {
    profile: string;
    firstname:    string
    middlename:   string
    lastname:     string
    mobilenumber: string
    address:      string
    email:        string
    password:     string
    isActive:     boolean
    userType?: UserType
}
