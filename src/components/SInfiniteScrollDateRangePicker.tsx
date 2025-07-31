import * as React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar, LocalizationProvider, RangePosition, DateRange } from "@mui/x-date-pickers-pro";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import dayjs, { Dayjs } from 'dayjs';

interface SInfiniteScrollDateRangePickerProps {
    value?: DateRange<Dayjs>;
    onChange?: (value: DateRange<Dayjs>) => void;
    minDate?: Dayjs;
    maxDate?: Dayjs;
}

export default function SInfiniteScrollDateRangePicker({
    value,
    onChange,
    minDate,
    maxDate
}: SInfiniteScrollDateRangePickerProps) {
    const theme = useTheme();
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    
    // Range position state
    const [rangePosition, setRangePosition] = React.useState<RangePosition>("start");
    
    // Track visible months - start with current month and surrounding months
    const [visibleMonths, setVisibleMonths] = React.useState<Dayjs[]>(() => {
        const currentMonth = dayjs().startOf('month');
        const months = [];
        // Create initial 12 months (6 before, current, 5 after)
        for (let i = -6; i <= 5; i++) {
            months.push(currentMonth.add(i, 'month'));
        }
        return months;
    });

    const [isScrolling, setIsScrolling] = React.useState(false);
    const scrollTimeoutRef = React.useRef<NodeJS.Timeout>();

    // Handle scroll to load more months
    const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
        const container = event.currentTarget;
        const { scrollTop, scrollHeight, clientHeight } = container;
        
        setIsScrolling(true);
        
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set scroll end timeout
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);

        // Load more months when near the top (add previous months)
        if (scrollTop < clientHeight * 0.5) {
            setVisibleMonths(prev => {
                const firstMonth = prev[0];
                const newMonths = [];
                // Add 6 more months before
                for (let i = 6; i >= 1; i--) {
                    newMonths.push(firstMonth.subtract(i, 'month'));
                }
                return [...newMonths, ...prev];
            });
        }
        
        // Load more months when near the bottom (add future months)
        if (scrollTop > scrollHeight - clientHeight * 1.5) {
            setVisibleMonths(prev => {
                const lastMonth = prev[prev.length - 1];
                const newMonths = [];
                // Add 6 more months after
                for (let i = 1; i <= 6; i++) {
                    newMonths.push(lastMonth.add(i, 'month'));
                }
                return [...prev, ...newMonths];
            });
        }
    }, []);

    // Scroll to current month on mount
    React.useEffect(() => {
        if (scrollContainerRef.current) {
            const currentMonthIndex = visibleMonths.findIndex(month => 
                month.isSame(dayjs(), 'month')
            );
            if (currentMonthIndex >= 0) {
                // Scroll to approximately the current month
                const scrollPosition = currentMonthIndex * 400; // Approximate height per month
                scrollContainerRef.current.scrollTop = scrollPosition;
            }
        }
    }, []);

    const handleDateRangeChange = React.useCallback((newValue: DateRange<Dayjs>) => {
        onChange?.(newValue);
    }, [onChange]);

    const handleRangePositionChange = React.useCallback((newRangePosition: RangePosition) => {
        setRangePosition(newRangePosition);
    }, []);

    // Format date range for display
    const formatDateRange = () => {
        if (!value || !value[0]) return null;
        
        const startDate = value[0]?.format('YYYY. MM. DD.');
        const endDate = value[1]?.format('YYYY. MM. DD.');
        
        if (value[1]) {
            return `${startDate} - ${endDate}`;
        } else {
            return `${startDate} (válassz végdátumot)`;
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper 
                variant="outlined" 
                sx={{ 
                    width: 320, 
                    height: 600, 
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        backgroundColor: theme.palette.background.paper,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        padding: 2,
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Időszak választó
                    </Typography>
                    {formatDateRange() && (
                        <Typography variant="body2" color="text.secondary">
                            Kiválasztva: {formatDateRange()}
                        </Typography>
                    )}
                    {rangePosition && (
                        <Typography variant="caption" color="primary">
                            {rangePosition === 'start' ? 'Kezdő dátum kiválasztása' : 'Befejező dátum kiválasztása'}
                        </Typography>
                    )}
                </Box>
                
                <Box
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    sx={{
                        height: 'calc(100% - 100px)', // Account for header
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: theme.palette.grey[100],
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.palette.grey[400],
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: theme.palette.grey[600],
                        },
                    }}
                >
                    {visibleMonths.map((month, index) => {
                        // Filter out months outside min/max range if specified
                        if (minDate && month.isBefore(minDate, 'month')) return null;
                        if (maxDate && month.isAfter(maxDate, 'month')) return null;
                        
                        return (
                            <Box
                                key={month.format('YYYY-MM')}
                                sx={{
                                    padding: 1,
                                    borderBottom: index < visibleMonths.length - 1 ? 
                                        `1px solid ${theme.palette.divider}` : 'none',
                                    opacity: isScrolling ? 0.7 : 1,
                                    transition: 'opacity 0.2s ease-in-out'
                                }}
                            >
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        textAlign: 'center', 
                                        marginBottom: 1,
                                        fontWeight: 500,
                                        color: theme.palette.text.primary
                                    }}
                                >
                                    {month.format('YYYY. MMMM')}
                                </Typography>
                                <DateRangeCalendar
                                    value={value}
                                    onChange={handleDateRangeChange}
                                    rangePosition={rangePosition}
                                    onRangePositionChange={handleRangePositionChange}
                                    defaultCalendarMonth={month}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    showDaysOutsideCurrentMonth={false}
                                    disableHighlightToday={false}
                                    calendars={1}
                                    sx={{
                                        '& .MuiPickersCalendarHeader-root': {
                                            display: 'none', // Hide the navigation header
                                        },
                                        '& .MuiDayCalendar-header': {
                                            justifyContent: 'space-around',
                                        },
                                        '& .MuiPickersDay-root': {
                                            fontSize: '0.875rem',
                                        },
                                        maxWidth: '100%'
                                    }}
                                />
                            </Box>
                        );
                    })}
                    
                    {/* Loading indicator */}
                    {isScrolling && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: theme.palette.background.paper,
                                padding: 1,
                                borderRadius: 1,
                                boxShadow: theme.shadows[2],
                                zIndex: 20
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Betöltés...
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </LocalizationProvider>
    );
}