import './chatcontainer.js';

document.addEventListener("DOMContentLoaded", function() {
    let tabs = document.querySelectorAll(".tab");
    let content = document.getElementById("main-content");

    
    

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Remove active state from all tabs
            tabs.forEach(innerTab => {
                innerTab.classList.remove('active');
            });

            // Add active state to clicked tab
            e.target.classList.add('active');

            // Change content
            switch (e.target.getAttribute("data-tab")) {
                case "dashboard":
                     
                    break;
                case "messages":
                    content.innerHTML = '<chat-container></chat-container>';
                    break;
                case "profile":
                    content.innerHTML = `<div class="profile-content">
                    <h2>Profile</h2>
                    <p>Your profile details:</p>
                    <div class="profile-details">
                        <p>Name: John Doe</p>
                        <p>Email: john.doe@example.com</p>
                        <p>Member Since: January 2021</p>
                    </div>
                </div>
                `;
                    break;
                case "notifications":
                    content.innerHTML = `<div class="notifications-content">
                    <h2>Notifications</h2>
                    <ul class="notification-list">
                        <li>New follower: Alice</li>
                        <li>Comment on your post: "Great article!"</li>
                        <li>Mentioned in a comment by Bob</li>
                    </ul>
                </div>
                `;
                    break;
                case "consultations":
                    content.innerHTML = `<div class="consultations-content">
                    <h2>Consultations</h2>
                    <p>Upcoming consultations:</p>
                    <ul class="consultation-list">
                        <li>Consultation with Dr. Smith - 25th Oct 2023</li>
                        <li>Consultation with Dr. Alice - 28th Oct 2023</li>
                        <li>Follow-up with Dr. Bob - 30th Oct 2023</li>
                    </ul>
                </div>
                `;
                    break;
                default:
                    content.innerHTML = "Click a tab from the side navigation to view its content.";
            }
        });
    });
});
