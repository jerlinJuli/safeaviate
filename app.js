class FlightGuardianApp {
    constructor() {
        this.anomalies = [];
        this.systems = [];
        this.isMonitoring = true;
        this.init();
    }

    init() {
        console.log('FlightGuardian AI System Initializing...');
        this.setupEventListeners();
        this.startMonitoring();
        this.initializeSystems();
        this.displayStartupMessage();
    }

    setupEventListeners() {
        document.querySelectorAll('.emergency-protocol-btn').forEach(btn => {
            btn.addEventListener('click', () => this.activateEmergencyProtocol());
        });

        document.querySelectorAll('.contact-aircraft-btn').forEach(btn => {
            btn.addEventListener('click', () => this.contactAircraft());
        });

        document.querySelectorAll('.protocol-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const protocol = e.target.closest('.protocol-btn').dataset.protocol;
                this.activateProtocol(protocol);
            });
        });

        document.querySelector('.send-update-btn').addEventListener('click', () => {
            this.sendFamilyUpdate();
        });

        document.querySelectorAll('.system-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.toggleSystemStatus(e.currentTarget);
            });
        });
    }

    startMonitoring() {
        setInterval(() => {
            this.updateAnomalyDetection();
        }, 5000);

        setInterval(() => {
            this.simulateSystemChanges();
        }, 10000);

        setInterval(() => {
            this.updateMetrics();
        }, 15000);
    }

    initializeSystems() {
        this.systems = [
            { id: 'adsb', name: 'ADS-B', status: 'active' },
            { id: 'acars', name: 'ACARS', status: 'active' },
            { id: 'radar', name: 'Primary Radar', status: 'active' },
            { id: 'satellite', name: 'Satellite Comms', status: 'active' }
        ];
    }

    updateAnomalyDetection() {
        const anomalies = document.querySelectorAll('.anomaly-card:not(.resolved)');
        
        anomalies.forEach(card => {
            if (Math.random() > 0.7 && !card.classList.contains('pulse')) {
                card.classList.add('pulse');
                setTimeout(() => {
                    card.classList.remove('pulse');
                }, 2000);

                if (Math.random() > 0.8) {
                    this.updateAnomalyData(card);
                }
            }
        });

        console.log('Anomaly detection update completed');
    }

    updateAnomalyData(anomalyCard) {
        const timeElement = anomalyCard.querySelector('.anomaly-data span:first-child');
        if (timeElement) {
            const newTime = this.generateRandomTime();
            timeElement.innerHTML = `<i class="fas fa-clock"></i> ${newTime}`;
        }
    }

    simulateSystemChanges() {
        const systems = document.querySelectorAll('.system-card');
        systems.forEach(system => {
            if (Math.random() > 0.8) {
                const isActive = system.classList.contains('active');
                system.classList.toggle('active');
                system.classList.toggle('offline');
                
                const systemName = system.querySelector('.system-name').textContent;
                const newStatus = isActive ? 'offline' : 'active';
                
                this.showNotification(`System ${systemName} is now ${newStatus}`, 
                                   isActive ? 'warning' : 'safe');
            }
        });
    }

    updateMetrics() {
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            const currentValue = parseFloat(metric.textContent);
            if (!isNaN(currentValue)) {
                const change = (Math.random() - 0.5) * 2;
                let newValue = currentValue + change;
                
                if (metric.textContent.includes('%')) {
                    newValue = Math.max(90, Math.min(99.9, newValue));
                    metric.textContent = newValue.toFixed(1) + '%';
                } else if (metric.textContent.includes('s')) {
                    newValue = Math.max(3.5, Math.min(5.5, newValue));
                    metric.textContent = newValue.toFixed(1) + 's';
                } else if (parseInt(metric.textContent) > 100) {
                    newValue = Math.max(280, Math.min(295, newValue));
                    metric.textContent = Math.round(newValue);
                }
            }
        });
    }

    activateEmergencyProtocol() {
        this.showNotification('EMERGENCY PROTOCOL ACTIVATED: All systems engaged. Authorities notified.', 'danger');
        
        document.querySelectorAll('.system-card').forEach(card => {
            card.classList.add('pulse');
            setTimeout(() => card.classList.remove('pulse'), 3000);
        });

        this.addFamilyMessage('Emergency protocol activated. Monitoring situation closely.', 'emergency');
    }

    contactAircraft() {
        this.showNotification('Attempting to establish contact with aircraft via all available channels...', 'primary');
        
        setTimeout(() => {
            if (Math.random() > 0.3) {
                this.showNotification('Contact established via satellite backup system.', 'safe');
                this.addFamilyMessage('Contact with aircraft established. All systems nominal.', 'update');
            } else {
                this.showNotification('Unable to establish direct contact. Activating secondary protocols.', 'warning');
            }
        }, 2000);
    }

    activateProtocol(protocol) {
        const protocolNames = {
            satellite: 'Satellite Tracking',
            emergency: 'Emergency Services',
            family: 'Family Communication'
        };

        this.showNotification(`${protocolNames[protocol]} protocol activated`, 'primary');
        
        if (protocol === 'family') {
            this.addFamilyMessage('Family notification protocol initiated. Next of kin being contacted.', 'protocol');
        }
    }

    sendFamilyUpdate() {
        const messages = [
            "All systems operating normally. Flight on scheduled path.",
            "Minor weather systems ahead. No impact expected on flight path.",
            "Communication systems verified. Regular updates continuing.",
            "Aircraft performing optimally. All parameters within normal range."
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.addFamilyMessage(randomMessage, 'update');
        this.showNotification('Family update sent successfully', 'safe');
    }

    addFamilyMessage(message, type = 'update') {
        const familyMessages = document.getElementById('familyMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const typeLabel = type === 'emergency' ? 'Emergency Alert' : 
                         type === 'protocol' ? 'Protocol Update' : 'Automated Update';
        
        messageDiv.innerHTML = `
            <div class="message-time">${timestamp} • ${typeLabel}</div>
            <div>${message}</div>
        `;
        
        familyMessages.insertBefore(messageDiv, familyMessages.firstChild);
        
        if (familyMessages.children.length > 5) {
            familyMessages.removeChild(familyMessages.lastChild);
        }
    }

    toggleSystemStatus(systemCard) {
        const isActive = systemCard.classList.contains('active');
        systemCard.classList.toggle('active');
        systemCard.classList.toggle('offline');
        
        const systemName = systemCard.querySelector('.system-name').textContent;
        const newStatus = isActive ? 'offline' : 'active';
        
        this.showNotification(`System ${systemName} is now ${newStatus}`, 
                           isActive ? 'warning' : 'safe');
    }

    showNotification(message, type = 'primary') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            primary: 'info-circle',
            safe: 'check-circle',
            warning: 'exclamation-triangle',
            danger: 'exclamation-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            primary: '#1a73e8',
            safe: '#00c853',
            warning: '#f9ab00',
            danger: '#ea4335'
        };
        return colors[type] || '#1a73e8';
    }

    generateRandomTime() {
        const minutes = Math.floor(Math.random() * 10) + 1;
        return `${minutes} min ago`;
    }

    displayStartupMessage() {
        setTimeout(() => {
            this.showNotification('FlightGuardian AI System Active - Monitoring 287 flights', 'safe');
        }, 1000);
    }
}

const notificationStyles = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: auto;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', () => {
    window.flightGuardianApp = new FlightGuardianApp();
});
