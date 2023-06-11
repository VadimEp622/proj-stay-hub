import { STAYS_TRUE_DEMO_TEMP } from "../services/stay.service.local";

export function JSONStringify() {
    const stays = STAYS_TRUE_DEMO_TEMP;

    return JSON.stringify(stays);
}
