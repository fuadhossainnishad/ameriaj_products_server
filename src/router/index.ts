import AuthRouter from "../module/auth/auth.routes";
import HealthRouter from "../module/health/health.routes";
import express from "express";
import UserRouter from "../module/user/user.routes";
import VendorRouter from "../module/vendor/vendor.routes";
import AdminRouter from "../module/admin/admin.routes";
import ReviewRouter from "../module/review/review.routes";
import StripeRouter from "../module/stripe/stripe.routes";
import NotificationRouter from "../module/notification/notification.routes";
import SettingsRouter from "../module/settings/settings.routes";
import SubscriptionRouter from "../module/subscription/subscription.routes";
import TrackRouter from "../module/track/track.routes";
import AppointmentRouter from "../module/appointment/appointment.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/health", route: HealthRouter },
  { path: "/auth", route: AuthRouter },
  { path: "/user", route: UserRouter },
  { path: "/vendor", route: VendorRouter },
  { path: "/admin", route: AdminRouter },
  { path: "/appointment", route: AppointmentRouter },
  { path: "/settings", route: SettingsRouter },
  { path: "/track", route: TrackRouter },
  { path: "/order", route: ReviewRouter },
  { path: "/subscription", route: SubscriptionRouter },
  { path: "/payment", route: StripeRouter },
  { path: "/notification", route: NotificationRouter },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));
export default router;
