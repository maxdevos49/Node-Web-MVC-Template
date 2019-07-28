import { IViewModel, IViewProperty } from "../helpers/vash/vashInterfaces";

export class ErrorViewModel implements IViewModel {

    public error: IViewProperty = {
        type: String,
        path: "error",
        name: "Error",
    };

    public emailInfo: IViewProperty = {
        type: String,
        path: "emailInfo",
        name: "Email Link",
    };

    public browserInfo: IViewProperty = {
        type: String,
        path: "browserInfo",
        name: "Browser Info"
    };

}