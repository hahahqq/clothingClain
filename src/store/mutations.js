import {
  SET_POPUPPAGE_MASKER,
  SET_POPUPPAGE_FIRST,
  SET_POPUPPAGE_SECOND,
  SET_POPUPPAGE_THIRD,
  SET_POPUPPAGE_FOURTH,
  SET_POPUPPAGE_FIFTH,
  SET_PROPS_STATE,
} from './mutation-types'

export default {
  [SET_POPUPPAGE_MASKER] (state, { popupState }) {
    state.isPopupPage.masker = popupState;
  },
  [SET_POPUPPAGE_FIRST] (state, { popupState }) {
    state.isPopupPage.first = popupState;
  },
  [SET_POPUPPAGE_SECOND] (state, { popupState }) {
    state.isPopupPage.second = popupState;
  },
  [SET_POPUPPAGE_THIRD] (state, { popupState }) {
    state.isPopupPage.third = popupState;
  },
  [SET_POPUPPAGE_FOURTH] (state, { popupState }) {
    state.isPopupPage.fourth = popupState;
  },
  [SET_POPUPPAGE_FIFTH] (state, { popupState }) {
    state.isPopupPage.fifth = popupState;
  },
  [SET_PROPS_STATE] (state, { v }) {
    state.isChangePropsState = v;
  },
}