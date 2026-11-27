import {defineTheme} from '@astryxdesign/core/theme';
import {zastitiTheme} from '../zastiti/zastitiTheme';
import {accentTokens, accents, headerMark} from '../zastiti/audience';

/** "Za djecu" pages: the brand theme with the kids sun as accent. */
export const zastitiDjecaTheme = defineTheme({
  name: 'zastiti-djeca',
  extends: zastitiTheme,
  tokens: accentTokens(accents.kids),
  components: headerMark,
});
