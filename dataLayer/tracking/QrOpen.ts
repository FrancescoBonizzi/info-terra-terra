import { TrackingSlug } from "./TrackingSlug";

export interface QrOpen {
    ip?: string;
    os?: string;
    referer?: string;
    trackingSlug: TrackingSlug;
}