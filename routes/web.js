
var router = global.express.Router();

var homeController = require("../controllers/HomeController");
var dataController = require("../controllers/DataController");
global.app.use(function(req, response, next) {
   response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type");
  return next();
});
router.get("/", dataController.index);
router.get("/match/:id", dataController.details);
router.get("/match-score/:id", dataController.renderMatchScore);
router.get("/series", dataController.renderSeries);
router.get("/series-details/:id/:slug", dataController.renderSerieDetails);
router.get("/ranking/:type", dataController.randerRanking)
router.get("/ranking/:type/:matchType/:position", dataController.randerRanking)
router.get("/news", dataController.renderNews);

router.get('/team-flags',homeController.index);
module.exports = router;
