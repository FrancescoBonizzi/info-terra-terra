import { TrackingSlug } from "./TrackingSlug";

export interface QrOpen {
    ip: string | null | undefined;
    os: string | null | undefined;
    referer: string | null | undefined;
    trackingSlug: TrackingSlug;
}