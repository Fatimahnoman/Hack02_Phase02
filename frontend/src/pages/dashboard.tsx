import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import TodoForm from '../components/todos/TodoForm';
import TodoList from '../components/todos/TodoList';
import MenuActionsPanel from '../components/todos/MenuActionsPanel';
import { Todo, TodoCreate, TodoUpdate } from '../types';
import { todoAPI } from '../services/api';
import { useRouter } from 'next/router';

const DashboardPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated before accessing dashboard
    if (!localStorage.getItem('access_token')) {
      alert('Signin First then you\'ll able to see the Dashboard');
      router.push('/signin');
      return;
    }

    const fetchTodos = async () => {
      try {
        const response = await todoAPI.getAll();
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
        // Redirect to sign in if unauthorized
        if ((error as any).response?.status === 401) {
          alert('Signin First then you\'ll able to see the Dashboard');
          router.push('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [router]);

  const handleAddTodo = async (todoData: TodoCreate) => {
    try {
      const response = await todoAPI.create(todoData);
      setTodos([...todos, response.data]);
      setViewMode(false); // Reset view mode to show the form again
      setShowAddForm(false); // Hide the form after adding
      setSuccessMessage('Task Added Successfully in Todo List');
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await todoAPI.toggleComplete(id, completed);
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: response.data.completed } : todo
      ));
      const message = completed
        ? 'Task Marked as Complete Successfully'
        : 'Task Marked as Incomplete Successfully';
      setSuccessMessage(message);
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleUpdateTodo = async (id: number, updates: TodoUpdate) => {
    try {
      const response = await todoAPI.update(id, updates);
      setTodos(todos.map(todo =>
        todo.id === id ? response.data : todo
      ));
      setViewMode(false); // Reset view mode to show the form again
      setShowAddForm(false); // Hide the form if it was shown
      setSuccessMessage('Task Updated Successfully in Todo List');
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoAPI.delete(id);
      setTodos(todos.filter(todo => todo.id !== id));
      setViewMode(false); // Reset view mode to show the form again
      setShowAddForm(false); // Hide the form if it was shown
      setSuccessMessage('Task Deleted Successfully from Todo List');
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  // Double check authentication before rendering content
  if (!localStorage.getItem('access_token')) {
    // Show message and redirect
    if (typeof window !== 'undefined') {
      alert('Signin First then you\'ll able to see the Dashboard');
      window.location.href = '/signin';
    }

    return (
      <Layout>
        <div className="container">
          <p>Redirecting to sign in...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="page-header">
          <h1 className="evolution-text">Evolution of Todo</h1>
          <h2>Task Manager</h2>
          <p className="page-subtitle">Organize your tasks and boost your productivity</p>
        </div>

        <MenuActionsPanel
          todos={todos}
          onAddTodo={handleAddTodo}
          onToggleTodo={handleToggleTodo}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
          onSetViewMode={setViewMode}
          onSetShowAddForm={setShowAddForm}
        />

        {/* Success message display */}
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {/* Conditionally render TodoForm based on showAddForm state */}
        {showAddForm && <TodoForm onSubmit={handleAddTodo} />}

        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
          emptyState={<div className="empty-state">No tasks yet. Add one to get started!</div>}
        />
      </div>

      <style jsx global>{`
        .dashboard-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%);
          min-height: calc(100vh - 120px);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .page-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          text-align: center;
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .page-header h1 {
          margin: 0 0 12px 0;
          font-size: 2.2rem;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }

        .page-header h2 {
          margin: 0 0 12px 0;
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          margin: 0;
          color: #4a5568;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .evolution-text {
          margin: 0 0 15px 0;
          font-size: 2rem;
          color: #2b6cb0;
          text-decoration: underline;
          text-decoration-color: #000;
          text-align: center;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .success-message {
          margin: 20px auto;
          padding: 16px 20px;
          background: linear-gradient(135deg, #68d391 0%, #48bb78 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          text-align: center;
          animation: fadeInSlideDown 0.4s ease-out;
          max-width: 500px;
          box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
        }

        @keyframes fadeInSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 20px 15px;
            margin: 15px;
          }

          .page-header {
            padding: 20px;
          }

          .page-header h1 {
            font-size: 1.8rem;
          }

          .page-header h2 {
            font-size: 1.5rem;
          }

          .evolution-text {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default DashboardPage;