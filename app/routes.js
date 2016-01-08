var Question = require('./models/question');

function getQuestions(res){
	Question.find(function(err, questions) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(questions); // return all questions in JSON format
		});
};

function getOneQuestion(id, res){
    Question.findOne({
        _id : id
    }, function(err, question) {
        if (err)
            res.send(err);

        res.json(question);
    });
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all questions
	app.get('/api/questions', function(req, res) {

		// use mongoose to get all questions in the database
		getQuestions(res);
	});

    // get one question
    app.put('/api/question/:question_id', function(req, res) {
        getOneQuestion(req.params.question_id, res);
    });

	// create question and send back all questions after creation
	app.post('/api/questions', function(req, res) {

		// create a question, information comes from AJAX request from Angular
		Question.create({
			title : req.body.title,
			description : req.body.description
		}, function(err, question) {
			if (err)
				res.send(err);

			// get and return all the questions after you create another
			getQuestions(res);
		});

	});

	// delete a question
	app.delete('/api/questions/:question_id', function(req, res) {
		Question.remove({
			_id : req.params.question_id
		}, function(err, question) {
			if (err)
				res.send(err);

			getQuestions(res);
		});
	});

	// upVote a question and get all back
    app.put('/api/upvote/:question_id', function(req, res) {
        Question.update(
            { _id : req.params.question_id },
            { $inc : { votes : 1 } },
            function(err, question) {
                if (err)
                    res.send(err);

                getQuestions(res);
            }
        );
    });

    // upVote a question and get one back
    app.put('/api/upvote_one/:question_id', function(req, res) {
        Question.update(
            { _id : req.params.question_id },
            { $inc : { votes : 1 } },
            function(err, question) {
                if (err)
                    res.send(err);

                getOneQuestion(req.params.question_id, res);
            }
        );
    });

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};