import {defineTheme} from '@astryxdesign/core/theme';
import {zastitiTheme} from '../zastiti/zastitiTheme';
import {accentTokens, accents, headerMark} from '../zastiti/audience';

/** "Za roditelje" pages: the brand theme with the parents teal as accent. */
export const zastitiRoditeljiTheme = defineTheme({
  name: 'zastiti-roditelji',
  extends: zastitiTheme,
  tokens: accentTokens(accents.parents),
  components: headerMark,
});
