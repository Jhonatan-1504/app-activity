import { IDetailsListStyles } from "@fluentui/react";

export const gridStyles: Partial<IDetailsListStyles> = {
  root: {
    overflowX: 'scroll',
    selectors: {
      '& [role=grid]': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      },
    },
  },
  headerWrapper: {
    flex: '0 0 auto',
  },
  contentWrapper: {
    flex: '1 1 auto',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
};