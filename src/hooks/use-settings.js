import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { store as noticesStore } from '@wordpress/notices';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

const useSettings = () => {
	const [ message, setMessage ] = useState();
	const [ display, setDisplay ] = useState();
	const [ size, setSize ] = useState();
	const [ apiKey, setApiKey ] = useState();
	const [ userId, setUserId ] = useState();

	const { createSuccessNotice } = useDispatch( noticesStore );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
			setMessage( settings.ai_chat_bot.message );
			setDisplay( settings.ai_chat_bot.display );
			setSize( settings.ai_chat_bot.size );
			setApiKey( settings.ai_chat_bot.api_key );
			setUserId( settings.ai_chat_bot.user_id );
		} );
	}, [] );

	const saveSettings = () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: {
				ai_chat_bot: {
					message,
					display,
					size,
					api_key: apiKey,
					user_id: userId,
				},
			},
		} ).then( () => {
			createSuccessNotice(
				__( 'Settings saved.', 'ai-chat-bot' )
			);
		} );
	};

	return {
		message,
		setMessage,
		display,
		setDisplay,
		size,
		setSize,
		apiKey,
		setApiKey,
		userId,
		setUserId,
		saveSettings,
	};
};

export default useSettings;
