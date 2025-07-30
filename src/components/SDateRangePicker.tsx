import * as React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers-pro/AdapterDayjs";
import {DateRangeCalendar, LocalizationProvider, RangePosition} from "@mui/x-date-pickers-pro";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {ClickAwayListener} from "@mui/base/ClickAwayListener";
import SPopper from "./SPopper";
import SFullScreenDialog from "./SFullScreenDialog";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {InputAdornment, Paper} from '@mui/material';
import Divider from "@mui/material/Divider";
import DateRangeIcon from '@mui/icons-material/DateRange';
import IconButton from "@mui/material/IconButton";
import {DateRangeCalendarSlotsComponent} from "@mui/x-date-pickers-pro";
import {
    DateRangePickerDay as MuiDateRangePickerDay,
    DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { styled } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';

export default function SDateRangePicker(props: any) {
    const theme = useTheme();

    const [rangePosition, setRangePosition] = React.useState<"start" | "end">("start");

    const [width, setWidth] = React.useState<number>(window.innerWidth);
    const [height, setHeight] = React.useState<number>(window.innerHeight);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width < theme.breakpoints.values.md;
    const calendarsCount = width < 630 ? 2 : 2

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [popOverAnchorEl, setPopOverAnchorEl] = React.useState<HTMLElement | null>(null);
    const popOverOpen = Boolean(popOverAnchorEl);
    const id = popOverOpen ? 'simple-popover' : undefined;

    const opened = dialogOpen || popOverOpen

    const open = () => {
        isMobile ? setDialogOpen(true) : setPopOverAnchorEl(document.getElementById(props.id))
    }
    const openEvent = (event: React.FocusEventHandler<HTMLElement>) => open()

    const close = () => {
        setPopOverAnchorEl(null)
        setDialogOpen(false)
    }
    const closeOnClickAway = () => {
        setPopOverAnchorEl(null)
    }

    const openFromStartInput = (event: any) => {
        setRangePosition("start")
        openEvent(event)
    }

    const openFromEndInput = (event: any) => {
        setRangePosition("end")
        openEvent(event)
    }

    const clearValues = () => {
        props.setValue([null, null])
    }

    const prevIconButton = () =>
        <IconButton
            onClick={(e) => console.log('prev cleck')}
        >Prev</IconButton>

    const nextIconButton = () =>
        <IconButton
            onClick={(e) => console.log('nex cleck')}
        >Next</IconButton>

    const fromValue = props.value[0] ? props.value[0].format('YYYY-MM-DD') : ''
    const toValue = props.value[1] ? props.value[1].format('YYYY-MM-DD') : ''

    // const now = new Date(Date.now())
    // const [position, setPosition] = React.useState(undefined)

    // const DateRangePickerDay = styled(MuiDateRangePickerDay)(
    //     ({
    //          theme,
    //          isHighlighting,
    //          isStartOfHighlighting,
    //          isEndOfHighlighting,
    //          outsideCurrentMonth,
    //      }) => ({
    //         ...(!outsideCurrentMonth &&
    //             isHighlighting && {
    //                 borderRadius: 0,
    //                 backgroundColor: theme.palette.primary.main,
    //                 color: theme.palette.common.white,
    //                 '&:hover, &:focus': {
    //                     backgroundColor: theme.palette.primary.dark,
    //                 },
    //             }),
    //         ...(isStartOfHighlighting && {
    //             borderTopLeftRadius: '50%',
    //             borderBottomLeftRadius: '50%',
    //         }),
    //         ...(isEndOfHighlighting && {
    //             borderTopRightRadius: '50%',
    //             borderBottomRightRadius: '50%',
    //         }),
    //     }),
    // ) as React.ComponentType<DateRangePickerDayProps<Dayjs>>;

    const datepicker = <DateRangeCalendar
        // currentMonthCalendarPosition={position}
        // defaultValue={[dayjs('2024-12-12'), dayjs('2024-12-12')]}
        // onMonthChange={(month: any) => console.log(['onMonthChange', month])}
        disableHighlightToday={true}
        rangePosition={rangePosition}
        defaultRangePosition={rangePosition}
        onRangePositionChange={(rangePosition: RangePosition) => setRangePosition(rangePosition)}
        calendars={calendarsCount}
        disablePast={true}
        showDaysOutsideCurrentMonth={true}
        value={props.value}
        onChange={(newValue) => props.setValue(newValue)}
        sx={{
            flexWrap: "wrap",
            justifyContent: "center"
        }}
        // slots={{ day: DateRangePickerDay }}
        // slots={{
        //
        //     // rightArrowIcon: () => nextIconButton,
        //     // leftArrowIcon: () => prevIconButton,
        //     // nextIconButton: nextIconButton,
        //     // previousIconButton: prevIconButton
        // }}
        // slotProps={
        //     {
        //         nextIconButton: {
        //
        //         }
        //     }
        // }
    />

    const calendar = <LocalizationProvider dateAdapter={AdapterDayjs}>
        {datepicker}
    </LocalizationProvider>

    const popupContent = <Box>
        {calendar}
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 2,
                paddingX: 2,
                paddingBottom: 2
            }}
        >
            <Button variant="text" onClick={clearValues}>töröl</Button>
            <Button variant="contained">tovább</Button>
        </Box>
    </Box>

    return (
        <div>
            <ClickAwayListener onClickAway={closeOnClickAway}>
                <div>
                    <Paper variant="outlined">
                        <Stack direction="row" alignItems="center" justifyContent="center" id={props.id}>
                            <TextField
                                id={props.id + '-start-input'}
                                className="s-date-range-picker-input"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DateRangeIcon fontSize="small"/>
                                        </InputAdornment>
                                    ),
                                }}
                                //sx={{width: "calc((100% - 1px) / 2)"}}
                                onFocus={openFromStartInput}
                                onClick={openFromStartInput}
                                inputProps={{
                                    onFocus: openFromStartInput,
                                    onClick: openFromStartInput,
                                }}
                                value={fromValue}
                                placeholder="Érkezés"
                                focused={opened && rangePosition === 'start'}
                            />
                            <Divider orientation="vertical" variant="middle" flexItem/>
                            <TextField
                                id={props.id + '-end-input'}
                                className="s-date-range-picker-input"
                                //sx={{width: "calc((100% - 1px) / 2)"}}
                                onFocus={openFromEndInput}
                                value={toValue}
                                placeholder="Távozás"
                                focused={opened && rangePosition === 'end'}
                            />
                        </Stack>
                    </Paper>
                    <SPopper id={id} open={popOverOpen} close={close} anchorEl={popOverAnchorEl} content={popupContent}
                             marginTop={0.5}  placement="bottom-start" />
                </div>
            </ClickAwayListener>
            <SFullScreenDialog
                open={dialogOpen}
                close={close}
                title={props.title}
                content={popupContent}
                datepicker={datepicker}
                // position={position}
                // setPosition={setPosition}
            />
        </div>
    );
}
