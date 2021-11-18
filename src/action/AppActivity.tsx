import moment from "moment";
import { IData } from "../interfaces/Configuration";

export const initialState: { data: IData[] } = {
  data: [],
};

type IState = {
  data: IData[];
};

type IAction =
  | { type: "CLEAN_TASK"; payload: string }
  | { type: "ADD_TASK"; item: IData }
  | { type: "UPDATE_TASK"; item: IData }
  | { type: "DELETE_TASK"; id: string }
  | { type: "PATCH_DATEEND"; id: string };

export const setDuration = (dateStart: string, dateEnd: string) => {
  const isMayor = (number: number) => (number > 9 ? number + "" : `0${number}`);

  let formatDateEnd = moment(dateEnd);
  let second = formatDateEnd.diff(dateStart, "second") % 60;
  let minute = formatDateEnd.diff(dateStart, "minute") % 60;
  let hour = formatDateEnd.diff(dateStart, "hour") % 24;

  return `${isMayor(hour)}:${isMayor(minute)}:${isMayor(second)}`;
};

export const appActivity = (state: IState, action: IAction): IState => {
  const { type } = action;

  switch (type) {
    case "ADD_TASK":
      const NEW_DATE_END_ADD = moment().format("Y/M/D HH:mm:ss");
      return {
        data: [
          ...state.data,
          {
            ...action.item,
            duration: setDuration(action.item.dateStart, NEW_DATE_END_ADD),
            dateEnd: NEW_DATE_END_ADD.split(" ")[1],
            dateStart: action.item.dateStart.split(" ")[1],
          },
        ],
      };

    case "DELETE_TASK":
      return {
        data: state.data.filter((item) => item.id !== action.id),
      };

    case "CLEAN_TASK":
      return { data: [] };

    case "UPDATE_TASK":
      const NEW_DATE_END_UPDATE = moment().format("Y/M/D");

      return {
        data: state.data.map((item) =>
          item.id === action.item.id
            ? {
                ...action.item,
                duration: setDuration(
                  `${NEW_DATE_END_UPDATE} ${action.item.dateStart}`,
                  action.item.dateEnd
                    ? `${NEW_DATE_END_UPDATE} ${action.item.dateEnd}`
                    : ""
                ),
              }
            : item
        ),
      };

    case "PATCH_DATEEND":
      const NEW_DATE_END_PATCH = moment().format("Y/M/D HH:mm:ss");
      return {
        data: state.data.map((item) =>
          item.id === action.id
            ? {
                ...item,
                dateEnd: NEW_DATE_END_PATCH.split(" ")[1],
                duration: setDuration(
                  `${NEW_DATE_END_PATCH.split(" ")[0]} ${item.dateStart}`,
                  NEW_DATE_END_PATCH
                ),
              }
            : item
        ),
      };

    default:
      return state;
  }
};
