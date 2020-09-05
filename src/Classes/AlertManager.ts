import DropdownAlert from 'react-native-dropdownalert';
export class AlertManager {
    private static instance: AlertManager;

    private constructor() { }

    public static getInstance(): AlertManager {
        if (!AlertManager.instance) {
            AlertManager.instance = new AlertManager();
        }
        return AlertManager.instance;
    }

    public static alertHandler : DropdownAlert;

    public registrateAlertHandler(alertHandler : DropdownAlert): any {
        AlertManager.alertHandler = alertHandler
    }
}