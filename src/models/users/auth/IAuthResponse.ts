import IAttributes from "../IAttributes"
import IModules from "../IModules"

export default interface IAuthResponse {
    type_auth: string | null | undefined
    access_token: string | null | undefined
    refresh_token: string | null | undefined
    users_id: number | null | undefined
    attributes: IAttributes | null | undefined
    modules: IModules | null | undefined
}