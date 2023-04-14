import React from "react";
import * as FB from "../../fb";
import { getDoc } from "firebase/firestore";
import { TokenDataType } from "../../types";

//
// 액션 타입
//
export const GET_TOKEN_START = "GET_TOKEN_START";
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";
export const GET_TOKEN_FAIL = "GET_TOKEN_FAIL";

//
// 액션
//
const getTokenStart = () => {
  return {
    type: GET_TOKEN_START,
  };
};

const getTokenSuccess = (data: TokenDataType) => {
  return {
    type: GET_TOKEN_SUCCESS,
    data,
  };
};

const getTokenFail = (error: any) => {
  return {
    type: GET_TOKEN_FAIL,
    error,
  };
};

//
// 썽크
//
export const getTokenThunk = (): Function => {
  return async (dispatch: React.Dispatch<any>) => {
    try {
      dispatch(getTokenStart());

      const docRef = FB.doc(FB.db, "subscribe", "tokens");

      await getDoc(docRef).then((doc) => {
        dispatch(getTokenSuccess(doc.data() as TokenDataType));
      });
    } catch (error) {
      console.log(error);
      dispatch(getTokenFail(error));
    }
  };
};

//
// 리듀서
//
const reducer = (prev = initialState, action: any) => {
  switch (action.type) {
    case GET_TOKEN_START:
      return { ...prev, loading: true, error: null };
    case GET_TOKEN_SUCCESS:
      return { ...prev, data: action.data, loading: false, error: null };
    case GET_TOKEN_FAIL:
      return { ...prev, data: {}, loading: false, error: action.error };
    default:
      return prev;
  }
};

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default reducer;
