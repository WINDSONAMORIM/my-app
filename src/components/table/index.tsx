import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter, TablePagination } from "@mui/material";
import { StatusIcon, type StatusIconProps } from "../statusIcon";
import type { ApiResponse } from "../../types/apiResponse";
import type { AccountsPayablePreviewDTO } from "../../types/accountsPayableDTO";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

interface CusttomizeTablesProps {
  rows: ApiResponse<AccountsPayablePreviewDTO>[];
  icons: StatusIconProps[];
}

const headers = [
  "Seq",
  "Fornecedor",
  "NFDoc",
  "NFDocSerie",
  "ValorTotal",
  "DataEmissao",
  "Status",
];

export default function CustomizedTables({
  rows,
  icons,
}: CusttomizeTablesProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [, setTableKey] = useState(0);

  // useEffect para forçar re-render quando os ícones mudarem
  useEffect(() => {
    console.log("Icons changed in table:", icons);
    setTableKey((prev) => prev + 1);
  }, [icons]);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  const getRowStatus = (
    row: ApiResponse<AccountsPayablePreviewDTO>,
    key: number
  ): StatusIconProps => {
    console.log(
      `Getting status for row ${key}, icons length: ${icons.length}`
    );
    if (icons.length > 0 && icons[key]) {
      console.log(`Using icon for row ${key}:`, icons[key]);
      return {
        status: icons[key].status,
        message: icons[key].message,
      };
    }

    switch (row.statusCode) {
      case 200:
        return {
          status: "success",
          message: row.message,
        };
      case 400:
        return {
          status: "error",
          message: row.message,
        };
      default:
        return {
          status: "idle",
          message: "aguardando",
        };
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columnWidths: Record<string, string> = {
    Seq: "50px",
    Fornecedor: "150px",
    NFDoc: "100px",
    NFDocSerie: "80px",
    ValorTotal: "120px",
    DataEmissao: "120px",
    Status: "80px",
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell
                key={index}
                align={"left"}
                sx={{ width: columnWidths[header] || "auto" }}
              >
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align="left">{i + 1}</StyledTableCell>
              <StyledTableCell align="left">
                {row.data.Fornecedor}
              </StyledTableCell>
              <StyledTableCell align="left">{row.data.NFDoc}</StyledTableCell>
              <StyledTableCell align="left">
                {row.data.NFDocSerie}
              </StyledTableCell>
              <StyledTableCell align="left">{`R$ ${row.data.ValorTotal}`}</StyledTableCell>
              <StyledTableCell align="left">
                {row.data.DataEmissao}
              </StyledTableCell>
              <StyledTableCell align="center">
                <StatusIcon {...getRowStatus(row, i)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={headers.length}
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Linhas por página"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `mais que ${to}`}`
              }
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
