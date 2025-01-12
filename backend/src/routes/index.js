import eventRouter from "./eventRoutes.js";
import RSVPRouter from "./RSVPRoutes.js";
import filterRouter from "./filterRoutes.js";
import router from "./user-routes.js";

//initializes and configures application routes
const initializeRoutes = (app) => {
    //mount eventRouter to handle routes at /api/club-admin/events
    app.use('/api/club-admin/events', eventRouter);
    app.use('/api/user/rsvp', RSVPRouter);
    app.use("/api/filters", filterRouter); // Register filter routes
    app.use("/api/users", router);
}
export default initializeRoutes;