<?php

/**
 * Plugin Name:       Gla Shutter Slider
 * Description:       A fancy slider block for WP Gutenberg.
 * Version:           1.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            GLa
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gla-shutterslider
 *
 * @package GlaShutterSlider
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gla_gla_shutterslider_register_block()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'gla_gla_shutterslider_register_block');

/**
 * Hands plugin data over to the block editor script (window.glashuttersliderData).
 *
 * - plugin_url:      base URL of the plugin, used by edit.js to resolve bundled images
 *                    (e.g. "assets/images/img1.jpg") in the editor preview.
 * - inserter_preview: preview image shown in the block inserter (block.json "example").
 *
 * The block's editor script is registered from build/ (see gla_gla_shutterslider_block_init),
 * so the inline script is attached to its generated handle.
 */
function gla_localize_editor_data()
{
	$handle = generate_block_asset_handle('gla/shutterslider', 'editorScript');

	if (! wp_script_is($handle, 'registered')) {
		return;
	}

	$data = array(
		'plugin_url'       => untrailingslashit(plugin_dir_url(__FILE__)),
		'inserter_preview' => plugins_url('assets/images/shutterslider-preview.png', __FILE__),
	);

	wp_add_inline_script(
		$handle,
		'window.glashuttersliderData = ' . wp_json_encode($data) . ';',
		'before'
	);
	/*
	wp_add_inline_script(
        'wp-blocks',
        'window.glashuttersliderData = ' . wp_json_encode($data) . ';',
        'after'
    );*/
}
add_action('enqueue_block_editor_assets', 'gla_localize_editor_data');
