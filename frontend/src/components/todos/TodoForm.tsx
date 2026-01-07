import React, { useState } from 'react';
import { TodoCreate } from '../../types';

interface TodoFormProps {
  onSubmit: (todo: TodoCreate) => void;
}

const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Format the date to ISO string if provided
    let formattedDueDate: string | undefined = undefined;
    if (dueDate) {
      // Create a new Date object and set it to UTC midnight to avoid timezone issues
      const date = new Date(dueDate);
      formattedDueDate = date.toISOString();
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      due_date: formattedDueDate
    });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-header">
        <h2>Add New Task</h2>
        <p className="form-subtitle">Create a new task to stay organized</p>
      </div>

      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="title-input"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          className="description-input"
        />
      </div>
      <div className="form-group">
        <label className="date-label">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
      </div>
      <button type="submit" className="submit-btn btn-primary">Add Task</button>
      <style jsx>{`
        .todo-form {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .form-header {
          margin-bottom: 25px;
          text-align: center;
        }

        .form-header h2 {
          margin: 0 0 8px 0;
          font-size: 1.6rem;
          font-weight: 700;
          color: #2d3748;
          background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-subtitle {
          margin: 0;
          color: #718096;
          font-size: 1rem;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .date-label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #4a5568;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .title-input, .description-input, .date-input {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1.05rem;
          transition: all 0.3s ease;
          background: white;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .title-input:focus, .description-input:focus, .date-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .description-input {
          height: 120px;
          resize: vertical;
          font-family: inherit;
          line-height: 1.5;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        @media (max-width: 768px) {
          .todo-form {
            padding: 25px 20px;
          }

          .form-header h2 {
            font-size: 1.4rem;
          }

          .form-subtitle {
            font-size: 0.95rem;
          }

          .title-input, .description-input, .date-input {
            padding: 12px 16px;
            font-size: 1rem;
          }
        }
      `}</style>
    </form>
  );
};

export default TodoForm;