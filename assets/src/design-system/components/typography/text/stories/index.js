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
 * External dependencies
 */
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

/**
 * Internal dependencies
 */
import { THEME_CONSTANTS } from '../../../../';
import { Text } from '../';

export default {
  title: 'DesignSystem/Components/Typography/Text',
  component: Text,
};

const textPresetSizes = THEME_CONSTANTS.TEXT_SIZES;
const textRenderAsOptions = ['p', 'a', 'span'];

export const _default = () => (
  <>
    {textPresetSizes.map((presetSize) => (
      <div key={`${presetSize}_text`}>
        <Text size={'small'}>{presetSize}</Text>
        <Text size={presetSize} as={select('as', textRenderAsOptions, 'p')}>
          {
            'Duka din veranda till fest, för en långväga gäst, i landet lagom är bäst.'
          }
        </Text>
      </div>
    ))}
  </>
);

export const Bold = () => (
  <>
    {textPresetSizes.map((presetSize, idx) => (
      <>
        <Text size={'small'}>{presetSize}</Text>

        <Text
          key={idx}
          size={presetSize}
          isBold
          as={select('as', textRenderAsOptions, 'p')}
        >
          {
            'Regnet slår mot rutorna nu, men natten är ljus, i ett land utan ljud'
          }
        </Text>
      </>
    ))}
  </>
);

export const Link = () => (
  <>
    {textPresetSizes.map((presetSize, idx) => (
      <>
        <Text size={'small'}>{presetSize}</Text>

        <Text
          key={idx}
          size={presetSize}
          as={select('as', textRenderAsOptions, 'a')}
          href="#"
          onClick={action('anchor clicked! Do something.')}
        >
          {`Click here for more information`}
        </Text>
      </>
    ))}
  </>
);
