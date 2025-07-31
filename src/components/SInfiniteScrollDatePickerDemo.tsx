import * as React from 'react';
import SInfiniteScrollDatePicker from './SInfiniteScrollDatePicker';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from 'dayjs';

export default function SInfiniteScrollDatePickerDemo() {
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
    
    const handleDateChange = React.useCallback((newValue: Dayjs | null) => {
        setSelectedDate(newValue);
    }, []);

    const clearDate = () => {
        setSelectedDate(null);
    };

    const setToday = () => {
        setSelectedDate(dayjs());
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" component="h3" sx={{ textAlign: 'center' }}>
                Infinite Scroll Date Picker Demo
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 400 }}>
                Gördíts fel és le a hónapok között! A komponens automatikusan betölti a további hónapokat.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                <Button variant="outlined" size="small" onClick={setToday}>
                    Mai nap
                </Button>
                <Button variant="outlined" size="small" onClick={clearDate}>
                    Töröl
                </Button>
            </Box>

            <SInfiniteScrollDatePicker
                value={selectedDate}
                onChange={handleDateChange}
            />

            {selectedDate && (
                <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                    <strong>Kiválasztott dátum:</strong><br />
                    {selectedDate.format('YYYY. MMMM DD. (dddd)')}
                </Typography>
            )}
        </Box>
    );
}