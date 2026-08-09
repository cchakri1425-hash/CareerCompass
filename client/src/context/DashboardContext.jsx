import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { dashboardService } from '../services/dashboardService';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user ? user._id || user.id || 'guest_user' : 'guest_user';

  const [loading, setLoading] = useState(true);
  const [dashData, setDashData] = useState({
    bio: 'Passionate student navigating my dream career path with Career Compass.',
    location: 'India',
    socialLinks: { github: '', linkedin: '', portfolio: '' },
    studyHoursThisWeek: 14.5,
    careerReadinessScore: 72,
    tasks: [],
    goals: [],
    notes: [],
    calendarEvents: [],
    internships: [],
    projects: [],
    certificates: [],
    skills: [],
    achievements: [],
    notifications: [],
    activityLog: [],
    customization: {
      theme: 'glassmorphism',
      accentColor: '#6366f1',
      hiddenWidgets: [],
      layoutDensity: 'comfortable'
    },
    resumeData: {
      summary: '',
      location: '',
      phone: '',
      github: '',
      linkedin: '',
      portfolio: ''
    }
  });

  // Load dashboard data on mount or userId change
  useEffect(() => {
    fetchDashboard();
  }, [userId]);

  const fetchDashboard = async () => {
    setLoading(true);
    const res = await dashboardService.getDashboardData(userId);
    if (res.data) {
      setDashData((prev) => ({ ...prev, ...res.data }));
    }
    setLoading(false);
  };

  // Helper to trigger API save and state update
  const syncUpdate = async (updatedFields) => {
    setDashData((prev) => {
      const nextState = { ...prev, ...updatedFields };
      dashboardService.updateDashboardData(userId, nextState);
      return nextState;
    });
  };

  // Activity Log helper
  const addActivityLog = (title, icon = '📌', type = 'general') => {
    const newLog = {
      id: 'act_' + Date.now(),
      title,
      timestamp: new Date().toISOString(),
      icon,
      type
    };
    const updated = [newLog, ...(dashData.activityLog || []).slice(0, 19)];
    syncUpdate({ activityLog: updated });
  };

  // --- TASKS MODULE ---
  const addTask = (task) => {
    const newTask = {
      id: 't_' + Date.now(),
      title: task.title,
      category: task.category || 'General',
      priority: task.priority || 'Medium',
      completed: false,
      dueDate: task.dueDate || 'Soon'
    };
    const updatedTasks = [newTask, ...dashData.tasks];
    syncUpdate({ tasks: updatedTasks });
    addActivityLog(`Added task: "${newTask.title}"`, '📋', 'task');
  };

  const toggleTask = (taskId) => {
    const updatedTasks = dashData.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    syncUpdate({ tasks: updatedTasks });
  };

  const deleteTask = (taskId) => {
    const updatedTasks = dashData.tasks.filter((t) => t.id !== taskId);
    syncUpdate({ tasks: updatedTasks });
  };

  // --- GOALS MODULE ---
  const addGoal = (goal) => {
    const newGoal = {
      id: 'g_' + Date.now(),
      title: goal.title,
      category: goal.category || 'Career',
      type: goal.type || 'short-term',
      targetDate: goal.targetDate || 'In 1 month',
      progress: Number(goal.progress || 0),
      completed: false
    };
    const updatedGoals = [newGoal, ...dashData.goals];
    syncUpdate({ goals: updatedGoals });
    addActivityLog(`Created new goal: "${newGoal.title}"`, '🎯', 'goal');
  };

  const updateGoalProgress = (goalId, newProgress) => {
    const updatedGoals = dashData.goals.map((g) =>
      g.id === goalId ? { ...g, progress: newProgress, completed: newProgress >= 100 } : g
    );
    syncUpdate({ goals: updatedGoals });
  };

  const deleteGoal = (goalId) => {
    const updatedGoals = dashData.goals.filter((g) => g.id !== goalId);
    syncUpdate({ goals: updatedGoals });
  };

  // --- NOTES MODULE ---
  const addNote = (note) => {
    const newNote = {
      id: 'n_' + Date.now(),
      title: note.title || 'Untitled Note',
      content: note.content || '',
      folder: note.folder || 'General',
      isPinned: false,
      createdAt: new Date().toISOString()
    };
    const updatedNotes = [newNote, ...dashData.notes];
    syncUpdate({ notes: updatedNotes });
    addActivityLog(`Created note: "${newNote.title}"`, '📝', 'note');
  };

  const updateNote = (noteId, fields) => {
    const updatedNotes = dashData.notes.map((n) => (n.id === noteId ? { ...n, ...fields } : n));
    syncUpdate({ notes: updatedNotes });
  };

  const deleteNote = (noteId) => {
    const updatedNotes = dashData.notes.filter((n) => n.id !== noteId);
    syncUpdate({ notes: updatedNotes });
  };

  // --- CALENDAR EVENTS ---
  const addCalendarEvent = (event) => {
    const newEvt = {
      id: 'evt_' + Date.now(),
      title: event.title,
      date: event.date,
      type: event.type || 'study',
      status: 'Upcoming',
      description: event.description || ''
    };
    const updatedEvents = [...dashData.calendarEvents, newEvt];
    syncUpdate({ calendarEvents: updatedEvents });
    addActivityLog(`Scheduled event: "${newEvt.title}" on ${newEvt.date}`, '📅', 'event');
  };

  const deleteCalendarEvent = (eventId) => {
    const updatedEvents = dashData.calendarEvents.filter((e) => e.id !== eventId);
    syncUpdate({ calendarEvents: updatedEvents });
  };

  // --- INTERNSHIPS MODULE ---
  const addInternship = (internship) => {
    const newInt = {
      id: 'int_' + Date.now(),
      company: internship.company,
      role: internship.role,
      status: internship.status || 'Applied',
      appliedDate: internship.appliedDate || new Date().toISOString().split('T')[0],
      deadline: internship.deadline || '',
      salary: internship.salary || '',
      notes: internship.notes || ''
    };
    const updatedInts = [newInt, ...dashData.internships];
    syncUpdate({ internships: updatedInts });
    addActivityLog(`Added internship application: ${newInt.role} at ${newInt.company}`, '💼', 'internship');
  };

  const updateInternshipStatus = (id, status) => {
    const updatedInts = dashData.internships.map((i) => (i.id === id ? { ...i, status } : i));
    syncUpdate({ internships: updatedInts });
    addActivityLog(`Updated internship status to ${status}`, '💼', 'internship');
  };

  const deleteInternship = (id) => {
    const updatedInts = dashData.internships.filter((i) => i.id !== id);
    syncUpdate({ internships: updatedInts });
  };

  // --- PROJECTS MODULE ---
  const addProject = (project) => {
    const newProj = {
      id: 'p_' + Date.now(),
      title: project.title,
      description: project.description || '',
      techStack: Array.isArray(project.techStack) ? project.techStack : (project.techStack || '').split(',').map(s => s.trim()),
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      status: project.status || 'In Progress'
    };
    const updatedProjects = [newProj, ...dashData.projects];
    syncUpdate({ projects: updatedProjects });
    addActivityLog(`Added project to portfolio: "${newProj.title}"`, '🚀', 'project');
  };

  const deleteProject = (id) => {
    const updatedProjects = dashData.projects.filter((p) => p.id !== id);
    syncUpdate({ projects: updatedProjects });
  };

  // --- CERTIFICATES MODULE ---
  const addCertificate = (cert) => {
    const newCert = {
      id: 'c_' + Date.now(),
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate || 'Recently',
      credentialUrl: cert.credentialUrl || '',
      category: cert.category || 'Development'
    };
    const updatedCerts = [newCert, ...dashData.certificates];
    syncUpdate({ certificates: updatedCerts });
    addActivityLog(`Added certificate: "${newCert.title}"`, '📜', 'certificate');
  };

  const deleteCertificate = (id) => {
    const updatedCerts = dashData.certificates.filter((c) => c.id !== id);
    syncUpdate({ certificates: updatedCerts });
  };

  // --- CUSTOMIZATION & THEME ---
  const updateCustomization = (customFields) => {
    const updatedCust = { ...dashData.customization, ...customFields };
    syncUpdate({ customization: updatedCust });
  };

  const toggleWidgetVisibility = (widgetKey) => {
    const currentHidden = dashData.customization.hiddenWidgets || [];
    const isHidden = currentHidden.includes(widgetKey);
    const updatedHidden = isHidden
      ? currentHidden.filter((k) => k !== widgetKey)
      : [...currentHidden, widgetKey];
    updateCustomization({ hiddenWidgets: updatedHidden });
  };

  // --- NOTIFICATIONS MODULE ---
  const markNotificationRead = (notifId) => {
    const updatedNotifs = dashData.notifications.map((n) =>
      n.id === notifId ? { ...n, read: true } : n
    );
    syncUpdate({ notifications: updatedNotifs });
  };

  const clearAllNotifications = () => {
    syncUpdate({ notifications: [] });
  };

  // --- RESUME DATA ---
  const updateResumeData = (resumeFields) => {
    const updatedResume = { ...dashData.resumeData, ...resumeFields };
    syncUpdate({ resumeData: updatedResume });
  };

  return (
    <DashboardContext.Provider
      value={{
        dashData,
        loading,
        fetchDashboard,
        syncUpdate,
        addTask,
        toggleTask,
        deleteTask,
        addGoal,
        updateGoalProgress,
        deleteGoal,
        addNote,
        updateNote,
        deleteNote,
        addCalendarEvent,
        deleteCalendarEvent,
        addInternship,
        updateInternshipStatus,
        deleteInternship,
        addProject,
        deleteProject,
        addCertificate,
        deleteCertificate,
        updateCustomization,
        toggleWidgetVisibility,
        markNotificationRead,
        clearAllNotifications,
        updateResumeData,
        addActivityLog
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
