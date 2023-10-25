// SideNav.js
import React from 'react';

function SideNav({ onTabSelect }) {
    return (
        <div className="side-nav">
            <ul>
                <li className="tab" data-tab="dashboard" onClick={() => onTabSelect('dashboard')}>Dashboard</li>
                <li className="tab" data-tab="messages" onClick={() => onTabSelect('messages')}>Messages</li>
                <li className="tab" data-tab="profile" onClick={() => onTabSelect('profile')}>Profile</li>
                <li className="tab" data-tab="notifications" onClick={() => onTabSelect('notifications')}>Notifications</li>
                <li className="tab" data-tab="consultations" onClick={() => onTabSelect('consultations')}>Consultations</li>
            </ul>
        </div>
    );
}

export default SideNav;
