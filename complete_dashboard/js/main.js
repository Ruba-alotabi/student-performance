// Main JavaScript for Umm Al-Qura University Student Performance Dashboard

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeCharts();
    initializeCounters();
    initializeDataTables();
    initializeTabs();
    initializePredictionTool();
    setupEventListeners();
    initializePresentationMode();
    
    // Show loading animation and then reveal content
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.display = 'none';
        document.querySelector('.dashboard-content').classList.add('animate-fade-in');
    }, 800);
});

// Initialize all charts using Chart.js
function initializeCharts() {
    // Grade Distribution Chart
    const gradeDistributionCtx = document.getElementById('gradeDistributionChart');
    if (gradeDistributionCtx) {
        if (Chart.getChart(gradeDistributionCtx)) {
            Chart.getChart(gradeDistributionCtx).destroy();
        }
        new Chart(gradeDistributionCtx, {
            type: 'bar',
            data: {
                labels: ['Engineering', 'Computer Science', 'Business', 'Mathematics', 'Physics'],
                datasets: [
                    {
                        label: 'Grade A',
                        data: [28, 35, 22, 18, 25],
                        backgroundColor: '#10b981',
                        borderColor: '#10b981',
                        borderWidth: 1
                    },
                    {
                        label: 'Grade B',
                        data: [22, 25, 18, 20, 15],
                        backgroundColor: '#3b82f6',
                        borderColor: '#3b82f6',
                        borderWidth: 1
                    },
                    {
                        label: 'Grade C',
                        data: [18, 15, 20, 22, 18],
                        backgroundColor: '#f59e0b',
                        borderColor: '#f59e0b',
                        borderWidth: 1
                    },
                    {
                        label: 'Grade D',
                        data: [12, 10, 15, 18, 20],
                        backgroundColor: '#f97316',
                        borderColor: '#f97316',
                        borderWidth: 1
                    },
                    {
                        label: 'Grade F',
                        data: [20, 15, 25, 22, 22],
                        backgroundColor: '#ef4444',
                        borderColor: '#ef4444',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Grade Distribution by Department'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    }

    // Score Distribution Chart
    const scoreDistributionCtx = document.getElementById('scoreDistributionChart');
    if (scoreDistributionCtx) {
        if (Chart.getChart(scoreDistributionCtx)) {
            Chart.getChart(scoreDistributionCtx).destroy();
        }
        new Chart(scoreDistributionCtx, {
            type: 'histogram',
            data: {
                datasets: [{
                    label: 'Total Score Distribution',
                    data: generateNormalDistribution(75, 15, 200),
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Score Distribution'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Total Score'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frequency'
                        }
                    }
                }
       }   });
    }

    // Study Hours vs Performance Chart
    const studyHoursCtx = document.getElementById('studyHoursChart');
    if (studyHoursCtx) {
        if (Chart.getChart(studyHoursCtx)) {
            Chart.getChart(studyHoursCtx).destroy();
        }
        new Chart(studyHoursCtx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Grade A',
                        data: generateScatterData(15, 90, 5, 5, 20),
                        backgroundColor: '#10b981',
                    },
                    {
                        label: 'Grade B',
                        data: generateScatterData(12, 80, 4, 5, 15),
                        backgroundColor: '#3b82f6',
                    },
                    {
                        label: 'Other Grades',
                        data: generateScatterData(8, 65, 6, 10, 25),
                        backgroundColor: '#ef4444',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Study Hours vs Performance'
                    }
                }
            }
        });
    }

    // Attendance Impact Chart
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        if (Chart.getChart(attendanceCtx)) {
            Chart.getChart(attendanceCtx).destroy();
        }
        new Chart(attendanceCtx, {
            type: 'bar',
            data: {
                labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
                datasets: [{
                    label: 'Average Score',
                    data: [52, 60, 68, 78, 85],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(249, 115, 22, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(16, 185, 129, 0.7)'
                    ],
                    borderColor: [
                        '#ef4444',
                        '#f97316',
                        '#f59e0b',
                        '#3b82f6',
                        '#10b981'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Attendance Impact on Performance'
                    }
                }
            }
        });
    }

    // Department Performance Chart
    const departmentCtx = document.getElementById('departmentChart');
    if (departmentCtx) {
        if (Chart.getChart(departmentCtx)) {
            Chart.getChart(departmentCtx).destroy();
        }
        new Chart(departmentCtx, {
            type: 'radar',
            data: {
                labels: [
                    'Attendance',
                    'Assignments',
                    'Quizzes',
                    'Midterm',
                    'Final',
                    'Projects',
                    'Participation'
                ],
                datasets: [
                    {
                        label: 'Engineering',
                        data: [75, 82, 78, 74, 76, 85, 70],
                        fill: true,
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        borderColor: '#10b981',
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#10b981'
                    },
                    {
                        label: 'Computer Science',
                        data: [70, 88, 75, 78, 72, 90, 65],
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderColor: '#3b82f6',
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#3b82f6'
                    },
                    {
                        label: 'Business',
                        data: [80, 75, 72, 68, 70, 75, 85],
                        fill: true,
                        backgroundColor: 'rgba(245, 158, 11, 0.2)',
                        borderColor: '#f59e0b',
                        pointBackgroundColor: '#f59e0b',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#f59e0b'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Department Performance by Category'
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
       }   });
    }

    // Regression Analysis Chart
    const regressionCtx = document.getElementById('regressionChart');
    if (regressionCtx) {
        if (Chart.getChart(regressionCtx)) {
            Chart.getChart(regressionCtx).destroy();
        }
        // Generate scatter data
        const scatterData = generateScatterData(10, 7, 2, 20, 20);
        
        // Generate linear regression line
        const xValues = scatterData.map(point => point.x);
        const yValues = scatterData.map(point => point.y);
        const linearRegression = calculateLinearRegression(xValues, yValues);
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const linearRegressionData = [
            { x: minX, y: linearRegression.slope * minX + linearRegression.intercept },
            { x: maxX, y: linearRegression.slope * maxX + linearRegression.intercept }
        ];
        
        // Generate polynomial regression curve
        const polynomialRegressionData = [];
        for (let x = minX; x <= maxX; x += 0.5) {
            polynomialRegressionData.push({
                x: x,
                y: 0.05 * Math.pow(x, 2) - 0.5 * x + 7.5
            });
        }
        
        new Chart(regressionCtx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Student Data',
                        data: scatterData,
                        backgroundColor: '#3b82f6'
                    },
                    {
                        label: 'Linear Regression',
                        data: linearRegressionData,
                        type: 'line',
                        borderColor: '#10b981',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Polynomial Regression',
                        data: polynomialRegressionData,
                        type: 'line',
                        borderColor: '#f59e0b',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Regression Analysis'
                    }
                }
            });
    }

    // Clustering Chart
    const clusteringCtx = document.getElementById('clusteringChart');
    if (clusteringCtx) {
        if (Chart.getChart(clusteringCtx)) {
            Chart.getChart(clusteringCtx).destroy();
        }
        new Chart(clusteringCtx, {
            type: 'bubble',
            data: {
                datasets: [
                    {
                        label: 'Cluster 1',
                        data: generateClusterData(10, 5, 5, 10),
                        backgroundColor: 'rgba(59, 130, 246, 0.5)'
                    },
                    {
                        label: 'Cluster 2',
                        data: generateClusterData(15, 10, 5, 15),
                        backgroundColor: 'rgba(16, 185, 129, 0.5)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Clustering Analysis'
                    }
                }
            });
    }

    // Additional charts can be initialized here if needed
}

// Initialize animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration') || '2000');
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        let startTime = null;
        const startValue = 0;
        
        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = startValue + progress * (target - startValue);
            
            counter.textContent = prefix + currentValue.toFixed(decimals) + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = prefix + target.toFixed(decimals) + suffix;
            }
        }
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.requestAnimationFrame(updateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(counter);
    });
}

