import { __ } from '@wordpress/i18n';
import {
	FontSizePicker,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';

const MessageControl = ( { value, onChange } ) => {
	return (
		<TextareaControl
			label={ __( 'Message', 'ai-chat-bot' ) }
			value={ value }
			onChange={ onChange }
			__nextHasNoMarginBottom
		/>
	);
};

const DisplayControl = ( { value, onChange } ) => {
	return (
		<ToggleControl
			checked={ value }
			label={ __( 'Display', 'ai-chat-bot' ) }
			onChange={ onChange }
			__nextHasNoMarginBottom
		/>
	);
};

const SizeControl = ( { value, onChange } ) => {
	return (
		<FontSizePicker
			fontSizes={ [
				{
					name: __( 'Small', 'ai-chat-bot' ),
					size: 'small',
					slug: 'small',
				},
				{
					name: __( 'Medium', 'ai-chat-bot' ),
					size: 'medium',
					slug: 'medium',
				},
				{
					name: __( 'Large', 'ai-chat-bot' ),
					size: 'large',
					slug: 'large',
				},
				{
					name: __( 'Extra Large', 'ai-chat-bot' ),
					size: 'x-large',
					slug: 'x-large',
				},
			] }
			value={ value }
			onChange={ onChange }
			disableCustomFontSizes={ true }
			__next40pxDefaultSize
			__nextHasNoMarginBottom
		/>
	);
};

export { MessageControl, DisplayControl, SizeControl };
