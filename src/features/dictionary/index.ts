export {
  DictionaryContext,
  useDictionary,
  useDictionaryExamLock,
  type DictionaryPosition,
  type DictionaryContextValue,
} from './context/DictionaryContext';

export { DictionaryProvider } from './context/DictionaryProvider';
export { DictionaryTooltip } from './components/DictionaryTooltip';
export { getWordAtCoordinates, sanitizeLookupWord } from './utils/wordCoordinates';