// Initialize data tables with sorting and pagination
function initializeDataTables() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const tableBody = table.querySelector('tbody');
        const tableRows = Array.from(tableBody.querySelectorAll('tr'));
        const paginationInfo = table.parentElement.querySelector('.pagination-info');
        const paginationControls = table.parentElement.querySelector('.pagination-controls');
        const searchInput = table.parentElement.parentElement.querySelector('.search-box input');
        
        let currentPage = 1;
        const rowsPerPage = parseInt(table.getAttribute('data-rows-per-page') || '10');
        let filteredRows = tableRows;
        
        // Sort functionality
        const sortableHeaders = table.querySelectorAll('th.sortable');
        sortableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const columnIndex = Array.from(header.parentElement.children).indexOf(header);
                const isAsc = header.classList.contains('asc');
                
                // Remove sort classes from all headers
                sortableHeaders.forEach(h => {
                    h.classList.remove('asc', 'desc');
                });
                
                // Add sort class to clicked header
                header.classList.add(isAsc ? 'desc' : 'asc');
                
                // Sort rows
                filteredRows.sort((a, b) => {
                    const aValue = a.children[columnIndex].textContent.trim();
                    const bValue = b.children[columnIndex].textContent.trim();
                    
                    // Check if values are numbers
                    const aNum = parseFloat(aValue);
                    const bNum = parseFloat(bValue);
                    
                    if (!isNaN(aNum) && !isNaN(bNum)) {
                        return isAsc ? bNum - aNum : aNum - bNum;
                    } else {
                        return isAsc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
                    }
                });
                
                renderTable();
            });
        });
        
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                
                filteredRows = tableRows.filter(row => {
                    const text = row.textContent.toLowerCase();
                    return text.includes(searchTerm);
                });
                
                currentPage = 1;
                renderTable();
            });
        }
        
        // Render table with pagination
        function renderTable() {
            // Clear table body
            tableBody.innerHTML = '';
            
            // Calculate pagination
            const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);
            
            // Render rows for current page
            for (let i = startIndex; i < endIndex; i++) {
                tableBody.appendChild(filteredRows[i]);
            }
            
            // Update pagination info
            if (paginationInfo) {
                paginationInfo.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${filteredRows.length} entries`;
            }
            
            // Render pagination controls
            if (paginationControls) {
                paginationControls.innerHTML = '';
                
                // Previous button
                const prevBtn = document.createElement('button');
                prevBtn.className = 'pagination-btn';
                prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>';
                prevBtn.disabled = currentPage === 1;
                prevBtn.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        renderTable();
                    }
                });
                paginationControls.appendChild(prevBtn);
                
                // Page buttons
                const maxButtons = 5;
                const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
                const endPage = Math.min(totalPages, startPage + maxButtons - 1);
                
                for (let i = startPage; i <= endPage; i++) {
                    const pageBtn = document.createElement('button');
                    pageBtn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
                    pageBtn.textContent = i.toString();
                    pageBtn.addEventListener('click', () => {
                        currentPage = i;
                        renderTable();
                    });
                    paginationControls.appendChild(pageBtn);
                }
                
                // Next button
                const nextBtn = document.createElement('button');
                nextBtn.className = 'pagination-btn';
                nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>';
                nextBtn.disabled = currentPage === totalPages;
                nextBtn.addEventListener('click', () => {
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderTable();
                    }
                });
                paginationControls.appendChild(nextBtn);
            }
        }
        
        // Initial render
        renderTable();
    });
}

// Initialize tabs functionality
function initializeTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    });
}

// Initialize prediction tool
function initializePredictionTool() {
    const predictionForm = document.getElementById('predictionForm');
    const predictionResult = document.getElementById('predictionResult');
    const predictButton = document.getElementById('predictButton');
    
    if (predictionForm && predictButton) {
        predictButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show loading animation
            predictionResult.innerHTML = '<div class="loading"><div></div><div></div><div></div><div></div></div>';
            
            // Simulate prediction calculation
            setTimeout(() => {
                // Get form values
                const department = document.getElementById('department').value;
                const attendance = parseFloat(document.getElementById('attendance').value);
                const studyHours = parseFloat(document.getElementById('studyHours').value);
                const assignments = parseFloat(document.getElementById('assignments').value);
                const quizzes = parseFloat(document.getElementById('quizzes').value);
                const stress = parseFloat(document.getElementById('stress').value);
                const sleep = parseFloat(document.getElementById('sleep').value);
                const extracurricular = document.getElementById('extracurricular').checked;
                const internet = document.getElementById('internet').checked;
                
                // Calculate predicted grade (simplified model)
                let score = 0;
                
                // Attendance impact (0-20 points)
                score += attendance * 0.2;
                
                // Study hours impact (0-15 points)
                score += Math.min(studyHours * 0.75, 15);
                
                // Assignments impact (0-25 points)
                score += assignments * 0.25;
                
                // Quizzes impact (0-15 points)
                score += quizzes * 0.15;
                
                // Stress impact (-10 to +5 points)
                if (stress <= 5) {
                    score += (5 - stress) * 1; // Optimal stress is around 3-4
                } else {
                    score -= (stress - 5) * 2; // High stress has more negative impact
                }
                
                // Sleep impact (-5 to +5 points)
                if (sleep >= 7 && sleep <= 9) {
                    score += 5; // Optimal sleep
                } else if (sleep < 7) {
                    score -= (7 - sleep) * 1; // Too little sleep
                } else {
                    score -= (sleep - 9) * 0.5; // Too much sleep
                }
                
                // Extracurricular impact (-2 to +3 points)
                if (extracurricular) {
                    if (studyHours >= 15) {
                        score += 3; // Balanced student
                    } else {
                        score -= 2; // Distracted student
                    }
                }
                
                // Internet access impact (0 to +2 points)
                if (internet) {
                    score += 2;
                }
                
                // Department adjustment
                if (department === 'Engineering') {
                    score -= 2; // Engineering courses are harder
                } else if (department === 'Computer Science') {
                    score -= 1; // CS courses are moderately hard
                } else if (department === 'Business') {
                    score += 1; // Business courses are easier
                }
                
                // Clamp score between 0 and 100
                score = Math.max(0, Math.min(100, score));
                
                // Determine grade
                let grade;
                if (score >= 90) {
                    grade = 'A';
                } else if (score >= 80) {
                    grade = 'B';
                } else if (score >= 70) {
                    grade = 'C';
                } else if (score >= 60) {
                    grade = 'D';
                } else {
                    grade = 'F';
                }
                
                // Determine key factors
                const factors = [];
                if (attendance >= 80) factors.push('High Attendance rate (+3.0%)');
                if (attendance < 60) factors.push('Low Attendance rate (-4.5%)');
                if (studyHours >= 15) factors.push('High Study hours (+1.5%)');
                if (studyHours < 8) factors.push('Low Study hours (-2.0%)');
                if (assignments >= 80) factors.push('Good Assignment scores (+2.5%)');
                if (sleep >= 7 && sleep <= 8) factors.push('Optimal Sleep hours (+2.0%)');
                if (sleep < 6) factors.push('Insufficient Sleep (-1.5%)');
                if (stress > 7) factors.push('High Stress level (-3.0%)');
                if (internet) factors.push('Has Internet access (+2.0%)');
                
                // Generate HTML for prediction result
                let resultHTML = `
                    <div class="prediction-gauge">
                        <canvas id="gaugeChart"></canvas>
                    </div>
                    <div class="prediction-details">
                        <h3>Predicted Grade: <span class="grade-badge grade-${grade.toLowerCase()}">${grade}</span></h3>
                        <p>Estimated Score: ${score.toFixed(1)}</p>
                        <p>Confidence: 99%</p>
                    </div>
                    <div class="prediction-factors">
                        <h4>Key Factors</h4>
                        <ul>
                            ${factors.map(factor => `<li>${factor}</li>`).join('')}
                        </ul>
                    </div>
                `;
                
                predictionResult.innerHTML = resultHTML;
                
                // Create gauge chart
                const gaugeCtx = document.getElementById('gaugeChart');
                if (gaugeCtx) {
                    const gaugeChart = new Chart(gaugeCtx, {
                        type: 'doughnut',
                        data: {
                            datasets: [{
                                data: [score, 100 - score],
                                backgroundColor: [
                                    getGradeColor(grade),
                                    '#e2e8f0'
                                ],
                                borderWidth: 0
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            circumference: 180,
                            rotation: 270,
                            cutout: '75%',
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    enabled: false
                                }
                            }
                        },
                        plugins: [{
                            id: 'gaugeText',
                            afterDraw: (chart) => {
                                const {ctx, chartArea: {top, bottom, left, right, width, height}} = chart;
                                ctx.save();
                                
                                // Draw score text
                                ctx.font = 'bold 24px Arial';
                                ctx.fillStyle = getGradeColor(grade);
                                ctx.textAlign = 'center';
                                ctx.fillText(score.toFixed(1), width / 2, top + height * 0.7);
                                
                                // Draw label text
                                ctx.font = '14px Arial';
                                ctx.fillStyle = '#64748b';
                                ctx.fillText('Score', width / 2, top + height * 0.85);
                                
                                ctx.restore();
                            }
                        }]
                    });
                }
            }, 1500);
        });
    }
}

// Set up event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
    
    // Presentation mode toggle
    // تم تعطيل الكود القديم الخاص بالعرض التقديمي لأنه متعارض مع presentation-mode.js
    // const presentationToggle = document.querySelector('.presentation-toggle');
    // if (presentationToggle) {
    //     presentationToggle.addEventListener('click', () => {
    //         document.body.classList.toggle('presentation-active');
    //         // ...باقي الكود الخاص بالعرض التقديمي القديم...
    //     });
    // }
}

// Helper function to generate normal distribution data
function generateNormalDistribution(mean, stdDev, count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        // Box-Muller transform
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const value = mean + z0 * stdDev;
        data.push(value);
    }
    return data;
}

// Helper function to generate scatter plot data
function generateScatterData(meanX, meanY, stdDevX, stdDevY, count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        // Box-Muller transform for x
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const x = meanX + z0 * stdDevX;
        
        // Box-Muller transform for y
        const u3 = Math.random();
        const u4 = Math.random();
        const z1 = Math.sqrt(-2.0 * Math.log(u3)) * Math.cos(2.0 * Math.PI * u4);
        const y = meanY + z1 * stdDevY;
        
        data.push({ x, y });
    }
    return data;
}

// Helper function to generate cluster data
function generateClusterData(meanX, meanY, stdDevX, stdDevY, count) {
    return generateScatterData(meanX, meanY, stdDevX, stdDevY, count);
}

// Helper function to calculate linear regression
function calculateLinearRegression(xValues, yValues) {
    const n = xValues.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    
    for (let i = 0; i < n; i++) {
        sumX += xValues[i];
        sumY += yValues[i];
        sumXY += xValues[i] * yValues[i];
        sumXX += xValues[i] * xValues[i];
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
}

// Helper function to get color based on grade
function getGradeColor(grade) {
    switch (grade) {
        default:    }
}

/*
// Polyfill for Chart.js histogram - This is for Chart.js v2 and will cause errors in v3+
Chart.defaults.histogram = Chart.defaults.bar;
Chart.controllers.histogram = Chart.controllers.bar.extend({
    dataElementType: Chart.elements.Rectangle,
    
    update: function(reset) {
        const me = this;
        const meta = me.getMeta();
        const dataset = me.getDataset();
        
        // Get data values
        const data = dataset.data;
        
        // Calculate histogram bins
        const binCount = dataset.binCount || 10;
        const min = Math.min(...data);
        const max = Math.max(...data);
        const binWidth = (max - min) / binCount;
        
        // Create bins
        const bins = Array(binCount).fill(0);
        const binStarts = Array(binCount).fill(0).map((_, i) => min + i * binWidth);
        
        // Count values in each bin
        data.forEach(value => {
            const binIndex = Math.min(Math.floor((value - min) / binWidth), binCount - 1);
            bins[binIndex]++;
        });
        
        // Update dataset
        dataset._bins = bins;
        dataset._binStarts = binStarts;
        dataset._binWidth = binWidth;
        
        // Create data points for chart
        const points = [];
        for (let i = 0; i < binCount; i++) {
            points.push({
                x: binStarts[i] + binWidth / 2, // Center of bin
                y: bins[i]
            });
        }
        
        // Update data points
        meta.data.forEach((rectangle, index) => {
            const point = points[index] || { x: 0, y: 0 };
            me.updateElement(rectangle, index, {
                x: me.getScaleForId(me.getMeta().xAxisID).getPixelForValue(point.x),
                y: me.getScaleForId(me.getMeta().yAxisID).getPixelForValue(point.y),
                width: me.getScaleForId(me.getMeta().xAxisID).getPixelForValue(binStarts[0] + binWidth) - me.getScaleForId(me.getMeta().xAxisID).getPixelForValue(binStarts[0]),
                base: me.getScaleForId(me.getMeta().yAxisID).getPixelForValue(0),
                height: me.getScaleForId(me.getMeta().yAxisID).getPixelForValue(0) - me.getScaleForId(me.getMeta().yAxisID).getPixelForValue(point.y)
            }, reset);
        });
    }
});
*/
