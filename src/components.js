import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { path } from 'ramda';

import styled from 'styled-components';

import { getQuestions, getTopTen } from './utils';

const Container = styled(({ ...other }) => <Grid container={true} {...other} />)``;

const Item = styled(({ ...other }) => <Grid item={true} {...other} />)``;

export const StyledButton = styled.a`
	color: #1f4f79;
	font-size: 2.4rem;
	&:hover {
		color: white;
		cursor: pointer;
	}
`;

export const StyledButtonDisabled = styled.a`
	color: #9e9e9e;
	font-size: 2.4rem;
`;

export const StyledPoints = styled.div`
	color: #1f4f79;
	font-size: 2.4rem;
`;

export const StyledQuestion = styled.span`
	padding-right: 3rem;
	padding-left: 3rem;
`;

export const StyledAnswer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 2vh;
	&:hover {
		cursor: pointer;
		transform: scale(1.03);
	}
	background-color: #d1d1d1;
	width: 20vw;
	height: 10vh;
`;

export const StyledScore = styled.div`
	font-size: 3rem;
	color: #1f4f79;
`;

/**
 * component for creating the scoreboard
 * @param topTen list of ten best players 
 */
const Scoreboard = ({ topTen }) => {
	return (
		<Container style={{ marginTop: '3rem' }}>
			<Item xs={12}>
				<Container style={{ display: 'flex', justifyContent: 'center' }}>
					<Item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
						Name
					</Item>
					<Item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
						Score
					</Item>
				</Container>
			</Item>
			{topTen.map((item) => (
				<Item xs={12}>
					<Container style={{ display: 'flex', justifyContent: 'center' }}>
						<Item
							xs={4}
							style={{ display: 'flex', justifyContent: 'center', margin: '0.2rem', border: '1px solid' }}
						>
							{item.name || '-'}
						</Item>
						<Item
							xs={4}
							style={{ display: 'flex', justifyContent: 'center', margin: '0.2rem', border: '1px solid' }}
						>
							{item.score.toFixed(2) || '-'}
						</Item>
					</Container>
				</Item>
			))}
		</Container>
	);
};

/**
 * the scoreboard page is created here
 * @param scores top ten of scoreboard
 * @param name name that was asked in the beginning
 * @param setName function for setting name, in this case to empty string
 * @param score the score that the player achieved
 * @param setScore function for setting score, in this case to zero
 * @param setQuizState function for handling state of the quiz: in this case the state is switched to askName where name of the player is asked
 * @param setData function for handling questions: in this case an empty array is set as value of data
 * @param setScores function for handling scoreboard's top ten. In this case an empty array is set as the value of 'scores'
 */
export const ShowScoreboard = ({ scores, name, setName, score, setScore, setQuizState, setData, setScores }) => {
	const [ scoreData, setScoreData ] = React.useState([]);
	// Get top 10 on scoreboard
	React.useEffect(
		() => {
			setScoreData(scores);
			const fetchData = async () => {
				const url = 'http://oop-harkka.herokuapp.com/api/addscore';
				const temp = await axios.post(url, { name: name, score: score.toFixed(2) }).then((res) => {
					return res.data;
				});
				console.log(temp);
				setScoreData(temp);
			};
			fetchData();
		},
		[ name, score, scores ]
	);
	return (
		<Container>
			<Item
				xs={12}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '5vh',
					marginTop: '5vh',
					paddingLeft: '10rem',
					paddingRight: '10rem'
				}}
			>
				<StyledScore>
					{`${name}, your score is ${score.toFixed(2)}!`}
					{score > scores[9].score && ` You made it to top 10!`}
				</StyledScore>
			</Item>
			<Item xs={12}>
				<Container style={{ display: 'flex', justifyContent: 'center' }}>
					<Item xs={6}>
						<Scoreboard topTen={scoreData} />
					</Item>
				</Container>
			</Item>
			<Item
				xs={12}
				style={{
					display: 'flex',
					justifyContent: 'center',
					height: '10vh',
					marginTop: '10vh'
				}}
			>
				<StyledButton
					onClick={() => {
						setName('');
						setQuizState('askName');
						setScore(0);
						setData([]);
						setScores([]);
					}}
				>
					Try Again
				</StyledButton>
			</Item>
		</Container>
	);
};

/**
 * 
 * @param data list of questions
 * @param setQuizState function for handling quiz state, here the quiz state is set to 'showScoreboard' after 10 questions have been answered
 * @param questionsAnswered number of questions answered, values are from zero to ten
 * @param setQuestionsAnswered function for handling the number of questions that have been answered
 * @param score the score that the player achieved in the game
 * @param setScore function for handling score
 */
export const AnswerQuestions = ({ data, setQuizState, questionsAnswered, setQuestionsAnswered, score, setScore }) => {
	const [ timeLeft, setTimeLeft ] = React.useState(20000);
	// When 10 questions are answered, switch to scoreboard
	React.useEffect(
		() => {
			if (questionsAnswered === 10) {
				setQuizState('showScoreboard');
				setQuestionsAnswered(0);
			}
		},
		[ questionsAnswered, setQuestionsAnswered, setQuizState ]
	);
	// timer
	React.useEffect(
		() => {
			if (timeLeft === 0) {
				setQuestionsAnswered(questionsAnswered + 1);
				//getNextQuestion();
				setTimeLeft(20000);
			}
			const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 10), 10);
			return () => clearInterval(timer);
		},
		[ timeLeft, questionsAnswered, setQuestionsAnswered ]
	);
	return (
		<Container>
			<Item xs={12} style={{ height: '5vh' }}>
				<Container style={{ height: '5vh' }}>
					<Item xs={10} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<div
							style={{
								width: `${timeLeft / 20000 * 100}%`,
								backgroundColor: '#1f4f79',
								height: '4vh',
								border: '0.5rem',
								borderRadius: '0.5rem',
								marginLeft: '0.5vh'
							}}
						/>
					</Item>
					<Item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<StyledPoints>{score.toFixed(2)}</StyledPoints>
					</Item>
				</Container>
			</Item>
			<Item
				xs={12}
				style={{ paddingTop: '5vh', paddingBottom: '5vh', display: 'flex', justifyContent: 'center' }}
			>
				<StyledQuestion
					style={{
						fontSize: `${path([ questionsAnswered, 'question' ], data) &&
						path([ questionsAnswered, 'question' ], data).length > 60
							? '1.5rem'
							: path([ questionsAnswered, 'question' ], data) &&
								path([ questionsAnswered, 'question' ], data).length > 40
								? '2rem'
								: path([ questionsAnswered, 'question' ], data) &&
									path([ questionsAnswered, 'question' ], data).length > 30
									? '2.5rem'
									: '3rem'}`
					}}
				>
					{path([ questionsAnswered, 'question' ], data) ? data[questionsAnswered].question : ''}
				</StyledQuestion>
			</Item>
			<Item xs={12}>
				<Container style={{ display: 'flex', justifyContent: 'space-around' }}>
					<StyledAnswer
						onClick={() => {
							console.log(data);
							setQuestionsAnswered(questionsAnswered + 1);
							if (
								!!data[questionsAnswered].answers[0] &&
								!!data[questionsAnswered].correct_answer &&
								data[questionsAnswered].answers[0] === data[questionsAnswered].correct_answer
							) {
								setScore(score + timeLeft / 200);
							}
							setTimeLeft(20000);
						}}
					>
						{path([ questionsAnswered, 'answers', 0 ], data) ? data[questionsAnswered].answers[0] : ''}
					</StyledAnswer>
					<StyledAnswer
						onClick={() => {
							setQuestionsAnswered(questionsAnswered + 1);
							if (
								!!data[questionsAnswered].answers[1] &&
								!!data[questionsAnswered].correct_answer &&
								data[questionsAnswered].answers[1] === data[questionsAnswered].correct_answer
							) {
								setScore(score + timeLeft / 200);
							}
							setTimeLeft(20000);
						}}
					>
						{path([ questionsAnswered, 'answers', 1 ], data) ? data[questionsAnswered].answers[1] : ''}
					</StyledAnswer>
				</Container>
				<Container style={{ display: 'flex', justifyContent: 'space-around' }}>
					<StyledAnswer
						onClick={() => {
							setQuestionsAnswered(questionsAnswered + 1);
							if (
								!!data[questionsAnswered].answers[2] &&
								!!data[questionsAnswered].correct_answer &&
								data[questionsAnswered].answers[2] === data[questionsAnswered].correct_answer
							) {
								setScore(score + timeLeft / 200);
							}
							setTimeLeft(20000);
						}}
					>
						{path([ questionsAnswered, 'answers', 2 ], data) ? data[questionsAnswered].answers[2] : ''}
					</StyledAnswer>
					<StyledAnswer
						onClick={() => {
							setQuestionsAnswered(questionsAnswered + 1);
							if (
								!!data[questionsAnswered].answers[3] &&
								!!data[questionsAnswered].correct_answer &&
								data[questionsAnswered].answers[3] === data[questionsAnswered].correct_answer
							) {
								setScore(score + timeLeft / 200);
							}
							setTimeLeft(20000);
						}}
					>
						{path([ questionsAnswered, 'answers', 3 ], data) ? data[questionsAnswered].answers[3] : ''}
					</StyledAnswer>
				</Container>
			</Item>
		</Container>
	);
};

/**
 * Component for rendering page to ask name of player
 * @param name name of the player
 * @param setName function for handling the name of the player
 * @param setQuizState function for handling the state of the quiz, in this case the state is set to 'answerQuestions' after name has been submitted
 * @param buttonDisabled boolean for deciding whether to let player submit his/her name. Questions are loaded when in this window and not having loaded the questiong when submitting would lead to an error
 * @param setQuestions function for handling questions. when the questions have been loaded, they are set to variable named 'questions'
 * @param setScores function for handling the scoreboard. Scoreboard is downloaded when in this screen and scores and names are set to variable 'scores' as list
 */
export const AskName = ({ name, setName, setQuizState, buttonDisabled, setQuestions, setScores }) => {
	React.useEffect(
		() => {
			const fetchData = async () => {
				const temp = await getQuestions();
				setQuestions(temp);
			};
			const fetchScoreData = async () => {
				const temp2 = await getTopTen();
				setScores(temp2);
			};
			fetchData();
			fetchScoreData();
		},
		[ setQuestions, setScores ]
	);
	return (
		<Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
			<Item xs={4} style={{}}>
				<Container>
					<Item xs={12} style={{ display: 'flex', justifyContent: 'left', marginBottom: '0.4rem' }}>
						<TextField value={name} onChange={(e) => setName(e.target.value)} />
					</Item>
					<Item
						xs={12}
						style={{ display: 'flex', justifyContent: 'left', marginTop: '0.4rem', marginBottom: '1rem' }}
					>
						Please write your name
					</Item>
					<Item xs={12} style={{ display: 'flex', justifyContent: 'left', marginTop: '1rem' }}>
						{buttonDisabled ? (
							<StyledButtonDisabled>Submit</StyledButtonDisabled>
						) : (
							<StyledButton
								onClick={() => {
									setQuizState('answerQuestions');
								}}
							>
								Submit
							</StyledButton>
						)}
					</Item>
				</Container>
			</Item>
		</Container>
	);
};
