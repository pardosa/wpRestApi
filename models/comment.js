var connection = require('../conn');
 
function Comment() {
    this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from wp_comments', function(err, result) {
        con.release();
        res.send(result);
      });
    });
	};
	
	this.getOne = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from wp_comments where comment_id = ?', [id], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

    this.create = function(comment, res) {
    connection.acquire(function(err, con) {
      con.query('insert into wp_comments set ?', comment, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'comment creation failed'});
        } else {
          res.send({status: 0, message: 'comment created successfully'});
        }
      });
    });
};

    this.update = function(comment, res) {
    connection.acquire(function(err, con) {
      con.query('update wp_comments set ? where comment_id = ?', [comment, comment.id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'comment update failed'});
        } else {
          res.send({status: 0, message: 'comment updated successfully'});
        }
      });
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from wp_comments where comment_id = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
};

}

module.exports = new Comment();
