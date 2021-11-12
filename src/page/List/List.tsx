import {
  ConstrainMode,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Stack,
} from "@fluentui/react";
import { useActivities } from "../../context/Activities";
import { gridStyles } from "./Styles";
import { useBoolean } from "@fluentui/react-hooks";
import { column } from "./Columns";
import { IData } from "../../interfaces/Configuration";
import Delete from "./Delete";
import ExcelExport from "./ExcelExport";

const List = () => {
  const { data } = useActivities();
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const onItemInvoked = (item: IData,index?:number): void => {
    alert("Item invoked: " + item.dateStart + " " + index);
  };

  return (
    <Stack tokens={{ childrenGap: 5 }} styles={{ root: { width: "90%" } }}>
      <Stack
        horizontal
        styles={{ root: { width: "100%" } }}
        horizontalAlign="space-between"
      >
        <DefaultButton onClick={toggleHideDialog} text="Limpiar Lista" />
        <ExcelExport />
      </Stack>
      <DetailsList
        styles={gridStyles}
        columns={column}
        items={data}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        constrainMode={ConstrainMode.unconstrained}
        onItemInvoked={onItemInvoked}
        selectionPreservedOnEmptyClick
        setKey="set"
      />
      <Delete hideDialog={hideDialog} toggleHideDialog={toggleHideDialog} />
    </Stack>
  );
};

export default List;
