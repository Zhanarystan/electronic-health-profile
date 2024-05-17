import { City } from "./city";

export interface InstitutionItem {
    id: string | null;
    name: string | null;
    address: string | null;
    institutionType: string | null;
    institutionSubType: string | null;
    city: City | null;
}

