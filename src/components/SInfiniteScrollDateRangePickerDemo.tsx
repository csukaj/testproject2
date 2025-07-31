import * as React from 'react';
import SInfiniteScrollDateRangePicker from './SInfiniteScrollDateRangePicker';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from "@mui/x-date-pickers-pro";

export default function SInfiniteScrollDateRangePickerDemo() {
    const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange<Dayjs>>([null, null]);
    
    const handleDateRangeChange = React.useCallback((newValue: DateRange<Dayjs>) => {
        setSelectedDateRange(newValue);
    }, []);

    const clearDates = () => {
        setSelectedDateRange([null, null]);
    };

    const setThisWeek = () => {
        const today = dayjs();
        const startOfWeek = today.startOf('week');
        const endOfWeek = today.endOf('week');
        setSelectedDateRange([startOfWeek, endOfWeek]);
    };

    const setThisMonth = () => {
        const today = dayjs();
        const startOfMonth = today.startOf('month');
        const endOfMonth = today.endOf('month');
        setSelectedDateRange([startOfMonth, endOfMonth]);
    };

    // Format date range for display
    const formatSelectedRange = () => {
        if (!selectedDateRange[0]) return null;
        
        const startDate = selectedDateRange[0].format('YYYY. MMMM DD. (dddd)');
        
        if (selectedDateRange[1]) {
            const endDate = selectedDateRange[1].format('YYYY. MMMM DD. (dddd)');
            return `${startDate} - ${endDate}`;
        } else {
            return `${startDate} (válassz végdátumot)`;
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" component="h3" sx={{ textAlign: 'center' }}>
                Infinite Scroll Date Range Picker Demo
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 400 }}>
                Gördíts fel és le a hónapok között! Válassz egy időszakot a kezdő és befejező dátum kiválasztásával.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, marginBottom: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button variant="outlined" size="small" onClick={setThisWeek}>
                    Ez a hét
                </Button>
                <Button variant="outlined" size="small" onClick={setThisMonth}>
                    Ez a hónap
                </Button>
                <Button variant="outlined" size="small" onClick={clearDates}>
                    Töröl
                </Button>
            </Box>

            <SInfiniteScrollDateRangePicker
                value={selectedDateRange}
                onChange={handleDateRangeChange}
            />

            {formatSelectedRange() && (
                <Box sx={{ textAlign: 'center', marginTop: 2, maxWidth: 400 }}>
                    <Typography variant="body2">
                        <strong>Kiválasztott időszak:</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatSelectedRange()}
                    </Typography>
                    {selectedDateRange[0] && selectedDateRange[1] && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: 1 }}>
                            Időtartam: {selectedDateRange[1].diff(selectedDateRange[0], 'day') + 1} nap
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
}