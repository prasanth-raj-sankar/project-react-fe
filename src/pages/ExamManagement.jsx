import { useState, useEffect } from "react";
import "./ExamManagement.css";

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({
    subjectName: "",
    examDesc: "",
    examLevel: "",
    totalQuestions: "",
    totalMarks: "",
    passMarks: "",
  });

  // Fetch exams from the backend
  const fetchExams = async () => {
    try {
      const response = await fetch("https://project-be-qpt1.onrender.com/exams/get-exams");
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  // Fetch exams on component load
  useEffect(() => {
    fetchExams();
  }, []);

  const handleAddExam = async () => {
    if (newExam.subjectName && newExam.examDesc) {
      try {
        const response = await fetch("https://project-be-qpt1.onrender.com/exams/add-exam", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newExam,
            creationDate: new Date().toLocaleString(),
          }),
        });

        if (response.ok) {
          // Clear the input fields after adding the exam
          setNewExam({
            subjectName: "",
            examDesc: "",
            examLevel: "",
            totalQuestions: "",
            totalMarks: "",
            passMarks: "",
          });
          // Re-fetch the exam list to update UI
          fetchExams();
        } else {
          const data = await response.json();
          alert("Error: " + data.msg);
        }
      } catch (error) {
        alert("Error adding exam: " + error.message);
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        const response = await fetch(
          `https://project-be-qpt1.onrender.com/exams/delete-exam/${examId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Exam deleted successfully");
          // Re-fetch exams after deletion
          fetchExams();
        } else {
          const data = await response.json();
          alert("Error: " + data.msg);
        }
      } catch (error) {
        alert("Error deleting exam: " + error.message);
      }
    }
  };

  return (
    <div className="exam-management">
      <h2>Exam List</h2>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Exam Desc.</th>
            <th>Exam Creation Date</th>
            <th>Exam Level</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={index}>
              <td>{exam.subjectName}</td>
              <td>{exam.examDesc}</td>
              <td>{exam.creationDate}</td>
              <td>{exam.examLevel}</td>
              <td>
                <button className="option-btn">Details</button>
                {/* <button className="option-btn">View Questions</button> */}
                <button
                  className="option-btn"
                  onClick={() =>
                    (window.location.href =
                      "/admin-dashboard/exams/add-question")
                  }
                >
                  Add Question
                </button>
                {/* <button className="option-btn delete-btn">Delete</button> */}
                <button
                  className="option-btn delete-btn"
                  onClick={() => handleDeleteExam(exam._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-exam-form">
        <label>Enter Subject Name</label>
        <input
          type="text"
          value={newExam.subjectName}
          onChange={(e) =>
            setNewExam({ ...newExam, subjectName: e.target.value })
          }
          placeholder="Enter Subject Name"
        />
        <label>Enter Exam Desc.</label>
        <input
          type="text"
          value={newExam.examDesc}
          onChange={(e) => setNewExam({ ...newExam, examDesc: e.target.value })}
          placeholder="Enter Exam Description"
        />
        <label>Enter Exam Level</label>
        <input
          type="text"
          value={newExam.examLevel}
          onChange={(e) =>
            setNewExam({ ...newExam, examLevel: e.target.value })
          }
          placeholder="Enter Exam Level"
        />
        <label>Enter Total Questions</label>
        <input
          type="number"
          value={newExam.totalQuestions}
          onChange={(e) =>
            setNewExam({ ...newExam, totalQuestions: e.target.value })
          }
          placeholder="Enter Total Questions"
        />
        <label>Enter Total Marks</label>
        <input
          type="number"
          value={newExam.totalMarks}
          onChange={(e) =>
            setNewExam({ ...newExam, totalMarks: e.target.value })
          }
          placeholder="Enter Total Marks"
        />
        <label>Enter Pass Marks</label>
        <input
          type="number"
          value={newExam.passMarks}
          onChange={(e) =>
            setNewExam({ ...newExam, passMarks: e.target.value })
          }
          placeholder="Enter Pass Marks"
        />
        <div className="form-buttons">
          <button className="add-btn" onClick={handleAddExam}>
            Add
          </button>
          <button
            className="close-btn"
            onClick={() =>
              setNewExam({
                subjectName: "",
                examDesc: "",
                examLevel: "",
                totalQuestions: "",
                totalMarks: "",
                passMarks: "",
              })
            }
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamManagement;


