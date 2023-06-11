import { BIG_DATA } from "../services/data.service";
import { stayService } from "../services/stay.service.local";

export function JSONStringify() {
    const stays = BIG_DATA;
    stayService.generateReviewInputs(stays)
    stayService.generateAvailableDates(stays)
    return JSON.stringify(stays);
}
