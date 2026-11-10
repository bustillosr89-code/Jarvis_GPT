 let tasks = [];
        let currentFilter = 'all';

        const taskForm = document.getElementById('task-form');
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');

        const filterAll = document.getElementById('filter-all');
        const filterPending = document.getElementById('filter-pending');
        const filterCompleted = document.getElementById('filter-completed');

        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const text = taskInput.value.trim();
            if (text !== '') {
                const newTask = {
                    id: Date.now(),
                    text: text,
                    completed: false
                };
                tasks.push(newTask);
                taskInput.value = '';
                renderTasks();
            }
        });

        filterAll.addEventListener('click', function() {
            currentFilter = 'all';
            updateActiveFilterButton(filterAll);
            renderTasks();
        });

        filterPending.addEventListener('click', function() {
            currentFilter = 'pending';
            updateActiveFilterButton(filterPending);
            renderTasks();
        });

        filterCompleted.addEventListener('click', function() {
            currentFilter = 'completed';
            updateActiveFilterButton(filterCompleted);
            renderTasks();
        });

        function updateActiveFilterButton(selectedBtn) {
            filterAll.classList.remove('active');
            filterPending.classList.remove('active');
            filterCompleted.classList.remove('active');
            selectedBtn.classList.add('active');
        }

        function renderTasks() {
            taskList.innerHTML = '';

            let filteredTasks = tasks;

            if (currentFilter === 'pending') {
                filteredTasks = tasks.filter(task => !task.completed);
            } else if (currentFilter === 'completed') {
                filteredTasks = tasks.filter(task => task.completed);
            }

            if (filteredTasks.length === 0) {
                taskList.innerHTML = '<li class="empty-msg">No hay tareas para mostrar.</li>';
                return;
            }

            filteredTasks.forEach(function(task) {
                const li = document.createElement('li');
                li.className = 'task-item';
                if (task.completed) {
                    li.classList.add('completed');
                }

                const span = document.createElement('span');
                span.className = 'task-text';
                span.textContent = task.text;

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'task-actions';

                const completeBtn = document.createElement('button');
                completeBtn.className = 'btn-complete';
                completeBtn.textContent = task.completed ? 'Desmarcar' : 'Completar';
                completeBtn.addEventListener('click', function() {
                    task.completed = !task.completed;
                    renderTasks();
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn-delete';
                deleteBtn.textContent = 'Eliminar';
                deleteBtn.addEventListener('click', function() {
                    tasks = tasks.filter(t => t.id !== task.id);
                    renderTasks();
                });

                actionsDiv.appendChild(completeBtn);
                actionsDiv.appendChild(deleteBtn);

                li.appendChild(span);
                li.appendChild(actionsDiv);

                taskList.appendChild(li);
            });
        }

        renderTasks();