import * as dictionary from '@/config/dictionary';

export const filterGender = _createDictionaryFilter(dictionary.dictionaryGender);

/* eslint-disable no-unused-vars */
function _createDictionaryFilter (dictionary) {
  return function (ipt) {
    if (ipt == null) { return null; }
    if ( typeof ipt === 'boolean' ) {
      ipt = Number(ipt);
    }
    const r = dictionary[ipt.toString()];
    return r instanceof Object ? r.label : r;
  };
}
/* eslint-enable no-unused-vars*/
