import React from 'react';
import { Grid, TextField } from '@material-ui/core';

import styled from 'styled-components';

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

export const StyledPoints = styled.div`
	color: #1f4f79;
	font-size: 2.4rem;
`;

export const StyledQuestion = styled.span`font-size: 3rem;`;

export const StyledAnswer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 2rem;
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
			{Object.keys(topTen).map((key) => (
				<Item xs={12}>
					<Container style={{ display: 'flex', justifyContent: 'center' }}>
						<Item
							xs={4}
							style={{ display: 'flex', justifyContent: 'center', margin: '0.2rem', border: '1px solid' }}
						>
							{topTen[key].name}
						</Item>
						<Item
							xs={4}
							style={{ display: 'flex', justifyContent: 'center', margin: '0.2rem', border: '1px solid' }}
						>
							{topTen[key].score}
						</Item>
					</Container>
				</Item>
			))}
		</Container>
	);
};

export const ShowScoreboard = ({ name, setName, score, setScore, setQuizState, getTopTen }) => {
	const [ obj, setObj ] = React.useState({});
	// Get top 10 on scoreboard
	React.useEffect(() => {
		setObj(getTopTen());
	}, []);
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
					{score > obj.tenth.score && ` You made it to top 10!`}
				</StyledScore>
			</Item>
			<Item xs={12}>
				<Container style={{ display: 'flex', justifyContent: 'center' }}>
					<Item xs={6}>
						<Scoreboard topTen={obj} />
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
					}}
				>
					Try Again
				</StyledButton>
			</Item>
		</Container>
	);
};

export const AnswerQuestions = ({
	setQuizState,
	questionsAnswered,
	setQuestionsAnswered,
	score,
	setScore,
	getNextQuestion
}) => {
	const [ timeLeft, setTimeLeft ] = React.useState(10000);
	const [ obj, setObj ] = React.useState({});
	// Get first question when page reloads
	React.useEffect(() => {
		if (questionsAnswered === 0) {
			setObj(getNextQuestion());
		}
	}, []);
	// When 10 questions are answered, switch to scoreboard
	React.useEffect(
		() => {
			if (questionsAnswered === 10) {
				setQuizState('showScoreboard');
				setQuestionsAnswered(0);
			}
		},
		[ questionsAnswered ]
	);
	// timer
	React.useEffect(
		() => {
			if (timeLeft === 0) {
				setQuestionsAnswered(questionsAnswered + 1);
				getNextQuestion();
				setTimeLeft(10000);
			}
			const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 10), 10);
			return () => clearInterval(timer);
		},
		[ timeLeft ]
	);
	return (
		<Container>
			<Item xs={12} style={{ height: '5vh' }}>
				<Container style={{ height: '5vh' }}>
					<Item xs={10} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<div
							style={{
								width: `${timeLeft / 10000 * 100}%`,
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
				style={{ paddingTop: '5rem', paddingBottom: '5rem', display: 'flex', justifyContent: 'center' }}
			>
				<StyledQuestion>{obj.question}</StyledQuestion>
			</Item>
			<Item xs={12}>
				<Container style={{ display: 'flex', justifyContent: 'space-around' }}>
					<StyledAnswer
						onClick={() => {
							setQuestionsAnswered(questionsAnswered + 1);
							setScore(score + timeLeft / 100);
							setTimeLeft(10000);
						}}
					>
						{obj.answer1}
					</StyledAnswer>
					<StyledAnswer
						onClick={() => {
							setQuestionsAnswered(questionsAnswered + 1);
							setScore(score + timeLeft / 100);
							setTimeLeft(10000);
						}}
					>
						{obj.answer2}
					</StyledAnswer>
				</Container>
				<Container style={{ display: 'flex', justifyContent: 'space-around' }}>
					<StyledAnswer
						onClick={() => {
							setQuestionsAnswered(questionsAnswered + 1);
							setScore(score + timeLeft / 100);
							setTimeLeft(10000);
						}}
					>
						{obj.answer3}
					</StyledAnswer>
					<StyledAnswer
						onClick={() => {
							setQuestionsAnswered(questionsAnswered + 1);
							setScore(score + timeLeft / 100);
							setTimeLeft(10000);
						}}
					>
						{obj.answer4}
					</StyledAnswer>
				</Container>
			</Item>
		</Container>
	);
};

export const AskName = ({ name, setName, setQuizState }) => {
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
						<StyledButton
							onClick={() => {
								setQuizState('answerQuestions');
							}}
						>
							Submit
						</StyledButton>
					</Item>
				</Container>
			</Item>
		</Container>
	);
};
