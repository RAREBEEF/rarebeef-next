import React from "react";
import * as FB from "../../fb";
import {
  getGuestBookFailType,
  getGuestBookStartType,
  getGuestBookSuccessType,
  getGusetBookStateType,
  guestBookType,
} from "../../types";

//
// 액션 타입
//
export const GET_GUEST_BOOK_START = "GET_GUEST_BOOK_START";
export const GET_GUEST_BOOK_SUCCESS = "GET_GUEST_BOOK_SUCCESS";
export const GET_GUEST_BOOK_FAIL = "GET_GUEST_BOOK_FAIL";

//
// 액션
//
const getGuestBookStart = (): getGuestBookStartType => {
  return {
    type: GET_GUEST_BOOK_START,
  };
};

const getGuestBookSuccess = (data: guestBookType): getGuestBookSuccessType => {
  return {
    type: GET_GUEST_BOOK_SUCCESS,
    data,
  };
};

const getGuestBookFail = (error: any): getGuestBookFailType => {
  return {
    type: GET_GUEST_BOOK_FAIL,
    error,
  };
};

//
// 썽크
//
export const getGuestBookThunk = (): Function => {
  return (dispatch: React.Dispatch<any>) => {
    try {
      dispatch(getGuestBookStart());

      const q = FB.query(
        FB.collection(FB.db, "GuestBook"),
        FB.orderBy("createdAt", "desc")
      );

      FB.onSnapshot(q, (querySnapshot) => {
        let guestBookArr: any = [];

        querySnapshot.forEach((doc) => {
          guestBookArr.push({ ...doc.data(), id: doc.id });
        });

        dispatch(getGuestBookSuccess(guestBookArr));
      });
    } catch (error) {
      dispatch(getGuestBookFail(error));
    }
  };
};

//
// 리듀서
//
const reducer = (prev = initialState, action: any) => {
  switch (action.type) {
    case GET_GUEST_BOOK_START:
      return { ...prev, loading: true, error: null };
    case GET_GUEST_BOOK_SUCCESS:
      return { ...prev, data: action.data, loading: false, error: null };
    case GET_GUEST_BOOK_FAIL:
      return { ...prev, data: [], loading: false, error: action.error };
    default:
      return prev;
  }
};

const initialState: getGusetBookStateType = {
  data: [],
  loading: false,
  error: null,
};

export default reducer;
