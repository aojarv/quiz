import axios from 'axios';

export const getQuestions = () => {
	const url = 'http://oop-harkka.herokuapp.com/api/questions';
	return axios
		.get(url)
		.then((res) => {
			//console.log(res.data);
			return res.data;
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
};

export const getTopTen = () => {
	const url = 'http://oop-harkka.herokuapp.com/api/scoreboard';
	return axios.get(url).then((res) => {
		return res.data;
	});
};

export const updateTopTen = ({ obj }) => {
	const url = 'http://oop-harkka.herokuapp.com/api/addscore';
	console.log(obj);
	return axios.post(url, obj).then((res) => {
		return res.data;
	});
};

export const isCorrectAnswer = ({ data, questionsAnswered, index }) => {
	if (!!data[questionsAnswered].answers[index] && !!data[questionsAnswered].correct_answer) {
		return true;
	}
	return false;
};
