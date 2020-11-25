import {
   SET_POPUPPAGE_MASKER,
   SET_POPUPPAGE_FIRST,
   SET_POPUPPAGE_SECOND,
   SET_POPUPPAGE_THIRD,
   SET_POPUPPAGE_FOURTH,
   SET_POPUPPAGE_FIFTH,
   SET_PROPS_STATE
} from "./mutation-types";

export default {
   setPopuppageMasker({ commit }, popupState) {
      commit(SET_POPUPPAGE_MASKER, { popupState });
   },
   setPopuppageFirst({ commit }, popupState) {
      commit(SET_POPUPPAGE_FIRST, { popupState });
   },
   setPopuppageSecond({ commit }, popupState) {
      commit(SET_POPUPPAGE_SECOND, { popupState });
   },
   setPopuppageThird({ commit }, popupState) {
      commit(SET_POPUPPAGE_THIRD, { popupState });
   },
   setPopuppageFourth({ commit }, popupState) {
      commit(SET_POPUPPAGE_FOURTH, { popupState });
   },
   setPopuppageFifth({ commit }, popupState) {
      commit(SET_POPUPPAGE_FIFTH, { popupState });
   },
   setPropsState({ commit }, v) {
      commit(SET_PROPS_STATE, { v });
   }
};
