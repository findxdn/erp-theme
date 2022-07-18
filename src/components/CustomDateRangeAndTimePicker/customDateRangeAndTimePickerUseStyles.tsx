import { makeStyles } from '@mui/styles';

// rgba(0,0,0,0.87) = text primary

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    width: 'fit-content',
  },
  leftPanelContainer: {
    width: 200,
    // paddingRight: 24,
    borderRight: '1px solid rgba(0,0,0,0.08)',
  },
  leftPanelItemButton: {
    padding: '8px 0px 7px 24px',
    height: 34.5,
    borderLeft: '4px solid transparent',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
  leftPanelItemButtonActive: {
    // borderLeftColor: '#144682',
    backgroundColor: '#f2f2f2',
  },
  leftPanelItemText: {
    color: '#9E9E9F',
    '& .MuiTypography-root': {
      fontSize: 13,
    },
  },
  leftPanelItemDivider: {
    marginLeft: 28,
  },
  rightPanelContainer: {
    padding: '19px 24px 24px',
  },
  title: {
    color: '#9E9E9F',
    fontWeight: 600,
  },
  dateAndTimeInputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateAndTimeInput: {
    marginRight: 12,
    color: 'rgba(0,0,0,0.87)',
    fontWeight: 600,
    fontSize: 14,
    flex: 1,
  },
  dateAndTimeSelect: {
    marginRight: 12,
    flex: 1,
    '& .MuiSelect-select': {
      color: 'rgba(0,0,0,0.87)',
      fontWeight: 600,
      fontSize: 14,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  startAndEndDivider: {
    width: 12,
    height: 2,
    marginRight: 12,
    backgroundColor: '#757575',
  },
  dateRangePicker: {
    // "& .MuiTypography-root": {
    //   fontSize: 14,
    //   fontWeight: 600,
    //   width: 32,
    //   margin: 0,
    // },
    // "& .MuiDateRangePickerDay-root": {
    //   width: 32,
    //   height: 32
    // },
    // "& .MuiButtonBase-root": {
    //   width: 28,
    //   height: 28
    // },
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  countDays: {
    marginRight: 'auto',
    fontSize: 12,
    color: '#9E9E9F',
  },
  actionButton: {
    marginLeft: 20,
    fontWeight: 600,
    width: 88,
  },
  actionButtonCancel: {
    color: 'rgba(0,0,0,0.54)',
  },
}));

export default useStyles;
