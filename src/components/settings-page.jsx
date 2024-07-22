import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalHeading as Heading,
	Button,
	Panel,
	PanelBody,
	PanelRow,
	TabPanel,
	TextControl,
} from '@wordpress/components';
import { useSettings } from '../hooks';
import { Notices } from './notices';
import { MessageControl, DisplayControl, SizeControl } from './controls';

const SettingsTitle = () => {
	return (
		<Heading level={ 1 }>
			{ __( 'AI Chat Bot', 'ai-chat-bot' ) }
		</Heading>
	);
};

const SaveButton = ( { onClick } ) => {
	return (
		<Button variant="primary" onClick={ onClick } __next40pxDefaultSize>
			{ __( 'Save', 'ai-chat-bot' ) }
		</Button>
	);
};

const SettingsPage = () => {
	const {
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
	} = useSettings();

	return (
		<>
			<SettingsTitle />
			<Notices />
			<TabPanel
				className="ai-chat-bot-tab-panel"
				activeClass="active-tab"
				tabs={[
					{
						name: 'api-settings',
						title: __( 'API Settings', 'ai-chat-bot' ),
						className: 'api-settings-tab',
					},
					{
						name: 'general-settings',
						title: __( 'General Settings', 'ai-chat-bot' ),
						className: 'general-settings-tab',
					},
				]}
			>
				{ ( tab ) => {
					if ( tab.name === 'api-settings' ) {
						return (
							<Panel>
								<PanelBody title={ __( 'API Settings', 'ai-chat-bot' ) } initialOpen={ true }>
									<PanelRow>
										<TextControl
											label={ __( 'API Key', 'ai-chat-bot' ) }
											value={ apiKey }
											onChange={ ( value ) => setApiKey( value ) }
											type="password"
										/>
									</PanelRow>
									<PanelRow>
										<TextControl
											label={ __( 'User ID', 'ai-chat-bot' ) }
											value={ userId }
											onChange={ ( value ) => setUserId( value ) }
											type="text"
										/>
									</PanelRow>
								</PanelBody>
							</Panel>
						);
					}

					return (
						<Panel>
							<PanelBody
								title={ __( 'Display Settings', 'ai-chat-bot' ) }
							>


								{/* <PanelRow>
									<MessageControl
										value={ message }
										onChange={ ( value ) => setMessage( value ) }
									/>
								</PanelRow> */}
								<PanelRow>
									<DisplayControl
										value={ display }
										onChange={ ( value ) => setDisplay( value ) }
									/>
								</PanelRow>
							</PanelBody>
							<PanelBody
								title={ __( 'Appearance', 'ai-chat-bot' ) }
								initialOpen={ false }
							>
								<PanelRow>
									<SizeControl
										value={ size }
										onChange={ ( value ) => setSize( value ) }
									/>
								</PanelRow>
							</PanelBody>
						</Panel>
					);
				} }
			</TabPanel>
			<SaveButton onClick={ saveSettings } />
		</>
	);
};

export { SettingsPage };
