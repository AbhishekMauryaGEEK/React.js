// Advanced Task Manager JavaScript
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.categories = JSON.parse(localStorage.getItem('categories')) || [
            'personal', 'work', 'health', 'education', 'shopping', 'other'
        ];
        this.settings = JSON.parse(localStorage.getItem('settings')) || {
            notifications: true,
            autoSort: false,
            reminderTime: 30,
            theme: 'light'
        };
        this.currentFilter = 'all';
        this.currentSort = 'date-created';
        this.sortOrder = 'desc';
        this.searchQuery = '';
        this.selectedTasks = new Set();

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.renderTasks();
        this.updateStats();
        this.setupNotifications();
        this.startReminderSystem();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-switch').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Task form submission
        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderTasks();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderTasks();
            });
        });

        // Sort functionality
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderTasks();
        });

        document.getElementById('sort-order').addEventListener('click', () => {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            const icon = document.querySelector('#sort-order i');
            icon.className = this.sortOrder === 'asc' ? 'fas fa-sort-amount-up' : 'fas fa-sort-amount-down';
            this.renderTasks();
        });

        // Bulk actions
        document.getElementById('select-all-btn').addEventListener('click', () => {
            this.toggleSelectAll();
        });

        document.getElementById('delete-selected-btn').addEventListener('click', () => {
            this.deleteSelectedTasks();
        });

        // Settings panel
        document.getElementById('settings-toggle').addEventListener('click', () => {
            this.toggleSettings();
        });

        // Settings controls
        document.getElementById('notifications-enabled').addEventListener('change', (e) => {
            this.settings.notifications = e.target.checked;
            this.saveSettings();
        });

        document.getElementById('auto-sort').addEventListener('change', (e) => {
            this.settings.autoSort = e.target.checked;
            this.saveSettings();
            if (e.target.checked) {
                this.currentSort = 'priority';
                this.renderTasks();
            }
        });

        document.getElementById('reminder-time').addEventListener('change', (e) => {
            this.settings.reminderTime = parseInt(e.target.value);
            this.saveSettings();
        });

        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('clear-all').addEventListener('click', () => {
            this.clearAllTasks();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'n':
                        e.preventDefault();
                        document.getElementById('task-input').focus();
                        break;
                    case 'f':
                        e.preventDefault();
                        document.getElementById('search-input').focus();
                        break;
                    case 'd':
                        e.preventDefault();
                        this.toggleTheme();
                        break;
                }
            }
            
            if (e.key === 'Escape') {
                this.clearSelection();
                document.getElementById('search-input').value = '';
                this.searchQuery = '';
                this.renderTasks();
            }
        });

        // Auto-save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveTasks();
            this.saveSettings();
        });
    }

    addTask() {
        const taskInput = document.getElementById('task-input');
        const prioritySelect = document.getElementById('priority-select');
        const categorySelect = document.getElementById('category-select');
        const dueDateInput = document.getElementById('due-date');

        const taskText = taskInput.value.trim();
        if (!taskText) {
            this.showToast('Please enter a task description', 'warning');
            return;
        }

        const task = {
            id: Date.now() + Math.random(),
            text: taskText,
            completed: false,
            priority: prioritySelect.value,
            category: categorySelect.value,
            dueDate: dueDateInput.value || null,
            createdAt: new Date().toISOString(),
            completedAt: null,
            reminder: this.settings.reminderTime > 0 ? this.settings.reminderTime : null
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();

        // Clear form
        taskInput.value = '';
        dueDateInput.value = '';
        prioritySelect.value = 'low';
        categorySelect.value = 'personal';

        // Show success message
        this.showToast('Task added successfully!', 'success');

        // Animate the new task
        setTimeout(() => {
            const taskElements = document.querySelectorAll('.task-item');
            const newTask = taskElements[taskElements.length - 1];
            if (newTask) {
                newTask.style.animation = 'bounce 0.6s ease';
            }
        }, 100);

        // Auto-sort if enabled
        if (this.settings.autoSort) {
            this.currentSort = 'priority';
            this.renderTasks();
        }
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            
            this.saveTasks();
            this.updateStats();
            
            // Animate the task completion
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            if (taskElement) {
                taskElement.style.transition = 'all 0.5s ease';
                if (task.completed) {
                    taskElement.classList.add('completed');
                    this.showToast('Task completed! 🎉', 'success');
                } else {
                    taskElement.classList.remove('completed');
                    this.showToast('Task marked as pending', 'info');
                }
            }
            
            // Re-render after animation
            setTimeout(() => {
                this.renderTasks();
            }, 500);
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        const taskElement = document.querySelector(`[data-task-id="${taskId}"] .task-text`);
        const currentText = task.text;

        // Create inline edit input
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'inline-edit-input';
        input.style.cssText = `
            width: 100%;
            padding: 8px;
            border: 2px solid var(--accent-color);
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 500;
            background: var(--primary-bg);
            color: var(--text-primary);
        `;

        taskElement.replaceWith(input);
        input.focus();
        input.select();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                task.text = newText;
                this.saveTasks();
                this.showToast('Task updated successfully', 'success');
            }
            this.renderTasks();
        };

        const cancelEdit = () => {
            this.renderTasks();
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            } else if (e.key === 'Escape') {
                cancelEdit();
            }
        });
    }

    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex > -1) {
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            
            // Animate deletion
            if (taskElement) {
                taskElement.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    this.tasks.splice(taskIndex, 1);
                    this.saveTasks();
                    this.renderTasks();
                    this.updateStats();
                    this.showToast('Task deleted', 'info');
                }, 300);
            }
        }
    }

    filterTasks(tasks) {
        let filteredTasks = [...tasks];

        // Apply search filter
        if (this.searchQuery) {
            filteredTasks = filteredTasks.filter(task =>
                task.text.toLowerCase().includes(this.searchQuery) ||
                task.category.toLowerCase().includes(this.searchQuery)
            );
        }

        // Apply status filter
        switch (this.currentFilter) {
            case 'completed':
                filteredTasks = filteredTasks.filter(task => task.completed);
                break;
            case 'pending':
                filteredTasks = filteredTasks.filter(task => !task.completed);
                break;
            case 'overdue':
                const now = new Date();
                filteredTasks = filteredTasks.filter(task => {
                    return task.dueDate && new Date(task.dueDate) < now && !task.completed;
                });
                break;
        }

        return filteredTasks;
    }

    sortTasks(tasks) {
        return tasks.sort((a, b) => {
            let comparison = 0;

            switch (this.currentSort) {
                case 'priority':
                    const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
                    comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
                    break;
                case 'due-date':
                    if (!a.dueDate && !b.dueDate) comparison = 0;
                    else if (!a.dueDate) comparison = 1;
                    else if (!b.dueDate) comparison = -1;
                    else comparison = new Date(a.dueDate) - new Date(b.dueDate);
                    break;
                case 'category':
                    comparison = a.category.localeCompare(b.category);
                    break;
                case 'alphabetical':
                    comparison = a.text.localeCompare(b.text);
                    break;
                case 'date-created':
                default:
                    comparison = new Date(b.createdAt) - new Date(a.createdAt);
                    break;
            }

            return this.sortOrder === 'asc' ? comparison : -comparison;
        });
    }

    renderTasks() {
        const tasksContainer = document.getElementById('tasks-list');
        const emptyState = document.getElementById('empty-state');

        let filteredTasks = this.filterTasks(this.tasks);
        filteredTasks = this.sortTasks(filteredTasks);

        if (filteredTasks.length === 0) {
            tasksContainer.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        tasksContainer.style.display = 'block';
        emptyState.style.display = 'none';

        tasksContainer.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');

        // Add event listeners to task elements
        filteredTasks.forEach(task => {
            const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            
            // Checkbox toggle
            const checkbox = taskElement.querySelector('.task-checkbox');
            checkbox.addEventListener('click', () => this.toggleTask(task.id));

            // Task selection
            const selectCheckbox = taskElement.querySelector('.task-select');
            if (selectCheckbox) {
                selectCheckbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.selectedTasks.add(task.id);
                    } else {
                        this.selectedTasks.delete(task.id);
                    }
                    this.updateBulkActions();
                });
            }

            // Edit button
            const editBtn = taskElement.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => this.editTask(task.id));

            // Delete button
            const deleteBtn = taskElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this task?')) {
                    this.deleteTask(task.id);
                }
            });
        });

        this.updateBulkActions();
    }

    createTaskHTML(task) {
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const now = new Date();
        const isOverdue = dueDate && dueDate < now && !task.completed;
        const isDueToday = dueDate && dueDate.toDateString() === now.toDateString();

        let dueDateClass = '';
        let dueDateText = '';
        
        if (dueDate) {
            if (isOverdue) {
                dueDateClass = 'overdue';
                dueDateText = `Overdue: ${this.formatDate(dueDate)}`;
            } else if (isDueToday) {
                dueDateClass = 'due-today';
                dueDateText = `Due today: ${this.formatTime(dueDate)}`;
            } else {
                dueDateText = `Due: ${this.formatDate(dueDate)}`;
            }
        }

        const isSelected = this.selectedTasks.has(task.id);

        return `
            <div class="task-item priority-${task.priority} ${task.completed ? 'completed' : ''}" 
                 data-task-id="${task.id}"
                 style="animation: slideInUp 0.3s ease;">
                <div class="task-content">
                    <div class="task-main">
                        <input type="checkbox" class="task-select" ${isSelected ? 'checked' : ''}>
                        <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="task-info">
                            <div class="task-header">
                                <span class="task-text">${this.escapeHtml(task.text)}</span>
                                <span class="priority-badge ${task.priority}">${task.priority}</span>
                            </div>
                            <div class="task-meta">
                                <div class="meta-item">
                                    <i class="fas fa-tag"></i>
                                    <span class="category-tag">${this.getCategoryIcon(task.category)} ${task.category}</span>
                                </div>
                                ${dueDate ? `
                                    <div class="meta-item">
                                        <i class="fas fa-clock"></i>
                                        <span class="due-date ${dueDateClass}">${dueDateText}</span>
                                    </div>
                                ` : ''}
                                <div class="meta-item">
                                    <i class="fas fa-calendar-plus"></i>
                                    <span>Created: ${this.formatDate(new Date(task.createdAt))}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn edit-btn" title="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            personal: '🏠',
            work: '💼',
            health: '🏥',
            education: '📚',
            shopping: '🛒',
            other: '📌'
        };
        return icons[category] || '📌';
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // Update stat numbers with animation
        this.animateCounter('total-tasks', totalTasks);
        this.animateCounter('completed-tasks', completedTasks);
        this.animateCounter('pending-tasks', pendingTasks);

        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}% Complete`;

        // Update document title
        document.title = `Task Manager Pro - ${pendingTasks} pending`;
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent) || 0;
        const increment = targetValue > currentValue ? 1 : -1;
        const stepTime = Math.abs(Math.floor(100 / Math.abs(targetValue - currentValue))) || 1;

        if (currentValue !== targetValue) {
            const timer = setInterval(() => {
                const current = parseInt(element.textContent);
                if ((increment > 0 && current < targetValue) || (increment < 0 && current > targetValue)) {
                    element.textContent = current + increment;
                } else {
                    element.textContent = targetValue;
                    clearInterval(timer);
                }
            }, stepTime);
        }
    }

    toggleSelectAll() {
        const visibleTasks = this.filterTasks(this.tasks);
        const allSelected = visibleTasks.every(task => this.selectedTasks.has(task.id));

        if (allSelected) {
            visibleTasks.forEach(task => this.selectedTasks.delete(task.id));
        } else {
            visibleTasks.forEach(task => this.selectedTasks.add(task.id));
        }

        this.renderTasks();
        this.updateBulkActions();
    }

    deleteSelectedTasks() {
        if (this.selectedTasks.size === 0) return;

        const count = this.selectedTasks.size;
        if (confirm(`Are you sure you want to delete ${count} selected task${count > 1 ? 's' : ''}?`)) {
            this.tasks = this.tasks.filter(task => !this.selectedTasks.has(task.id));
            this.selectedTasks.clear();
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showToast(`${count} task${count > 1 ? 's' : ''} deleted`, 'success');
        }
    }

    updateBulkActions() {
        const selectAllBtn = document.getElementById('select-all-btn');
        const deleteSelectedBtn = document.getElementById('delete-selected-btn');
        
        const hasSelection = this.selectedTasks.size > 0;
        deleteSelectedBtn.disabled = !hasSelection;
        
        if (hasSelection) {
            deleteSelectedBtn.textContent = `Delete Selected (${this.selectedTasks.size})`;
        } else {
            deleteSelectedBtn.textContent = 'Delete Selected';
        }

        const visibleTasks = this.filterTasks(this.tasks);
        const allSelected = visibleTasks.length > 0 && visibleTasks.every(task => this.selectedTasks.has(task.id));
        selectAllBtn.innerHTML = allSelected ? 
            '<i class="fas fa-square"></i> Deselect All' : 
            '<i class="fas fa-check-square"></i> Select All';
    }

    clearSelection() {
        this.selectedTasks.clear();
        this.updateBulkActions();
        this.renderTasks();
    }

    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');
        
        if (isDark) {
            body.classList.remove('dark-mode');
            this.settings.theme = 'light';
        } else {
            body.classList.add('dark-mode');
            this.settings.theme = 'dark';
        }
        
        this.saveSettings();
        this.showToast(`Switched to ${this.settings.theme} mode`, 'info');
    }

    loadTheme() {
        if (this.settings.theme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        
        // Also check system preference
        if (!this.settings.theme || this.settings.theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-mode');
            }
        }
    }

    toggleSettings() {
        const settingsContent = document.getElementById('settings-content');
        const isActive = settingsContent.classList.contains('active');
        
        if (isActive) {
            settingsContent.classList.remove('active');
        } else {
            settingsContent.classList.add('active');
            // Load current settings
            document.getElementById('notifications-enabled').checked = this.settings.notifications;
            document.getElementById('auto-sort').checked = this.settings.autoSort;
            document.getElementById('reminder-time').value = this.settings.reminderTime;
        }
    }

    exportData() {
        const data = {
            tasks: this.tasks,
            categories: this.categories,
            settings: this.settings,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `task-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('Data exported successfully!', 'success');
    }

    clearAllTasks() {
        if (confirm('Are you sure you want to delete ALL tasks? This action cannot be undone.')) {
            this.tasks = [];
            this.selectedTasks.clear();
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showToast('All tasks cleared', 'info');
        }
    }

    setupNotifications() {
        if ('Notification' in window && this.settings.notifications) {
            if (Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }
    }

    startReminderSystem() {
        // Check for reminders every minute
        setInterval(() => {
            this.checkReminders();
        }, 60000); // 1 minute

        // Initial check
        this.checkReminders();
    }

    checkReminders() {
        if (!this.settings.notifications) return;

        const now = new Date();
        const upcomingTasks = this.tasks.filter(task => {
            if (task.completed || !task.dueDate || !task.reminder) return false;

            const dueDate = new Date(task.dueDate);
            const reminderTime = task.reminder * 60 * 1000; // Convert to milliseconds
            const reminderDate = new Date(dueDate.getTime() - reminderTime);

            return now >= reminderDate && now < dueDate;
        });

        upcomingTasks.forEach(task => {
            this.showNotification(task);
        });
    }

    showNotification(task) {
        const dueDate = new Date(task.dueDate);
        const timeUntilDue = Math.ceil((dueDate - new Date()) / (1000 * 60)); // minutes

        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`Task Reminder: ${task.text}`, {
                body: `Due in ${timeUntilDue} minute${timeUntilDue !== 1 ? 's' : ''}`,
                icon: '/favicon.ico',
                tag: `task-${task.id}`
            });
        }

        // Also show toast notification
        this.showToast(`⏰ Reminder: ${task.text} - Due in ${timeUntilDue} minute${timeUntilDue !== 1 ? 's' : ''}`, 'warning');
    }

    showToast(message, type = 'info', duration = 4000) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <i class="toast-icon ${icons[type]}"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close">&times;</button>
        `;

        toastContainer.appendChild(toast);

        // Add close functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.removeToast(toast);
        });

        // Auto remove after duration
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    }

    removeToast(toast) {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    saveSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
}

// Add some CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .inline-edit-input {
        animation: fadeIn 0.2s ease !important;
    }
    
    .task-item:hover .task-actions {
        opacity: 1;
        transform: translateX(0);
    }
    
    .task-actions {
        opacity: 0.7;
        transform: translateX(10px);
        transition: all 0.3s ease;
    }
    
    .priority-urgent {
        animation: pulse 2s infinite;
    }
    
    @media (max-width: 768px) {
        .task-actions {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);