import { SAVE_COMMENT } from "actions/types";
import { FETCH_COMMENTS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SAVE_COMMENT:
      return [...state, action.payload, {}];
    case FETCH_COMMENTS:
      const comments = action.payload.data.map(comments => comments.name);
      return [...state, ...comments];
    default:
      return state;
  }
}
