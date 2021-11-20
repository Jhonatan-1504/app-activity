import {
  ConstrainMode,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  SelectionMode,
  Stack,
} from "@fluentui/react";
import { useActivities } from "../../context/Activities";
import { gridStyles } from "./Styles";
import { useBoolean } from "@fluentui/react-hooks";
import { column, iconButtonStyles } from "./Columns";
import Delete from "./Delete";
import ExcelExport from "./ExcelExport";
import Confirm from "./Confirm";
import { IData } from "../../interfaces/Configuration";
import Edit from "./Edit";

const List = () => {
  const { data, setObjectItem, deleteData, patchDateFinally } = useActivities();
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [hideDialogExcel, { toggle: toggleHideDialogExcel }] = useBoolean(
    data.length > 0 ? true : false
  );

  const columns: IColumn[] = [
    ...column,
    {
      key: "columnAction",
      name: "",
      fieldName: "",
      iconName: "WebAppBuilderModule",
      minWidth: 20,
      maxWidth: 20,
      isResizable: true,
      onRender: (item: IData, index) => (
        <div>
          <IconButton
            menuIconProps={{ iconName: "MoreVertical" }}
            role="button"
            aria-haspopup
            aria-label="Show actions"
            styles={iconButtonStyles}
            menuProps={{
              items: [
                {
                  key: "delete",
                  text: "Delete",
                  iconProps:{iconName:'Delete'},
                  onClick: () => deleteData(item.id),
                },
                {
                  key: "edit",
                  text: "Edit",
                  iconProps:{iconName:'Edit'},
                  onClick: () => setObjectItem(item, index),
                },
                {
                  key: "setDateEnd",
                  text: "Actualiza la hora final",
                  iconProps:{iconName:'Refresh'},
                  onClick: () => patchDateFinally(item.id),
                }
              ],
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Stack tokens={{ childrenGap: 5 }} styles={{ root: { width: "90%" } }}>
      <Stack
        horizontal
        styles={{ root: { width: "100%" } }}
        horizontalAlign="space-between"
      >
        <DefaultButton iconProps={{iconName:'Filter'}} onClick={toggleHideDialog} text="Limpiar Lista" />
        <ExcelExport />
      </Stack>
      <DetailsList
        styles={gridStyles}
        columns={columns}
        items={data}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        constrainMode={ConstrainMode.unconstrained}
        selectionPreservedOnEmptyClick
        setKey="set"
      />
      <Delete hideDialog={hideDialog} toggleHideDialog={toggleHideDialog} />
      <Confirm
        hideDialog={hideDialogExcel}
        toggleHideDialog={toggleHideDialogExcel}
      />
      <Edit />
    </Stack>
  );
};

export default List;
