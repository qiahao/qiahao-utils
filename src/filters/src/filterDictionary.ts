import * as dictionary from '@/config/dictionary';

export const filterPrdType = _createDictionaryFilter(dictionary.dictionaryPrdType);
export const filterGender = _createDictionaryFilter(dictionary.dictionaryGender);
export const filterGrade = _createDictionaryFilter(dictionary.dictionaryGrade);
export const filterPromoteType = _createDictionaryFilter(dictionary.dictionaryPromoteType); // 促销类型

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
