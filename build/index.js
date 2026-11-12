/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js"
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/external.mjs");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







/**
 * Content position of a slide: "{vertical}-{horizontal}".
 * Same 9 values as in block.json / render.php / _config.scss.
 */

const POSITIONS = [{
  value: "top-left",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Oben links", "gla-shutterslider")
}, {
  value: "top-center",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Oben mittig", "gla-shutterslider")
}, {
  value: "top-right",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Oben rechts", "gla-shutterslider")
}, {
  value: "center-left",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Mitte links", "gla-shutterslider")
}, {
  value: "center-center",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Mitte zentriert", "gla-shutterslider")
}, {
  value: "center-right",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Mitte rechts", "gla-shutterslider")
}, {
  value: "bottom-left",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Unten links", "gla-shutterslider")
}, {
  value: "bottom-center",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Unten mittig", "gla-shutterslider")
}, {
  value: "bottom-right",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Unten rechts", "gla-shutterslider")
}];
const DEFAULT_POSITION = "center-center";

// Slides saved before the per-slide setting used the block-wide attribute
// "contentAlignment" (left / center / right).
const LEGACY_POSITIONS = {
  left: "center-left",
  center: "center-center",
  right: "center-right"
};

/**
 * Position of a slide, with fallback to the old block-wide value.
 */
const getSlidePosition = (slide, legacyAlignment) => {
  if (POSITIONS.some(pos => pos.value === slide?.contentPosition)) {
    return slide.contentPosition;
  }
  return LEGACY_POSITIONS[legacyAlignment] || DEFAULT_POSITION;
};

/**
 * 3x3 grid to choose the content position of one slide.
 */
