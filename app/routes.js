var Question = require('./models/question');
var Answer = require('./models/answer');

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

function getAnswers(q_id, res){
    console.log("getAnswers called!");
    Answer.find({question_id : q_id},
        function(err, answers) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(answers); // return all answers in JSON format
    });
};

module.exports = function(app) {

	// question api ---------------------------------------------------------------------
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

    // answer api ---------------------------------------------------------------------
    // get all answers by question_id
    app.put('/api/answers/:question_id', function(req, res) {
        console.log("answer get api called.");
        getAnswers(req.params.question_id, res);
    });

    // create answer
    app.post('/api/answers/:question_id', function(req, res) {
        var q_id = req.params.question_id;

        Question.update(
            { _id : q_id },
            { $inc : { answer_num : 1 } },
            function(err, question) {
                if (err)
                    res.send(err);
            }
        );

        Answer.create({
            question_id : q_id,
            text : req.body.text
        }, function(err, answer) {
            if (err)
                res.send(err);

            // get and return all the questions after you create another
            getAnswers(q_id, res);
        });

    });

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};