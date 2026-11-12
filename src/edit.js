import { __, sprintf } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from "@wordpress/block-editor";
import {
	Icon,
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	ToggleControl,
	RangeControl,
	CheckboxControl,
	ColorPalette,
	__experimentalSpacer as Spacer,
} from "@wordpress/components";
import { external } from "@wordpress/icons";
import "./editor.scss";
import { Fragment } from "@wordpress/element";

/**
 * Content position of a slide: "{vertical}-{horizontal}".
 * Same 9 values as in block.json / render.php / _config.scss.
 */
const POSITIONS = [
	{ value: "top-left", label: __("Oben links", "gla-shutterslider") },
	{ value: "top-center", label: __("Oben mittig", "gla-shutterslider") },
	{ value: "top-right", label: __("Oben rechts", "gla-shutterslider") },
	{ value: "center-left", label: __("Mitte links", "gla-shutterslider") },
	{ value: "center-center", label: __("Mitte zentriert", "gla-shutterslider") },
	{ value: "center-right", label: __("Mitte rechts", "gla-shutterslider") },
	{ value: "bottom-left", label: __("Unten links", "gla-shutterslider") },
	{ value: "bottom-center", label: __("Unten mittig", "gla-shutterslider") },
	{ value: "bottom-right", label: __("Unten rechts", "gla-shutterslider") },
];

const DEFAULT_POSITION = "center-center";

// Slides saved before the per-slide setting used the block-wide attribute
// "contentAlignment" (left / center / right).
const LEGACY_POSITIONS = {
	left: "center-left",
	center: "center-center",
	right: "center-right",
};

/**
 * Position of a slide, with fallback to the old block-wide value.
 */
const getSlidePosition = (slide, legacyAlignment) => {
	if (POSITIONS.some((pos) => pos.value === slide?.contentPosition)) {
		return slide.contentPosition;
	}
	return LEGACY_POSITIONS[legacyAlignment] || DEFAULT_POSITION;
};

/**
 * 3x3 grid to choose the content position of one slide.
 */
function PositionPicker({ value, onChange }) {
	const current = POSITIONS.find((pos) => pos.value === value);

	return (
		<div style={{ marginBottom: "16px" }}>
			<p style={{ margin: "0 0 8px" }}>
				<strong>{__("Position des Inhalts", "gla-shutterslider")}</strong>
			</p>
			<div
				role="group"
				aria-label={__("Position des Inhalts", "gla-shutterslider")}
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 36px)",
					gap: "4px",
				}}
			>
				{POSITIONS.map((pos) => {
					const isActive = pos.value === value;
					return (
						<Button
							key={pos.value}
							variant={isActive ? "primary" : "secondary"}
							label={pos.label}
							showTooltip
							aria-pressed={isActive}
							onClick={() => onChange(pos.value)}
							style={{ width: "36px", height: "36px", padding: 0 }}
						>
							<span
								aria-hidden="true"
								style={{
									display: "block",
									width: "8px",
									height: "8px",
									margin: "0 auto",
									borderRadius: "50%",
									background: "currentColor",
								}}
							/>
						</Button>
					);
				})}
			</div>
			{current && (
				<p style={{ margin: "8px 0 0", fontSize: "12px", color: "#757575" }}>
					{current.label}
				</p>
			)}
		</div>
	);
}