function PositionPicker({
  value,
  onChange
}) {
  const current = POSITIONS.find(pos => pos.value === value);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    style: {
      marginBottom: "16px"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
      style: {
        margin: "0 0 8px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Position des Inhalts", "gla-shutterslider")
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      role: "group",
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Position des Inhalts", "gla-shutterslider"),
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 36px)",
        gap: "4px"
      },
      children: POSITIONS.map(pos => {
        const isActive = pos.value === value;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: isActive ? "primary" : "secondary",
          label: pos.label,
          showTooltip: true,
          "aria-pressed": isActive,
          onClick: () => onChange(pos.value),
          style: {
            width: "36px",
            height: "36px",
            padding: 0
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            "aria-hidden": "true",
            style: {
              display: "block",
              width: "8px",
              height: "8px",
              margin: "0 auto",
              borderRadius: "50%",
              background: "currentColor"
            }
          })
        }, pos.value);
      })
    }), current && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
      style: {
        margin: "8px 0 0",
        fontSize: "12px",
        color: "#757575"
      },
      children: current.label
    })]
  });
}
function Edit({
  attributes,
  setAttributes
}) {
  const {
    slides,
    autoplay,
    interval,
    stopOnHover,
    hideProgress,
    hideNavigation,
    hidePagination,
    shutterDuration,
    contentAlignment: legacyAlignment,
    // legacy block-wide value (fallback only)
    preview
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
      button2: true
    }
  };
  const firstSlide = slides?.[0] || defaultSlide;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
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
      "--slider-topic-font": firstSlide.topicFontFamily || "inherit"
    }
  });

  /**
   * Handle Block Preview for the Inserter
   */
  if (preview) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
        src: window.glashuttersliderData?.inserter_preview,
        alt: ""
      })
    });
  }

  /**
   * Internal Helpers for attribute updates
   */
  const updateSlide = (index, key, value) => {
    const newSlides = slides.map((s, i) => i === index ? {
      ...s,
      [key]: value
    } : s);
    setAttributes({
      slides: newSlides
    });
  };
  const updateSlideVisibility = (index, field, value) => {
    const newSlides = slides.map((s, i) => i === index ? {
      ...s,
      showContent: {
        ...(s.showContent || {}),
        [field]: value
      }
    } : s);
    setAttributes({
      slides: newSlides
    });
  };
  const getSlideStyles = slide => ({
    // button 1
    "--slider-button1-color": slide?.button1Color || defaultSlide.button1Color,
    "--slider-button1-textcolor": slide?.button1TextColor || defaultSlide.button1TextColor,
    "--slider-button1-hovercolor": slide?.button1HoverColor || defaultSlide.button1HoverColor,
    "--slider-button1-hovertextcolor": slide?.button1HoverTextColor || defaultSlide.button1HoverTextColor,
    "--slider-button1-borderradius": `${slide?.button1BorderRadius || 0}px`,
    "--slider-button1-outlinecolor": slide?.button1OutlineColor || defaultSlide.button1OutlineColor,
    "--slider-button1-outlinewidth": `${slide?.button1OutlineWidth || 0}px`,
    // button 2
    "--slider-button2-color": slide?.button2Color || defaultSlide.button2Color,
    "--slider-button2-textcolor": slide?.button2TextColor || defaultSlide.button2TextColor,
    "--slider-button2-hovercolor": slide?.button2HoverColor || defaultSlide.button2HoverColor,
    "--slider-button2-hovertextcolor": slide?.button2HoverTextColor || defaultSlide.button2HoverTextColor,
    "--slider-button2-borderradius": `${slide?.button2BorderRadius || 0}px`,
    "--slider-button2-outlinecolor": slide?.button2OutlineColor || defaultSlide.button2OutlineColor,
    "--slider-button2-outlinewidth": `${slide?.button2OutlineWidth || 0}px`
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
    setAttributes({
      slides: newSlides
    });
  };
  const removeSlide = index => {
    const newSlides = slides.filter((item, i) => i !== index);
    setAttributes({
      slides: newSlides
    });
  };
  const onRemoveMedia = index => {
    // immutable update (the old code mutated the slide object of the block attributes)
    updateSlide(index, "imageUrl", defaultSlide.imageUrl);
  };
  const onSelectMedia = (media, index) => {
    updateSlide(index, "imageUrl", media.url);
  };
  if (slides.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "primary",
        onClick: addSlide,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("+ Ersten Slide hinzufügen", "gla-shutterslider")
      })
    });
  }

  // Default colors inspector panel's ColorPalette
  const defaultColors = [{
    name: "black",
    color: "#000"
  }, {
    name: "white",
    color: "#fff"
  }, {
    name: "red",
    color: "#f00"
  }, {
    name: "green",
    color: "#0f0"
  }, {
    name: "blue",
    color: "#00f"
  }];
  const buttonSettings = [{
    id: 1,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Button 1", "gla-shutterslider"),
    placeholder: "SEE MORE"
  }, {
    id: 2,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Button 2", "gla-shutterslider"),
    placeholder: "SUBSCRIBE"
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Allgemeine Slider Einstellungen", "gla-shutterslider"),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Autoplay", "gla-shutterslider"),
          checked: autoplay,
          onChange: value => setAttributes({
            autoplay: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Interval (ms)", "gla-shutterslider"),
          value: interval,
          onChange: value => setAttributes({
            interval: value
          }),
          min: 3000,
          max: 15000,
          step: 100,
          disabled: !autoplay
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Bei Hover pausieren", "gla-shutterslider"),
          checked: stopOnHover,
          onChange: value => setAttributes({
            stopOnHover: value
          }),
          disabled: !autoplay
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Shutter-Dauer (ms)", "gla-shutterslider"),
          value: shutterDuration,
          onChange: value => setAttributes({
            shutterDuration: value
          }),
          min: 500,
          max: 3000,
          step: 100
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Navigationspfeile ausblenden", "gla-shutterslider"),
          checked: hideNavigation,
          onChange: value => setAttributes({
            hideNavigation: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pagination ausblenden", "gla-shutterslider"),
          checked: hidePagination,
          onChange: value => setAttributes({
            hidePagination: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Fortschrittsbalken ausblenden", "gla-shutterslider"),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Der Fortschrittsbalken wird nur mit aktiviertem Autoplay angezeigt.", "gla-shutterslider"),
          checked: hideProgress,
          onChange: value => setAttributes({
            hideProgress: value
          }),
          disabled: !autoplay
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Slides verwalten", "gla-shutterslider"),
        children: [slides.map((slide, index) => {
          {
            /* Typographie Settings */
          }
          const typographySettings = [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Author", "gla-shutterslider"),
            slug: "author",
            // Access values directly from the current slide object
            color: slide.authorColor || "#555",
            size: slide.authorFontSize || 14,
            family: slide.authorFontFamily,
            min: 10,
            max: 40,
            // Update values specifically for this slide index
            setColor: val => updateSlide(index, "authorColor", val),
            setSize: val => updateSlide(index, "authorFontSize", val),
            setFamily: val => updateSlide(index, "authorFontFamily", val)
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Titel", "gla-shutterslider"),
            slug: "title",
            color: slide.titleColor || "#000",
            size: slide.titleFontSize || 60,
            family: slide.titleFontFamily,
            min: 20,
            max: 150,
            setColor: val => updateSlide(index, "titleColor", val),
            setSize: val => updateSlide(index, "titleFontSize", val),
            setFamily: val => updateSlide(index, "titleFontFamily", val)
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Topic", "gla-shutterslider"),
            slug: "topic",
            color: slide.topicColor || "#000",
            size: slide.topicFontSize || 60,
            family: slide.topicFontFamily,
            min: 20,
            max: 150,
            setColor: val => updateSlide(index, "topicColor", val),
            setSize: val => updateSlide(index, "topicFontSize", val),
            setFamily: val => updateSlide(index, "topicFontFamily", val)
          }];
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
            title: `Slide ${index + 1}: ${slide.title}`,
            initialOpen: index === 0,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "visibility-settings",
              style: {
                background: "#f0f0f0",
                padding: "10px",
                marginBottom: "15px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Sichtbare Elemente", "gla-shutterslider")
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("hr", {
                style: {
                  margin: "4px 0"
                }
              }), " ", ["author", "title", "topic", "description", "button1", "button2"].map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(field.charAt(0).toUpperCase() + field.slice(1)),
                checked: slide.showContent?.[field],
                onChange: val => updateSlideVisibility(index, field, val)
              }, field))]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(PositionPicker, {
              value: getSlidePosition(slide, legacyAlignment),
              onChange: value => updateSlide(index, "contentPosition", value)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Beschreibung", "gla-shutterslider"),
              value: slide.description,
              onChange: value => updateSlide(index, "description", value),
              placeholder: "Here comes the description of the slide."
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Einstellungen: Image", "gla-shutterslider"),
              initialOpen: false,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                    onSelect: media => onSelectMedia(media, index),
                    allowedTypes: ["image"],
                    value: slide.imageUrl,
                    render: ({
                      open
                    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        onClick: open,
                        variant: !slide.imageUrl || slide.imageUrl.startsWith("assets/images") ? "primary" : "secondary",
                        children: slide.imageUrl && !slide.imageUrl.startsWith("assets/images") ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Bild ändern", "gla-shutterslider") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Bild auswählen", "gla-shutterslider")
                      }), slide.imageUrl && !slide.imageUrl.startsWith("assets/images") && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        variant: "secondary",
                        isDestructive: true,
                        onClick: () => onRemoveMedia(index),
                        style: {
                          marginLeft: "10px"
                        },
                        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Bild entfernen", "gla-shutterslider")
                      })]
                    })
                  })
                })
              }), slide.imageUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalSpacer, {
                  marginTop: 4
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
                    children: "Selected: "
                  }), slide.imageUrl.split("/").pop()]
                })]
              })]
            }), typographySettings.map(setting => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Einstellungen: %s", "gla-shutterslider"), setting.label),
              initialOpen: false,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                label: setting.label,
                value: slide[setting.slug],
                onChange: value => updateSlide(index, setting.slug, value)
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text Color", "gla-shutterslider")
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
                clearable: true,
                colors: defaultColors,
                disableCustomColors: false,
                enableAlpha: true,
                value: setting.color,
                onChange: setting.setColor // Use 'setColor' as defined in your map
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Font Size (px)", "gla-shutterslider"),
                value: setting.size,
                onChange: setting.setSize,
                min: setting.min,
                max: setting.max
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Font Family", "gla-shutterslider"),
                value: setting.family,
                onChange: setting.setFamily,
                placeholder: "e.g. 'Poppins', sans-serif"
              })]
            }, setting.slug)), buttonSettings.map(btn => {
              const bKey = `button${btn.id}`; // Erzeugt "button1" oder "button2"

              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
                title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Einstellungen: %s", "gla-shutterslider"), btn.label),
                initialOpen: false,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text", "gla-shutterslider"),
                  value: slide[`${bKey}Text`],
                  onChange: value => updateSlide(index, `${bKey}Text`, value),
                  placeholder: btn.placeholder
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL", "gla-shutterslider"),
                  value: slide[`${bKey}Url`],
                  onChange: value => updateSlide(index, `${bKey}Url`, value),
                  placeholder: "#"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Border Radius (px)", "gla-shutterslider"),
                  value: slide[`${bKey}BorderRadius`],
                  onChange: value => updateSlide(index, `${bKey}BorderRadius`, value),
                  min: 0,
                  max: 50
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Outline", "gla-shutterslider"),
                  checked: slide[`${bKey}Outline`],
                  onChange: value => updateSlide(index, `${bKey}Outline`, value)
                }), slide[`${bKey}Outline`] && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Outline Width (px)", "gla-shutterslider"),
                  value: slide[`${bKey}OutlineWidth`],
                  onChange: value => updateSlide(index, `${bKey}OutlineWidth`, value),
                  min: 1,
                  max: 5
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.PanelColorSettings, {
                  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Button Colors", "gla-shutterslider"),
                  initialOpen: false,
                  colorSettings: [{
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Background", "gla-shutterslider"),
                    value: slide[`${bKey}Color`] || defaultSlide[`${bKey}Color`],
                    onChange: value => updateSlide(index, `${bKey}Color`, value)
                  }, {
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text", "gla-shutterslider"),
                    value: slide[`${bKey}TextColor`] || defaultSlide[`${bKey}TextColor`],
                    onChange: value => updateSlide(index, `${bKey}TextColor`, value)
                  }, {
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hover", "gla-shutterslider"),
                    value: slide[`${bKey}HoverColor`] || defaultSlide[`${bKey}HoverColor`],
                    onChange: value => updateSlide(index, `${bKey}HoverColor`, value)
                  }, {
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hover Text", "gla-shutterslider"),
                    value: slide[`${bKey}HoverTextColor`] || defaultSlide[`${bKey}HoverTextColor`],
                    onChange: value => updateSlide(index, `${bKey}HoverTextColor`, value)
                  }, {
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Outline", "gla-shutterslider"),
                    value: slide[`${bKey}OutlineColor`] || defaultSlide[`${bKey}OutlineColor`],
                    onChange: value => updateSlide(index, `${bKey}OutlineColor`, value)
                  }].map(s => ({
                    ...s,
                    colors: defaultColors,
                    enableAlpha: true
                  }))
                })]
              }, btn.id);
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              variant: "secondary",
              isDestructive: true,
              onClick: () => removeSlide(index),
              style: {
                marginTop: "10px"
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Slide entfernen", "gla-shutterslider")
            })]
          }, index);
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "primary",
          onClick: addSlide,
          style: {
            marginTop: "10px"
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("+ Slide hinzufügen", "gla-shutterslider")
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "editor-gla-shutterslider-preview",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
          className: "editor-gla-shutterslider-slideno",
          children: ["Slide 1 (only 1st slide visible in preview mode) - Press ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"]
          }), " top right to check frontend"]
        }), editorImageUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
          src: editorImageUrl,
          className: "editor-gla-shutterslider-image",
          alt: "Preview"
        }), Object.values(firstSlide.showContent || {}).some(val => val === true) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: `editor-gla-shutterslider-content is-position-${getSlidePosition(firstSlide, legacyAlignment)}`,
          style: getSlideStyles(firstSlide) // here button variables be injected
          ,
          children: [firstSlide.showContent?.author && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "editor-gla-shutterslider-author",
            children: firstSlide.author
          }), firstSlide.showContent?.title && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "editor-gla-shutterslider-title",
            children: firstSlide.title
          }), firstSlide.showContent?.topic && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "editor-gla-shutterslider-topic",
            children: firstSlide.topic
          }), firstSlide.showContent?.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            className: "editor-gla-shutterslider-description",
            children: firstSlide.description
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "editor-gla-shutterslider-buttons slide-buttons",
            children: [firstSlide.showContent?.button1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
              className: `button-1 ${firstSlide.button1Outline ? "has-outline" : ""}`,
              children: firstSlide.button1Text
            }), firstSlide.showContent?.button2 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
              className: `button-2 ${firstSlide.button2Outline ? "has-outline" : ""}`,
              children: firstSlide.button2Text
            })]
          })]
        })]
      })
    })]
  });
}

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");



 // Importiert deine edit.js

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_2__,
  // Übernimmt Name, Attribute etc. aus der JSON
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * Da wir eine render.php verwenden, bleibt save: null.
   * WordPress nutzt dann automatisch das PHP-Template für das Frontend.
   */
  save: () => null
});

