import React from 'react';
import { Grid } from '@material-ui/core';

import styled from 'styled-components';
import { AnswerQuestions, AskName, ShowScoreboard } from './components';
import { getQuestions, getTopTen } from './utils';

const Container = styled(({ ...other }) => <Grid container={true} {...other} />)``;

const Item = styled(({ ...other }) => <Grid item={true} {...other} />)``;

const App = () => {
	// Possible values are askName, answerQuestions, showScoreboard
	const [ quizState, setQuizState ] = React.useState('askName');
	const [ name, setName ] = React.useState('');
	const [ questionsAnswered, setQuestionsAnswered ] = React.useState(0);
	const [ score, setScore ] = React.useState(0);
	const [ questions, setQuestions ] = React.useState([]);
	const [ scores, setScores ] = React.useState([]);

	React.useEffect(() => {
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
	}, []);

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
							data={questions}
							setQuizState={setQuizState}
							questionsAnswered={questionsAnswered}
							setQuestionsAnswered={setQuestionsAnswered}
							score={score}
							setScore={setScore}
						/>
					) : quizState === 'showScoreboard' ? (
						<ShowScoreboard
							scores={scores}
							name={name}
							setName={setName}
							score={score}
							setScore={setScore}
							setQuizState={setQuizState}
							setData={setQuestions}
							setScores={setScores}
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
