<?php
/**
 * Plugin Name: AI Chat Bot
 * Plugin URI: https://github.com/gblessylva/ai-chat-bot
 * Description: An AI Chat BOT.
 * Version: 1.0.1
 * Requires at least: 6.1
 * Requires PHP: 7.4
 * Author: Gblesylva
 * Author URI: https://www.gblessylva.com/
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: ai-chat-bot
 *
 * @package ai-chat-bot
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the main menu page.
 */
function ai_chat_bot_menu_page() {
	add_menu_page(
		__( 'AI Chat Bot', 'ai-chat-bot' ),
		__( 'AI Chat Bot', 'ai-chat-bot' ),
		'manage_options',
		'ai-chat-bot',
		'ai_chat_bot_settings_page_html',
		'dashicons-schedule',
		100
	);
}
add_action( 'admin_menu', 'ai_chat_bot_menu_page' );

/**
 * Outputs the root element for the main React component.
 */
function ai_chat_bot_settings_page_html() {
	printf(
		'<div class="wrap" id="ai-chat-bot-settings">%s</div>',
		esc_html__( 'Loading…', 'ai-chat-bot' )
	);
}

/**
 * Enqueues the necessary styles and scripts only on the options page.
 *
 * @param string $admin_page The current admin page.
 */
function ai_chat_bot_settings_page_enqueue_style_script( $admin_page ) {
	if ( 'toplevel_page_ai-chat-bot' !== $admin_page ) {
		return;
	}

	$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script(
		'ai-chat-bot-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		array(
			'in_footer' => true,
		)
	);

	wp_enqueue_style(
		'ai-chat-bot-style',
		plugins_url( 'build/index.css', __FILE__ ),
		array_filter(
			$asset['dependencies'],
			function ($style) {
				return wp_style_is( $style, 'registered' );
			}
		),
		$asset['version']
	);
}
add_action( 'admin_enqueue_scripts', 'ai_chat_bot_settings_page_enqueue_style_script' );

/**
 * Enqueues the necessary styles and scripts for the front-end.
 */
function ai_chat_bot_enqueue_scripts() {
	$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script(
		'ai-chat-bot-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		true
	);

	wp_enqueue_style(
		'ai-chat-bot-style',
		plugins_url( 'build/index.css', __FILE__ ),
		array(),
		$asset['version']
	);
}

add_action( 'wp_enqueue_scripts', 'ai_chat_bot_enqueue_scripts' );


/**
 * Registers the setting and defines its type and default value.
 */
function ai_chat_bot_settings() {
	$default = array(
		'message' => __( 'Hello, World!', 'ai-chat-bot' ),
		'display' => true,
		'size' => 'medium',
		'api_key' => '',
		'user_id' => '',
	);
	$schema = array(
		'type' => 'object',
		'properties' => array(
			'message' => array(
				'type' => 'string',
			),
			'display' => array(
				'type' => 'boolean',
			),
			'api_key' => array(
				'type' => 'string',
			),
			'user_id' => array(
				'type' => 'string',
			),
			'size' => array(
				'type' => 'string',
				'enum' => array(
					'small',
					'medium',
					'large',
					'x-large',
				),
			),
		),
	);

	register_setting(
		'options',
		'ai_chat_bot',
		array(
			'type' => 'object',
			'default' => $default,
			'show_in_rest' => array(
				'schema' => $schema,
			),
		)
	);
}
add_action( 'init', 'ai_chat_bot_settings' );

/**
 * Displays the Chat Bot on the front-end.
 */
function ai_chat_bot_front_page() {
	$options = get_option( 'ai_chat_bot' );

	if ( ! $options['display'] ) {
		return;
	}

	echo '<div id="ai-chat-bot-container"> Hehheheh</div>';
}

add_action( 'wp_body_open', 'ai_chat_bot_front_page' );
