import * as React from 'react';
import Box from "@mui/material/Box";
import {
    Autocomplete,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {getValueFromMdObject} from "../../helpers/customHelper";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AsyncSelect = ({
    dataSource,
    dataList,
    title,
    setFieldValue,
    inputValue,
    name,
    disableCloseOnSelect,
    multiple,
    displayFieldValueName = "name"
 }, ...props) => {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(null);

    const requestData = () => {
        setLoading(true);

        (async () => {
            await dataSource();
        })();
    }

    useEffect(() => {
        if (loading) {
            requestData();
        }
    }, [loading]);

    useEffect(() => {
        if (dataList && dataList.length > 0) {
            setOptions(dataList)
            setLoading(false);
        }
    }, [dataList]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
            setLoading(false);
        } else {
            requestData();
        }
    }, [open]);

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    if (multiple) {
        return (
            <Autocomplete
                id={`${name}-select`}
                onChange={(event, newValue) => {
                    setFieldValue(name, newValue, false)
                }}
                defaultValue={inputValue}
                isOptionEqualToValue={(option, value) => option[displayFieldValueName] === value[displayFieldValueName]}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                getOptionLabel={(option) => option[displayFieldValueName]}
                options={options}
                disableCloseOnSelect={disableCloseOnSelect}
                multiple={multiple}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option[displayFieldValueName]}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={title}
                        variant={"standard"}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        )
    } else {
        return (
            <Autocomplete
                id={`${name}-select`}
                onChange={(event, newValue) => {
                    setFieldValue(name, newValue, false)
                }}
                defaultValue={inputValue}
                isOptionEqualToValue={(option, value) => option[displayFieldValueName] === value[displayFieldValueName]}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                getOptionLabel={(option) => option[displayFieldValueName]}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={title}
                        variant={"standard"}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        )
    }
}

export default AsyncSelect;