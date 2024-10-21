import { useLocation } from 'react-router-dom';
import './ResultPage.css'; // Assuming you have some styles

const ResultPage = () => {
  const { state } = useLocation();
  const { result } = state;

  return (
    <div className="result-page">
      <h2>Result for {result.subject}</h2>
      <p>Total Marks: {result.totalMarks}</p>
      <p>Your Score: {result.score}</p>
      <p>Pass Marks: {result.passMarks}</p>
      <p>{result.passed ? 'Congratulations, You Passed!' : 'Sorry, You Failed.'}</p>
    </div>
  );
};

export default ResultPage;
