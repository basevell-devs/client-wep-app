type TAppReducerProps = {
  type: "GET_DATA";
  payload: any;
};

export const appReducer = (state: ITAppDateState, action: TAppReducerProps): ITAppDateState => {
  switch (action.type) {
    default:
      return state;
  }
};
