
/*
 * GET home page.
 */

exports.landing = function(req, res){
  res.render('landing', { title: 'Express' });
};