/***/ },

/***/ "./src/editor.scss"
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/style.scss"
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/external.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/external.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ external_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");


// packages/icons/src/library/external.tsx
var external_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	style: { fill: "none" },
	stroke: "currentColor",
	strokeWidth: "1.5",
	children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M9.5 6.25H6.5C5.80964 6.25 5.25 6.80964 5.25 7.5V17.5C5.25 18.1904 5.80964 18.75 6.5 18.75H16.5C17.1904 18.75 17.75 18.1904 17.75 17.5V14.5M11.5 12.5L18.75 5.25M12.5 5.25H18.75V11.5" })
});


//# sourceMappingURL=external.mjs.map

/***/ },

/***/ "./src/block.json"
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"gla/shutterslider","version":"1.0.1","title":"Shutter Slider","category":"widgets","icon":"slides","description":"Premium Hero Shutter-Slider with parallax effect and animated custom content.","example":{"attributes":{"preview":true},"viewportWidth":1200},"supports":{"anchor":true,"color":{"background":true,"text":false},"html":false},"textdomain":"gla-shutterslider","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js","attributes":{"preview":{"type":"boolean","default":false},"autoplay":{"type":"boolean","default":true},"interval":{"type":"number","default":7000,"minimum":3000,"maximum":15000},"stopOnHover":{"type":"boolean","default":true},"hideProgress":{"type":"boolean","default":false},"hideNavigation":{"type":"boolean","default":false},"hidePagination":{"type":"boolean","default":false},"shutterDuration":{"type":"number","default":1500,"minimum":500,"maximum":3000},"contentAlignment":{"type":"string","default":"center"},"authorColor":{"type":"string","default":"#ffffff"},"authorFontSize":{"type":"number","default":24},"authorFontFamily":{"type":"string","default":"sans-serif"},"titleColor":{"type":"string","default":"#ffffff"},"titleFontSize":{"type":"number","default":48},"titleFontFamily":{"type":"string","default":"sans-serif"},"topicColor":{"type":"string","default":"#f1683a"},"topicFontSize":{"type":"number","default":48},"topicFontFamily":{"type":"string","default":"sans-serif"},"slides":{"type":"array","default":[{"showContent":{"author":true,"title":true,"topic":true,"description":true,"button1":true,"button2":true},"author":"Author 1","title":"TITLE 1","topic":"TOPIC 1","description":"Here comes the description of the slide.","imageUrl":"assets/images/img1.jpg","contentPosition":"center-center","authorColor":"#fff","authorFontSize":24,"authorFontFamily":"sans-serif","titleColor":"#fff","titleFontSize":48,"titleFontFamily":"sans-serif","topicColor":"#f1683a","topicFontSize":48,"topicFontFamily":"sans-serif","button1Text":"SEE MORE","button1Url":"#","button1Color":"#eee","button1TextColor":"#000","button1HoverColor":"#f1683a","button1HoverTextColor":"#fff","button1BorderRadius":4,"button1Outline":true,"button1OutlineColor":"#fff","button1OutlineWidth":1,"button2Text":"SUBSCRIBE","button2Url":"#","button2Color":"transparent","button2TextColor":"#fff","button2HoverColor":"#f1683a","button2HoverTextColor":"#fff","button2BorderRadius":4,"button2Outline":true,"button2OutlineColor":"#fff","button2OutlineWidth":1},{"showContent":{"author":true,"title":true,"topic":true,"description":true,"button1":true,"button2":true},"author":"Author 2","title":"TITLE 2","topic":"TOPIC 2","description":"Here comes the description of the slide.","imageUrl":"assets/images/img2.jpg","contentPosition":"center-center","authorColor":"#fff","authorFontSize":24,"authorFontFamily":"sans-serif","titleColor":"#fff","titleFontSize":48,"titleFontFamily":"sans-serif","topicColor":"#f1683a","topicFontSize":48,"topicFontFamily":"sans-serif","button1Text":"SEE MORE","button1Url":"#","button1Color":"#eee","button1TextColor":"#000","button1HoverColor":"#f1683a","button1HoverTextColor":"#fff","button1BorderRadius":4,"button1Outline":true,"button1OutlineColor":"#fff","button1OutlineWidth":1,"button2Text":"SUBSCRIBE","button2Url":"#","button2Color":"transparent","button2TextColor":"#fff","button2HoverColor":"#f1683a","button2HoverTextColor":"#fff","button2BorderRadius":4,"button2Outline":true,"button2OutlineColor":"#fff","button2OutlineWidth":1}],"items":{"type":"object","properties":{"showContent":{"type":"object","properties":{"author":{"type":"boolean"},"title":{"type":"boolean"},"topic":{"type":"boolean"},"description":{"type":"boolean"},"button1":{"type":"boolean"},"button2":{"type":"boolean"}}},"author":{"type":"string"},"title":{"type":"string"},"topic":{"type":"string"},"description":{"type":"string"},"imageUrl":{"type":"string"},"contentPosition":{"type":"string","enum":["top-left","top-center","top-right","center-left","center-center","center-right","bottom-left","bottom-center","bottom-right"]},"authorColor":{"type":"string"},"authorFontSize":{"type":"number"},"authorFontFamily":{"type":"string"},"titleColor":{"type":"string"},"titleFontSize":{"type":"number"},"titleFontFamily":{"type":"string"},"topicColor":{"type":"string"},"topicFontSize":{"type":"number"},"topicFontFamily":{"type":"string"},"button1Text":{"type":"string"},"button1Url":{"type":"string"},"button1Color":{"type":"string"},"button1TextColor":{"type":"string"},"button1HoverColor":{"type":"string"},"button1HoverTextColor":{"type":"string"},"button1BorderRadius":{"type":"number"},"button1Outline":{"type":"boolean"},"button1OutlineColor":{"type":"string"},"button1OutlineWidth":{"type":"number"},"button2Text":{"type":"string"},"button2Url":{"type":"string"},"button2Color":{"type":"string"},"button2TextColor":{"type":"string"},"button2HoverColor":{"type":"string"},"button2HoverTextColor":{"type":"string"},"button2BorderRadius":{"type":"number"},"button2Outline":{"type":"boolean"},"button2OutlineColor":{"type":"string"},"button2OutlineWidth":{"type":"number"}}}}}}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn) => {
/******/ 			if(chunkIds) {
/******/ 				deferred.push([chunkIds, fn]);
/******/ 				return;
/******/ 			}
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if (__webpack_require__.O.j(chunkIds[j])) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunkgla_shutterslider"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map