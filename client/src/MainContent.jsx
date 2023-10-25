// MainContent.js
import React from 'react';
import ChatContainer from './Chat';
function MainContent({ selectedTab }) {
    
    let content;
    switch (selectedTab) {
        case 'dashboard':
            content = <div>Dashboard Content</div>;
            break;
        case 'messages':
            content = <ChatContainer/>;
            break;
        case 'profile':
            content = <div>Profile Content</div>;
            break;
        case 'notifications':
            content = <div>Notifications Content</div>;
            break;
        case 'consultations':
            content = <div>Consultations Content</div>;
            break;
        default:
            content = <div>Click a tab from the side navigation to view its content.</div>;
    }

    return (
        <div className="main-content" id="main-content">
            {content}
        </div>
    );
}

export default MainContent;