export default function Edit({ attributes, setAttributes }) {
	const {
		slides,
		autoplay,
		interval,
		stopOnHover,
		hideProgress,
		hideNavigation,
		hidePagination,
		shutterDuration,
		contentAlignment: legacyAlignment, // legacy block-wide value (fallback only)
		preview,
	} = attributes;

	const defaultSlide = {
		author: "Author",
		title: "TITLE",
		topic: "TOPIC",
		imageUrl: "assets/images/img99.jpg",
		contentPosition: DEFAULT_POSITION,
		authorColor: "#ffffff",
		authorFontSize: 24,
		authorFontFamily: "sans-serif",
		titleColor: "#ffffff",
		titleFontSize: 48,
		titleFontFamily: "sans-serif",
		topicColor: "#f1683a",
		topicFontSize: 48,
		topicFontFamily: "sans-serif",
		description: "Here comes the description of the slide.",
		button1Text: "SEE MORE",
		button1Url: "#",
		button1Color: "#eee",
		button1TextColor: "#000",
		button1HoverColor: "#f1683a",
		button1HoverTextColor: "#fff",
		button1BorderRadius: 4,
		button1Outline: true,
		button1OutlineColor: "#fff",
		button1OutlineWidth: 1,
		button2Text: "SUBSCRIBE",
		button2Url: "#",
		button2Color: "#eee",
		button2TextColor: "#000",
		button2HoverColor: "#f1683a",
		button2HoverTextColor: "#fff",
		button2BorderRadius: 4,
		button2Outline: true,
		button2OutlineColor: "#fff",
		button2OutlineWidth: 1,
		showContent: {
			// default values for new slides
			author: true,
			title: true,
			topic: true,
			description: true,
			button1: true,
			button2: true,
		},
	};

	const firstSlide = slides?.[0] || defaultSlide;

	const blockProps = useBlockProps({
		/* className: "wp-block-gla-shutterslider", */
		style: {
			// variables author
			"--slider-author-color": firstSlide.authorColor,
			"--slider-author-size": `${firstSlide.authorFontSize ?? defaultSlide.authorFontSize}px`,
			"--slider-author-font": firstSlide.authorFontFamily || "inherit",

			// variables title
			"--slider-title-color": firstSlide.titleColor,
			"--slider-title-size": `${firstSlide.titleFontSize ?? defaultSlide.titleFontSize}px`,
			"--slider-title-font": firstSlide.titleFontFamily || "inherit",

			// variables topic
			"--slider-topic-color": firstSlide.topicColor,
			"--slider-topic-size": `${firstSlide.topicFontSize ?? defaultSlide.topicFontSize}px`,
			"--slider-topic-font": firstSlide.topicFontFamily || "inherit",
		},
	});

	/**
	 * Handle Block Preview for the Inserter
	 */
	if (preview) {
		return (
			<div /* className="editor-gla-shutterslider-preview" */>
				<img src={window.glashuttersliderData?.inserter_preview} alt="" />
			</div>
		);
	}

	/**
	 * Internal Helpers for attribute updates
	 */
	const updateSlide = (index, key, value) => {
		const newSlides = slides.map((s, i) =>
			i === index ? { ...s, [key]: value } : s,
		);
		setAttributes({ slides: newSlides });
	};

	const updateSlideVisibility = (index, field, value) => {
		const newSlides = slides.map((s, i) =>
			i === index
				? {
						...s,
						showContent: {
							...(s.showContent || {}),
							[field]: value,
						},
					}
				: s,
		);
		setAttributes({ slides: newSlides });
	};

	const getSlideStyles = (slide) => ({
		// button 1
		"--slider-button1-color": slide?.button1Color || defaultSlide.button1Color,
		"--slider-button1-textcolor":
			slide?.button1TextColor || defaultSlide.button1TextColor,
		"--slider-button1-hovercolor":
			slide?.button1HoverColor || defaultSlide.button1HoverColor,
		"--slider-button1-hovertextcolor":
			slide?.button1HoverTextColor || defaultSlide.button1HoverTextColor,
		"--slider-button1-borderradius": `${slide?.button1BorderRadius || 0}px`,
		"--slider-button1-outlinecolor":
			slide?.button1OutlineColor || defaultSlide.button1OutlineColor,
		"--slider-button1-outlinewidth": `${slide?.button1OutlineWidth || 0}px`,
		// button 2
		"--slider-button2-color": slide?.button2Color || defaultSlide.button2Color,
		"--slider-button2-textcolor":
			slide?.button2TextColor || defaultSlide.button2TextColor,
		"--slider-button2-hovercolor":
			slide?.button2HoverColor || defaultSlide.button2HoverColor,
		"--slider-button2-hovertextcolor":
			slide?.button2HoverTextColor || defaultSlide.button2HoverTextColor,
		"--slider-button2-borderradius": `${slide?.button2BorderRadius || 0}px`,
		"--slider-button2-outlinecolor":
			slide?.button2OutlineColor || defaultSlide.button2OutlineColor,
		"--slider-button2-outlinewidth": `${slide?.button2OutlineWidth || 0}px`,
	});

	// Resolve Image URL for Editor
	let editorImageUrl = firstSlide.imageUrl;

	if (editorImageUrl && !editorImageUrl.startsWith("http")) {
		const pluginUrl = window.glashuttersliderData?.plugin_url || "";

		if (pluginUrl) {
			editorImageUrl = `${pluginUrl}/${editorImageUrl}`;
		} else {
			const pluginSlug = "gla-shutterslider";

			editorImageUrl = `${window.location.origin}/wp-content/plugins/${pluginSlug}/${editorImageUrl}`;
		}
	}

	const addSlide = () => {
		const newSlides = [...slides, defaultSlide];
		setAttributes({ slides: newSlides });
	};

	const removeSlide = (index) => {
		const newSlides = slides.filter((item, i) => i !== index);
		setAttributes({ slides: newSlides });
	};

	const onRemoveMedia = (index) => {
		// immutable update (the old code mutated the slide object of the block attributes)
		updateSlide(index, "imageUrl", defaultSlide.imageUrl);
	};

	const onSelectMedia = (media, index) => {
		updateSlide(index, "imageUrl", media.url);
	};

	if (slides.length === 0) {
		return (
			<div {...blockProps}>
				<Button variant={"primary"} onClick={addSlide}>
					{__("+ Ersten Slide hinzufügen", "gla-shutterslider")}
				</Button>
			</div>
		);
	}

	// Default colors inspector panel's ColorPalette
	const defaultColors = [
		{ name: "black", color: "#000" },
		{ name: "white", color: "#fff" },
		{ name: "red", color: "#f00" },
		{ name: "green", color: "#0f0" },
		{ name: "blue", color: "#00f" },
	];

	const buttonSettings = [
		{
			id: 1,
			label: __("Button 1", "gla-shutterslider"),
			placeholder: "SEE MORE",
		},
		{
			id: 2,
			label: __("Button 2", "gla-shutterslider"),
			placeholder: "SUBSCRIBE",
		},
	];

	return (
		<>
			{/* Sidebar controls (Inspector Panel) */}
			<InspectorControls>
				{/* General Slider Settings */}
				<PanelBody
					title={__("Allgemeine Slider Einstellungen", "gla-shutterslider")}
					initialOpen={true}
				>
					{/* Autoplay */}
					<ToggleControl
						label={__("Autoplay", "gla-shutterslider")}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
					/>
					{/* Interval */}
					<RangeControl
						label={__("Interval (ms)", "gla-shutterslider")}
						value={interval}
						onChange={(value) => setAttributes({ interval: value })}
						min={3000}
						max={15000}
						step={100}
						disabled={!autoplay}
					/>
					{/* Pause autoplay while the mouse is over the slider */}
					<ToggleControl
						label={__("Bei Hover pausieren", "gla-shutterslider")}
						checked={stopOnHover}
						onChange={(value) => setAttributes({ stopOnHover: value })}
						disabled={!autoplay}
					/>
					{/* Shutter duration */}
					<RangeControl
						label={__("Shutter-Dauer (ms)", "gla-shutterslider")}
						value={shutterDuration}
						onChange={(value) => setAttributes({ shutterDuration: value })}
						min={500}
						max={3000}
						step={100}
					/>
					{/* Show / hide controls */}
					<ToggleControl
						label={__("Navigationspfeile ausblenden", "gla-shutterslider")}
						checked={hideNavigation}
						onChange={(value) => setAttributes({ hideNavigation: value })}
					/>
					<ToggleControl
						label={__("Pagination ausblenden", "gla-shutterslider")}
						checked={hidePagination}
						onChange={(value) => setAttributes({ hidePagination: value })}
					/>
					<ToggleControl
						label={__("Fortschrittsbalken ausblenden", "gla-shutterslider")}
						help={__(
							"Der Fortschrittsbalken wird nur mit aktiviertem Autoplay angezeigt.",
							"gla-shutterslider",
						)}
						checked={hideProgress}
						onChange={(value) => setAttributes({ hideProgress: value })}
						disabled={!autoplay}
					/>
				</PanelBody>
				{/* Single Slide Settings */}
				<PanelBody title={__("Slides verwalten", "gla-shutterslider")}>
					{slides.map((slide, index) => {
						{
							/* Typographie Settings */
						}
						const typographySettings = [
							{
								label: __("Author", "gla-shutterslider"),
								slug: "author",
								// Access values directly from the current slide object
								color: slide.authorColor || "#555",
								size: slide.authorFontSize || 14,
								family: slide.authorFontFamily,
								min: 10,
								max: 40,
								// Update values specifically for this slide index
								setColor: (val) => updateSlide(index, "authorColor", val),
								setSize: (val) => updateSlide(index, "authorFontSize", val),
								setFamily: (val) => updateSlide(index, "authorFontFamily", val),
							},
							{
								label: __("Titel", "gla-shutterslider"),
								slug: "title",
								color: slide.titleColor || "#000",
								size: slide.titleFontSize || 60,
								family: slide.titleFontFamily,
								min: 20,
								max: 150,
								setColor: (val) => updateSlide(index, "titleColor", val),
								setSize: (val) => updateSlide(index, "titleFontSize", val),
								setFamily: (val) => updateSlide(index, "titleFontFamily", val),
							},
							{
								label: __("Topic", "gla-shutterslider"),
								slug: "topic",
								color: slide.topicColor || "#000",
								size: slide.topicFontSize || 60,
								family: slide.topicFontFamily,
								min: 20,
								max: 150,
								setColor: (val) => updateSlide(index, "topicColor", val),
								setSize: (val) => updateSlide(index, "topicFontSize", val),
								setFamily: (val) => updateSlide(index, "topicFontFamily", val),
							},
						];

						return (
							<PanelBody
								title={`Slide ${index + 1}: ${slide.title}`}
								initialOpen={index === 0}
								key={index}
							>
								{/* Visibility Toggles */}
								<div
									className="visibility-settings"
									style={{
										background: "#f0f0f0",
										padding: "10px",
										marginBottom: "15px",
									}}
								>
									<strong>
										{__("Sichtbare Elemente", "gla-shutterslider")}
									</strong>
									<hr style={{ margin: "4px 0" }} />{" "}
									{[
										"author",
										"title",
										"topic",
										"description",
										"button1",
										"button2",
									].map((field) => (
										<CheckboxControl
											key={field}
											label={__(field.charAt(0).toUpperCase() + field.slice(1))}
											checked={slide.showContent?.[field]}
											onChange={(val) =>
												updateSlideVisibility(index, field, val)
											}
										/>
									))}
								</div>
								{/* Content position (individual per slide) */}
								<PositionPicker
									value={getSlidePosition(slide, legacyAlignment)}
									onChange={(value) =>
										updateSlide(index, "contentPosition", value)
									}
								/>
								<TextareaControl
									label={__("Beschreibung", "gla-shutterslider")}
									value={slide.description}
									onChange={(value) => updateSlide(index, "description", value)}
									placeholder="Here comes the description of the slide."
								/>

								{/* PANEL: Image */}
								<PanelBody
									title={__("Einstellungen: Image", "gla-shutterslider")}
									initialOpen={false}
								>
									{/* INPUT FÜR BILD (MEDIA UPLOAD) */}
									<PanelRow>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={(media) => onSelectMedia(media, index)}
												allowedTypes={["image"]}
												value={slide.imageUrl}
												render={({ open }) => (
													<>
														<Button
															onClick={open}
															variant={
																!slide.imageUrl ||
																slide.imageUrl.startsWith("assets/images")
																	? "primary"
																	: "secondary"
															}
														>
															{slide.imageUrl &&
															!slide.imageUrl.startsWith("assets/images")
																? __("Bild ändern", "gla-shutterslider")
																: __("Bild auswählen", "gla-shutterslider")}
														</Button>

														{slide.imageUrl &&
															!slide.imageUrl.startsWith("assets/images") && (
																<Button
																	variant={"secondary"}
																	isDestructive
																	onClick={() => onRemoveMedia(index)}
																	style={{
																		marginLeft: "10px",
																	}}
																>
																	{__("Bild entfernen", "gla-shutterslider")}
																</Button>
															)}
													</>
												)}
											/>
										</MediaUploadCheck>
										{/* {slide.imageUrl && (
									<p>Current selected: {slide.imageUrl.split("/").pop()}</p>
								)} */}
									</PanelRow>
									{slide.imageUrl && (
										<Fragment>
											<Spacer marginTop={4} />
											<p>
												<strong>Selected: </strong>
												{/* <br /> */}
												{slide.imageUrl.split("/").pop()}
											</p>
										</Fragment>
									)}
								</PanelBody>

								{/* Typographie Settings Panel: AUTHOR / TITLE / TOPIC */}
								{typographySettings.map((setting) => (
									<PanelBody
										key={setting.slug}
										title={sprintf(
											__("Einstellungen: %s", "gla-shutterslider"),
											setting.label,
										)}
										initialOpen={false}
									>
										{/* Text content for the specific slide */}
										<TextControl
											label={setting.label}
											value={slide[setting.slug]}
											onChange={(value) =>
												updateSlide(index, setting.slug, value)
											}
										/>

										<p>
											<strong>{__("Text Color", "gla-shutterslider")}</strong>
										</p>
										{/* Text color */}
										<ColorPalette
											clearable={true}
											colors={defaultColors}
											disableCustomColors={false}
											enableAlpha={true}
											value={setting.color}
											onChange={setting.setColor} // Use 'setColor' as defined in your map
										/>
										{/* Font Size */}
										<RangeControl
											label={__("Font Size (px)", "gla-shutterslider")}
											value={setting.size}
											onChange={setting.setSize}
											min={setting.min}
											max={setting.max}
										/>
										{/* Font Family */}
										<TextControl
											label={__("Font Family", "gla-shutterslider")}
											value={setting.family}
											onChange={setting.setFamily}
											placeholder="e.g. 'Poppins', sans-serif"
										/>
									</PanelBody>
								))}

								{/* PANEL: BUTTON 1/2 SETTINGS */}
								{buttonSettings.map((btn) => {
									const bKey = `button${btn.id}`; // Erzeugt "button1" oder "button2"

									return (
										<PanelBody
											key={btn.id}
											title={sprintf(
												__("Einstellungen: %s", "gla-shutterslider"),
												btn.label,
											)}
											initialOpen={false}
										>
											{/* Button Text */}
											<TextControl
												label={__("Text", "gla-shutterslider")}
												value={slide[`${bKey}Text`]}
												onChange={(value) =>
													updateSlide(index, `${bKey}Text`, value)
												}
												placeholder={btn.placeholder}
											/>
											{/* Button URL */}
											<TextControl
												label={__("URL", "gla-shutterslider")}
												value={slide[`${bKey}Url`]}
												onChange={(value) =>
													updateSlide(index, `${bKey}Url`, value)
												}
												placeholder="#"
											/>
											{/* Button Radius */}
											<RangeControl
												label={__("Border Radius (px)", "gla-shutterslider")}
												value={slide[`${bKey}BorderRadius`]}
												onChange={(value) =>
													updateSlide(index, `${bKey}BorderRadius`, value)
												}
												min={0}
												max={50}
											/>
											{/* Button Outline */}
											<ToggleControl
												label={__("Outline", "gla-shutterslider")}
												checked={slide[`${bKey}Outline`]}
												onChange={(value) =>
													updateSlide(index, `${bKey}Outline`, value)
												}
											/>

											{slide[`${bKey}Outline`] && (
												<RangeControl
													label={__("Outline Width (px)", "gla-shutterslider")}
													value={slide[`${bKey}OutlineWidth`]}
													onChange={(value) =>
														updateSlide(index, `${bKey}OutlineWidth`, value)
													}
													min={1}
													max={5}
												/>
											)}
											{/* Button Colors */}
											<PanelColorSettings
												title={__("Button Colors", "gla-shutterslider")}
												initialOpen={false}
												colorSettings={[
													{
														label: __("Background", "gla-shutterslider"),
														value:
															slide[`${bKey}Color`] ||
															defaultSlide[`${bKey}Color`],
														onChange: (value) =>
															updateSlide(index, `${bKey}Color`, value),
													},
													{
														label: __("Text", "gla-shutterslider"),
														value:
															slide[`${bKey}TextColor`] ||
															defaultSlide[`${bKey}TextColor`],
														onChange: (value) =>
															updateSlide(index, `${bKey}TextColor`, value),
													},
													{
														label: __("Hover", "gla-shutterslider"),
														value:
															slide[`${bKey}HoverColor`] ||
															defaultSlide[`${bKey}HoverColor`],
														onChange: (value) =>
															updateSlide(index, `${bKey}HoverColor`, value),
													},
													{
														label: __("Hover Text", "gla-shutterslider"),
														value:
															slide[`${bKey}HoverTextColor`] ||
															defaultSlide[`${bKey}HoverTextColor`],
														onChange: (value) =>
															updateSlide(
																index,
																`${bKey}HoverTextColor`,
																value,
															),
													},
													{
														label: __("Outline", "gla-shutterslider"),
														value:
															slide[`${bKey}OutlineColor`] ||
															defaultSlide[`${bKey}OutlineColor`],
														onChange: (value) =>
															updateSlide(index, `${bKey}OutlineColor`, value),
													},
												].map((s) => ({
													...s,
													colors: defaultColors,
													enableAlpha: true,
												}))}
											/>
										</PanelBody>
									);
								})}

								{/* REMOVE SLIDE BUTTON */}
								<Button
									variant={"secondary"}
									isDestructive
									onClick={() => removeSlide(index)}
									style={{ marginTop: "10px" }}
								>
									{__("Slide entfernen", "gla-shutterslider")}
								</Button>
							</PanelBody>
						);
					})}

					{/* ADD SLIDE BUTTON */}
					<Button
						variant={"primary"}
						onClick={addSlide}
						style={{ marginTop: "10px" }}
					>
						{__("+ Slide hinzufügen", "gla-shutterslider")}
					</Button>
				</PanelBody>
			</InspectorControls>

			{/* Editor Preview (minimalistic just 1st slide without animation) */}
			<div {...blockProps}>
				<div className="editor-gla-shutterslider-preview">
					{/* Slide 1 Infotext (on top) */}
					<span className="editor-gla-shutterslider-slideno">
						{"Slide 1 (only 1st slide visible in preview mode) - Press "}
						<Icon icon={external} />
						{" top right to check frontend"}
					</span>
					{/* The 1st Image */}
					{editorImageUrl && (
						<img
							src={editorImageUrl}
							className="editor-gla-shutterslider-image"
							alt="Preview"
						/>
					)}

					{/* Wrapper element (only show if a slide exist) */}
					{Object.values(firstSlide.showContent || {}).some(
						(val) => val === true,
					) && (
						<div
							className={`editor-gla-shutterslider-content is-position-${getSlidePosition(
								firstSlide,
								legacyAlignment,
							)}`}
							style={getSlideStyles(firstSlide)} // here button variables be injected
						>
							{firstSlide.showContent?.author && (
								<div className="editor-gla-shutterslider-author">
									{firstSlide.author}
								</div>
							)}
							{firstSlide.showContent?.title && (
								<div className="editor-gla-shutterslider-title">
									{firstSlide.title}
								</div>
							)}
							{firstSlide.showContent?.topic && (
								<div className="editor-gla-shutterslider-topic">
									{firstSlide.topic}
								</div>
							)}
							{firstSlide.showContent?.description && (
								<p className="editor-gla-shutterslider-description">
									{firstSlide.description}
								</p>
							)}
							<div className="editor-gla-shutterslider-buttons slide-buttons">
								{firstSlide.showContent?.button1 && (
									<a
										className={`button-1 ${
											firstSlide.button1Outline ? "has-outline" : ""
										}`}
									>
										{firstSlide.button1Text}
									</a>
								)}
								{firstSlide.showContent?.button2 && (
									<a
										className={`button-2 ${
											firstSlide.button2Outline ? "has-outline" : ""
										}`}
									>
										{firstSlide.button2Text}
									</a>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
