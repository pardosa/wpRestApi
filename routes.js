var comment = require('./models/comment');
 
module.exports = {
  configure: function(app) {
    app.get('/comments/', function(req, res) {
      comment.get(res);
    });
	
	app.get('/comment/:id', function(req, res) {
      comment.getOne(req.params.id, res);
    });
 
    app.post('/comment/', function(req, res) {
      comment.create(req.body, res);
    });
 
    app.put('/comment/', function(req, res) {
      comment.update(req.body, res);
    });
 
    app.delete('/comment/:id/', function(req, res) {
      comment.delete(req.params.id, res);
    });
  }
};