import {defineTheme} from '@astryxdesign/core/theme';
import {zastitiTheme} from '../zastiti/zastitiTheme';
import {accentTokens, accents, headerMark} from '../zastiti/audience';

/** The SOS report pages: the brand theme with the SOS coral as accent. */
export const zastitiSosTheme = defineTheme({
  name: 'zastiti-sos',
  extends: zastitiTheme,
  tokens: accentTokens(accents.sos),
  components: headerMark,
});
