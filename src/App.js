import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';

import styled from 'styled-components';
import { AnswerQuestions, AskName, ShowScoreboard } from './components';
import { getNextQuestion, getTopTen } from './utils';

const Container = styled(({ ...other }) => <Grid container={true} {...other} />)``;

const Item = styled(({ ...other }) => <Grid item={true} {...other} />)``;

const App = () => {
	// Possible values are askName, answerQuestions, showScoreboard
	const [ quizState, setQuizState ] = React.useState('askName');
	const [ name, setName ] = React.useState('');
	const [ questionsAnswered, setQuestionsAnswered ] = React.useState(0);
	const [ score, setScore ] = React.useState(0);

	return (
		<React.Fragment>
			<Container
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh'
				}}
			>
				<Item
					xs={8}
					style={{
						backgroundColor: '#e0dede',
						height: '80vh'
					}}
				>
					{/**
           * Render the app itself here: depending on quiz state either name should be asked or questions or scoreboard shown
           */}
					{quizState === 'askName' ? (
						<AskName name={name} setName={setName} setQuizState={setQuizState} />
					) : quizState === 'answerQuestions' ? (
						<AnswerQuestions
							setQuizState={setQuizState}
							questionsAnswered={questionsAnswered}
							setQuestionsAnswered={setQuestionsAnswered}
							score={score}
							setScore={setScore}
							getNextQuestion={getNextQuestion}
						/>
					) : quizState === 'showScoreboard' ? (
						<ShowScoreboard
							name={name}
							setName={setName}
							score={score}
							setScore={setScore}
							setQuizState={setQuizState}
							getTopTen={getTopTen}
						/>
					) : (
						undefined
					)}
				</Item>
			</Container>
		</React.Fragment>
	);
};

export default App;
