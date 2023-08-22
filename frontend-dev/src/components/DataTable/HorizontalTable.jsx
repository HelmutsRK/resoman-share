import * as React from 'react';
import Box from "@mui/material/Box";
import {Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {getValueFromMdObject} from "../../helpers/customHelper";
import {useEffect, useState} from "react";

const HorizontalTable = ({ columns, data, showActions, actionItems, showSelect, tableSize, handleSelection, selectedData }) => {

    return (
        <Box sx={{ overflow: "auto" }}>
            <Table size={tableSize ?? "large"}>
                <TableHead>
                    <TableRow>
                        {showSelect && (
                            <TableCell></TableCell>
                        )}
                        {columns.map(column => (
                            <TableCell key={column.id} sx={{fontWeight: "bold"}}>{column.displayName}</TableCell>
                        ))}
                        {showActions && actionItems.length > 0 && (
                            <TableCell sx={{fontWeight: "bold", textAlign: 'center'}} align="right">Darbības</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i} hover>
                            {showSelect && (
                                <TableCell>
                                    <Checkbox
                                        defaultChecked={selectedData.some(elem => elem.id === row.id)}
                                        onChange={(event) => handleSelection(row, event.target.checked)}
                                    />
                                </TableCell>
                            )}
                            {columns.map(rowColumn => (
                                <TableCell key={`${i}-${rowColumn.fieldName}`}>
                                    {getValueFromMdObject(row, rowColumn.fieldName)}
                                </TableCell>
                            ))}
                            {showActions && actionItems.length > 0 && (
                                <TableCell align="right" sx={{ textAlign: 'center' }}>
                                    {actionItems.map(actionItem => (
                                        <Tooltip key={`${i}-${actionItem.title}`} title={actionItem.title}>
                                            <IconButton
                                                aria-label={actionItem.title}
                                                size="small"
                                                onClick={() => actionItem.actionCallback(row.id)}
                                            >
                                                {actionItem.icon}
                                            </IconButton>
                                        </Tooltip>
                                    ))}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

export default HorizontalTable;