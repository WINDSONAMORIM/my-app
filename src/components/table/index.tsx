import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { AccountsPayablePreviewDTO } from "../../types/accountsPayableDTO";
import { TableFooter, TablePagination } from "@mui/material";
import { StatusIcon } from "../statusIcon";
import type { ApiResponseArray } from "../../types/apiResponse";
import type { UploadStatus } from "../../types/uploadStatus";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

// type UploadStatus = "idle" | "loading" | "success" | "error";
interface CusttomizeTablesProps {
  rows: AccountsPayablePreviewDTO[];
  uploadResults: ApiResponseArray[];
}

const headers = [
  "Seq",
  "Fornecedor",
  "NFDoc",
  "NFDocSerie",
  "ValorTotal",
  "DataEmissao",
  "Status"
];

export default function CustomizedTables({ rows, uploadResults }: CusttomizeTablesProps) {
  console.log("rows: ", rows);
  console.log(
    "rows: ",
    rows.map((r) => console.log(r.NFDoc))
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  const getRowStatus = (nfDoc: string): UploadStatus => {
    const result = uploadResults.find((r) => r.data.includes(nfDoc)); // ou algum outro campo
    if (!result) return "idle";
    if (result.statusCode === 200) return "success";
    return "error";
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
              <StyledTableCell align="left">{row.Fornecedor}</StyledTableCell>
              <StyledTableCell align="left">{row.NFDoc}</StyledTableCell>
              <StyledTableCell align="left">{row.NFDocSerie}</StyledTableCell>
              <StyledTableCell align="left">{`R$ ${row.ValorTotal}`}</StyledTableCell>
              <StyledTableCell align="left">{row.DataEmissao}</StyledTableCell>
              <StyledTableCell align="center">
                {<StatusIcon status={getRowStatus(row.NFDoc)} />}
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
