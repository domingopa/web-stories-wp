/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ColorContrastChecker from 'color-contrast-checker';

const parseRGBFromCssRGB = (cssRGB) => {
  const [r, g, b] = cssRGB.match(/\d+/g).map((number) => parseInt(number));
  return { r, g, b };
};

/**
 * Check text element for low contrast between font and background color
 *
 * @param  {Object} element Element object
 * @return {Object} Prepublish check response
 */
export function textElementFontLowContrast(element) {
  // skip if element is not a text element with a background color
  if (
    element.type !== 'text' ||
    element.backgroundTextMode === 'NONE' ||
    !element.backgroundColor
  ) {
    return undefined;
  }

  const ccc = new ColorContrastChecker();
  ccc.fontSize = element.fontSize;

  // calculate luminance manually for background color since it's already stored in { r, g, b }
  // format and does not need to be parsed from hex
  const backgroundRGB = element.backgroundColor.color; // { r, g, b }
  const backgroundLRGB = ccc.calculateLRGB(backgroundRGB);
  const backgroundLuminance = ccc.calculateLuminance(backgroundLRGB);

  // create buffer to loop spans for colors
  const buffer = document.createElement('div');
  buffer.innerHTML = element.content;
  const spans = Array.prototype.slice.call(buffer.getElementsByTagName('span'));

  // check all spans for contrast ratios that don't pass verification
  let lowContrast = spans.some((span) => {
    if (!span.style || !span.style.color) {
      return false;
    }

    const textRGB = parseRGBFromCssRGB(span.style.color); // style.color format: rgb(000, 000, 000)
    const textLRGB = ccc.calculateLRGB(textRGB);
    const textLuminance = ccc.calculateLuminance(textLRGB);
    const contrastRatio = ccc.getContrastRatio(
      textLuminance,
      backgroundLuminance
    );
    const verified = ccc.verifyContrastRatio(contrastRatio).WCAG_AA;
    return !verified;
  });

  if (lowContrast) {
    return {
      message: __(
        'Low contrast between font and background color',
        'web-stories'
      ),
      elementId: element.id,
      type: 'warning',
    };
  }

  return undefined;
}

/**
 * Check text element for font size too small (<12)
 *
 * @param  {Object} element Element object
 * @return {Object} Prepublish check response
 */
export function textElementFontSizeTooSmall() {
  return undefined;
}

/**
 * Check image element for very low image resolution: actual image asset on screen, at the current zoom,
 * offers <1x pixel density (guideline is to strive for >828 x 1792)
 *
 * @param  {Object} element Element object
 * @return {Object} Prepublish check response
 */
export function imageElementLowImageResolution() {
  return undefined;
}

/**
 * Check video element for doesn’t include title
 *
 * @param  {Object} element Element object
 * @return {Object} Prepublish check response
 */
export function videoElementMissingTitle() {
  return undefined;
}

/**
 * Check video element for doesn’t include subtitle
 *
 * @param  {Object} element Element object
 * @return {Object} Prepublish check response
 */
export function videoElementMissingSubtitle() {
  return undefined;
}

/**
 * Check video element for doesn’t include captions
 *
 * @param  {Object} element Element object
 * @return {Object} Prepublish check response
 */
export function videoElementMissingCaptions() {
  return undefined;
}

/**
 * Check page for too many links (more than 3)
 *
 * @param  {Object} page Page object
 * @return {Object} Prepublish check response
 */
export function pageTooManyLinks() {
  return undefined;
}

/**
 * Check text element for link tappable region too small
 *
 * @param  {Object} element Element object
 * @return {Object} Prepublish check response
 */
export function textElementTappableRegionTooSmall() {
  return undefined;
}

/**
 * Check image element for missing alt text
 *
 * @param  {Object} element Element object
 * @return {Object} Prepublish check response
 */
export function imageElementMissingAltText() {
  return undefined;
}