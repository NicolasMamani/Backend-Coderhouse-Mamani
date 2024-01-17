const router = express.Router();

app.get('/realtimeproducts', (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
