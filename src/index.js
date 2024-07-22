import './index.scss';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { SettingsPage } from './components';
import ChatBot from './components/ChatBot';

const fetchSettings = async () => {
    try {
        const response = await fetch('/wp-json/wp/v2/settings', {
            credentials: 'same-origin', // Use 'include' if CORS is involved
        });
        const settings = await response.json();
        return settings.ai_chat_bot;
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
    }
};


domReady(async () => {
	// Render the settings page in the admin
	const settingsElement = document.getElementById('ai-chat-bot-settings');
	if (settingsElement) {
		const settingsRoot = createRoot(settingsElement);
		settingsRoot.render(<SettingsPage />);
	}

	// Render the chat bot on the front-end
	const chatBotContainer = document.getElementById('ai-chat-bot-container');
	console.log(chatBotContainer);
	if (chatBotContainer) {
		const chatBotRoot = createRoot(chatBotContainer);
			const message = "Hello";
			chatBotRoot.render(<ChatBot message={message}  />);
		// const settings = await fetchSettings();
		// if (settings) {
		// 	const { message } = settings;
		// 	const chatBotRoot = createRoot(chatBotContainer);
		// 	chatBotRoot.render(<ChatBot message={message} />);
		// }
	}
});
