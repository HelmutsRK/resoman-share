import * as React from 'react';
import Box from "@mui/material/Box";
import {Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {getValueFromMdObject} from "../../helpers/customHelper";
import {useEffect, useState} from "react";

const VerticalTable = ({ columns, data, tableSize, multiValueComponent }) => {

    const displayValue = (value) => {
        if (typeof value == "object") {
            return multiValueComponent(value)
        } else {
            return value
        }
    }

    return (
            <Table size={tableSize ?? "large"}>
                <TableBody>
                    {columns.map(column => (
                        <TableRow key={column.id} sx={{ border: "none"}}>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    width: "30%",
                                    textAlign: "right",
                                    border: "none"}}
                            >
                                {column.displayName}
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                                {displayValue(getValueFromMdObject(data, column.fieldName))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    );
}

export default VerticalTable;